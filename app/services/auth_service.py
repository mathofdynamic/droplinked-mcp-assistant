# app/services/auth_service.py
import httpx
from fastapi import HTTPException
import json
import os # For environment variables
from dotenv import load_dotenv # For loading .env file

# Load environment variables from .env file in the project root
# This needs to be called once, usually when the module is imported.
load_dotenv()

# --- Configuration ---
# In-memory store for MVP - REPLACE with Redis or a proper session database for production
SESSION_TOKENS: dict[str, str] = {}
DROPLINKED_API_BASE_URL = os.getenv("DROPLINKED_API_BASE_URL", "https://apiv3.droplinked.com")  # Load from .env with fallback

# Get the static JWT and the associated test user email from environment variables
STATIC_JWT_FOR_TEST_USER = os.getenv("STATIC_DROPLINKED_JWT")
# Define the email for which the static JWT should be used (case-insensitive comparison later)
TEST_USER_EMAIL_FOR_STATIC_JWT = "mathofdynamic@gmail.com"

if STATIC_JWT_FOR_TEST_USER:
    print(f"DEBUG: Static JWT for {TEST_USER_EMAIL_FOR_STATIC_JWT} loaded from .env.")
else:
    print(f"DEBUG: STATIC_DROPLINKED_JWT not found in .env. Workaround for {TEST_USER_EMAIL_FOR_STATIC_JWT} will not be active.")


