# app/main.py
from fastapi import FastAPI, Request, HTTPException, status, Form # Ensure HTTPException and status are imported
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel # For UserLoginRequest
import os
from dotenv import load_dotenv

# --- Load Environment Variables EARLY ---
load_dotenv() 

# --- OpenAI Client Initialization ---
from openai import OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")
OPENAI_CLIENT = None
if OPENAI_API_KEY:
    try:
        OPENAI_CLIENT = OpenAI(api_key=OPENAI_API_KEY)
        print("INFO: OpenAI client initialized successfully.")
        if not ASSISTANT_ID:
            print("WARNING: ASSISTANT_ID not found in .env. Assistant interactions will fail.")
        else:
            print(f"INFO: Using ASSISTANT_ID: {ASSISTANT_ID}")
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to initialize OpenAI client: {e}")
else:
    print("CRITICAL ERROR: OPENAI_API_KEY not found in .env. OpenAI client not initialized.")

# --- App Routers and Services ---
from app.routers import chatbot_router 
from app.services import auth_service 

# --- App Initialization ---
app = FastAPI(title="Droplinked MCP Server")
app.state.openai_client = OPENAI_CLIENT
app.state.assistant_id = ASSISTANT_ID

# --- Determine Base Directory ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(f"DEBUG: main.py __file__: {os.path.abspath(__file__)}")
print(f"DEBUG: main.py BASE_DIR: {BASE_DIR}")

static_dir_path = os.path.join(BASE_DIR, "static")
templates_dir_path = os.path.join(BASE_DIR, "templates")

# --- Mount Static Files & Configure Templates ---
app.mount("/static", StaticFiles(directory=static_dir_path), name="static")
templates = Jinja2Templates(directory=templates_dir_path)

# --- Pydantic model for login request ---
class UserLoginRequest(BaseModel):
    email: str
    password: str

# --- Authentication Endpoints ---
@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    """Serves the login page."""
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/auth/mcp/login")
async def login_for_access_token(form_data: UserLoginRequest): 
    print(f"DEBUG: Login attempt for email: {form_data.email}")
    try:
        droplinked_jwt = await auth_service.login_user_on_droplinked(
            email=form_data.email,
            password=form_data.password
        )
        # The auth_service.login_user_on_droplinked function should raise an HTTPException
        # if login fails or a token isn't retrieved, so we might not strictly need
        # the 'if not droplinked_jwt:' check here if auth_service is robust.
        # However, it's a good safeguard.
        if not droplinked_jwt: 
            raise HTTPException( # Now defined
                status_code=status.HTTP_401_UNAUTHORIZED, # Now defined
                detail="Login failed: Could not retrieve token from Droplinked."
            )
        
        print(f"DEBUG: Droplinked JWT obtained for {form_data.email}: {droplinked_jwt[:20]}...")
        return {"access_token": droplinked_jwt, "token_type": "bearer"}

    except HTTPException as e: 
        print(f"DEBUG: HTTPException during login for {form_data.email}: {e.detail}")
        raise e # Re-raise the HTTPException from auth_service or the one above
    except Exception as e:
        print(f"DEBUG: Unexpected Exception during login for {form_data.email}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException( # Now defined
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, # Now defined
            detail=f"An unexpected error occurred during login: {str(e)}"
        )

# --- Root Endpoint ---
@app.get("/", response_class=HTMLResponse)
async def serve_chat_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# --- Include Chatbot Router ---
app.include_router(chatbot_router.router, prefix="/chatbot", tags=["chatbot"])

# --- Health Check ---
@app.get("/health")
async def health_check():
    # This is correct. "status" is a string key for the dictionary.
    return {"status": "MCP Operational"}