async def login_user_on_droplinked(email: str, password: str) -> str:
    """
    Calls the Droplinked API's /auth/login/basic endpoint to authenticate a user
    and retrieve a JWT, with a workaround for a specific test user.
    """
    # --- WORKAROUND for specific test user using static JWT ---
    if email.lower() == TEST_USER_EMAIL_FOR_STATIC_JWT.lower() and STATIC_JWT_FOR_TEST_USER:
        print(f"INFO: Using static JWT for test user: {email} (WORKAROUND ACTIVE)")
        # Optionally, you could add a password check here if you want,
        # but for this workaround, matching the email is enough to use the static token.
        # if password == "Self@1998@Journey": # Example password check
        #     return STATIC_JWT_FOR_TEST_USER
        # else:
        #     print(f"WARN: Static JWT workaround active for {email}, but provided password did not match expected.")
        #     raise HTTPException(status_code=401, detail="Password incorrect for static JWT user.")
        return STATIC_JWT_FOR_TEST_USER # Directly return the static JWT
    # --- END WORKAROUND ---

    # For all other users, or if static JWT not set, attempt the live API call
    print(f"INFO: Attempting live API login for user: {email}")
    async with httpx.AsyncClient() as client:
        try:
            login_payload = {
                "email": email,
                "password": password,
                "userType": "PRODUCER" # Adjust if necessary for other users
            }
            # Using the "Stage" numbering from our last debugging attempt for consistency
            print(f"--- Stage 1 (Live Login): Sending login payload: {login_payload}")

            response = await client.post(
                f"{DROPLINKED_API_BASE_URL}/auth/login/basic",
                json=login_payload
            )
            print(f"--- Stage 2 (Live Login): Received response, status: {response.status_code}")
            response.raise_for_status()
            
            print(f"--- Stage 3 (Live Login): About to get response.text")
            response_text = response.text
            print(f"--- Stage 3.1 (Live Login): response.text received. Length: {len(response_text)}")
            print(f"--- Stage 3.2 (Live Login): Raw response_text (first 500 chars): {response_text[:500]}...")

            print(f"--- Stage 3.3 (Live Login): About to call json.loads(response_text)")
            parsed_body_from_api = json.loads(response_text)
            print(f"--- Stage 4 (Live Login): Called json.loads(). Type: {type(parsed_body_from_api)}")

            if not isinstance(parsed_body_from_api, dict):
                print(f"--- Stage 4.ERROR (Live Login): Parsed body is NOT a dict!")
                raise HTTPException(status_code=500, detail="API response was not a dictionary after stdlib json.loads.")

            print(f"--- Stage 5 (Live Login): Full parsed_body_from_api (repr after stdlib json.loads - first 500): {repr(parsed_body_from_api)[:500]}...")
            print(f"--- Stage 6 (Live Login): Iterating through keys and their repr (after stdlib json.loads):")
            found_token_manually = None
            
            # The Droplinked API response structure is: {"statusCode": 201, "data": {...}}
            # We need to look inside the "data" object for the token
            response_data = parsed_body_from_api.get("data", {})
            
            # Common JWT token field names to check
            possible_token_fields = [
                "access_token", 
                "accessToken", 
                "token", 
                "jwt", 
                "authToken",
                "bearerToken"
            ]
            
            # First check top level
            for field in possible_token_fields:
                if field in parsed_body_from_api:
                    found_token_manually = parsed_body_from_api[field]
                    print(f"    Found token at top level: {field}")
                    break
            
            # If not found at top level, check inside "data" object
            if not found_token_manually and isinstance(response_data, dict):
                for field in possible_token_fields:
                    if field in response_data:
                        found_token_manually = response_data[field]
                        print(f"    Found token in data object: {field}")
                        break
            
            # If still not found, check user object (sometimes tokens are nested there)
            if not found_token_manually and isinstance(response_data, dict):
                user_data = response_data.get("user", {})
                if isinstance(user_data, dict):
                    for field in possible_token_fields:
                        if field in user_data:
                            found_token_manually = user_data[field]
                            print(f"    Found token in user object: {field}")
                            break
            
            # Debug: Show what fields are actually available
            print(f"    Available top-level keys: {list(parsed_body_from_api.keys())}")
            if isinstance(response_data, dict):
                print(f"    Available data keys: {list(response_data.keys())}")
                user_data = response_data.get("user", {})
                if isinstance(user_data, dict):
                    print(f"    Available user keys: {list(user_data.keys())}")
            
            print(f"--- Stage 7 (Live Login): Value of found_token_manually after iteration: {str(found_token_manually)[:30] if found_token_manually else 'None'}")

            if not found_token_manually:
                error_msg = f"CRITICAL: JWT token not found in API response for user {email}. Checked fields: {possible_token_fields}. Response structure: statusCode={parsed_body_from_api.get('statusCode')}, data_keys={list(response_data.keys()) if isinstance(response_data, dict) else 'not_dict'}"
                print(f"ERROR: {error_msg}")
                raise HTTPException(status_code=500, detail=error_msg)
            
            print(f"--- Stage 8 (Live Login): Successfully extracted access_token for {email}: {found_token_manually[:20]}...")
            return found_token_manually

        except httpx.HTTPStatusError as e:
            print(f"DEBUG (Error Path - Live Login): Droplinked login HTTPStatusError for {email}: Status {e.response.status_code} - Response: {e.response.text}")
            # ... (rest of error handling as before)
            error_detail = f"Droplinked login failed for {email}: Status {e.response.status_code}."
            try:
                error_json_content = json.loads(e.response.text) 
                if "message" in error_json_content:
                    msg_content = error_json_content['message']
                    if isinstance(msg_content, list): error_detail += f" Message: {', '.join(msg_content)}"
                    else: error_detail += f" Message: {msg_content}"
                elif "error" in error_json_content: error_detail += f" Error: {error_json_content['error']}"
                else: error_detail += f" Raw Response: {e.response.text[:200]}"
            except json.JSONDecodeError: error_detail += f" Raw Response (not JSON): {e.response.text[:200]}"
            except Exception as json_parse_ex: error_detail += f" Raw Response (error parsing error: {json_parse_ex}): {e.response.text[:200]}"
            raise HTTPException(status_code=e.response.status_code, detail=error_detail)
        
        except json.JSONDecodeError as e_json_decode:
            print(f"CRITICAL JSON PARSE ERROR (Live Login for {email}): Failed to parse API response text with stdlib json.loads. Error: {e_json_decode}")
            print(f"Offending text was: {response_text[:500]}...") 
            raise HTTPException(status_code=500, detail=f"Failed to parse API response as JSON for {email}: {e_json_decode}")

        except Exception as e:
            print(f"DEBUG (Error Path - Generic Live Login for {email}): Generic unexpected error: {str(e)}")
            # Avoid re-raising our specific critical error if it somehow bubbles up as a generic Exception
            if isinstance(e, HTTPException) and ("CRITICAL (WORKAROUND_BYPASSED_LOGIN_FAILURE)" in e.detail or "Failed to parse API response as JSON" in e.detail):
                raise 
            raise HTTPException(status_code=500, detail=f"An internal error occurred during the Droplinked login process for {email}: {str(e)}")

def store_token_for_session(session_id: str, token: str):
    """Stores the JWT for a given user session ID."""
    print(f"DEBUG: Storing token for session_id: {session_id} (Token starts with: {token[:20]}...)")
    SESSION_TOKENS[session_id] = token

def get_token_for_session(session_id: str) -> str | None:
    """Retrieves the JWT for a given user session ID."""
    token = SESSION_TOKENS.get(session_id)
    if token:
        print(f"DEBUG: Retrieved token for session_id: {session_id} (Token starts with: {token[:20]}...)")
    else:
        print(f"DEBUG: No token found for session_id: {session_id}")
    return token

def clear_token_for_session(session_id: str):
    """Removes the JWT for a given user session ID (e.g., on logout)."""
    if session_id in SESSION_TOKENS:
        print(f"DEBUG: Clearing token for session_id: {session_id}")
        del SESSION_TOKENS[session_id]
    else:
        print(f"DEBUG: Attempted to clear token for non-existent session_id: {session_id}")
