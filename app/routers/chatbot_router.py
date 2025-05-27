# app/routers/chatbot_router.py
from fastapi import (
    APIRouter, HTTPException, Body, Header, Depends, 
    Request as FastAPIRequest, status
)
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Optional, Dict, Any, Annotated, List
import traceback
import time
import httpx
import json 
import os

# --- OpenAI Client and Assistant ID ---
OPENAI_CLIENT = None
ASSISTANT_ID = None
try:
    from app.main import OPENAI_CLIENT, ASSISTANT_ID 
    if OPENAI_CLIENT: print("INFO (chatbot_router): OpenAI client imported from app.main.")
    if ASSISTANT_ID: print(f"INFO (chatbot_router): ASSISTANT_ID imported from app.main: {ASSISTANT_ID}")
except ImportError: print("WARN (chatbot_router): Could not import from app.main. Attempting direct init.")
if OPENAI_CLIENT is None and os.getenv("OPENAI_API_KEY"):
    from openai import OpenAI
    try:
        OPENAI_CLIENT = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        print("INFO (chatbot_router): OpenAI client initialized directly.")
    except Exception as e_openai_init: print(f"ERROR (chatbot_router): Failed to initialize OpenAI client directly: {e_openai_init}")
elif not OPENAI_CLIENT: print("CRITICAL (chatbot_router): OpenAI client could not be initialized.")
if ASSISTANT_ID is None:
    ASSISTANT_ID = os.getenv("ASSISTANT_ID")
    if ASSISTANT_ID: print(f"INFO (chatbot_router): ASSISTANT_ID loaded from env: {ASSISTANT_ID}")
    else: print("CRITICAL (chatbot_router): ASSISTANT_ID not found.")

from app.services import droplinked_api_service, ai_mockup_service

# --- Debugging Imports Block (from previous step, can be kept or removed once stable) ---
print("-" * 50)
print("DEBUGGING IMPORTS in chatbot_router.py:")
print(f"Type of droplinked_api_service: {type(droplinked_api_service)}")
print(f"Attributes in droplinked_api_service (dir()):")
for attr in dir(droplinked_api_service):
    if not attr.startswith("__"): 
        print(f"  - {attr}")
print(f"Does 'get_collections' exist? {'get_collections' in dir(droplinked_api_service)}")
print(f"Does 'create_new_droplinked_product' exist? {'create_new_droplinked_product' in dir(droplinked_api_service)}")
print("-" * 50)
# --- End Debugging Imports Block ---

router = APIRouter() 

class ChatMessage(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    session_id: str
    response_message: str

SESSION_THREADS: Dict[str, str] = {}

async def handle_image_upload_response(image_urls: List[str], current_state_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Handles the response when images are uploaded during product creation.
    Updates the current state with uploaded image URLs and offers AI mockup generation.
    """
    print(f"DEBUG (chatbot_router): handle_image_upload_response called with {len(image_urls)} URLs")
    
    if not current_state_data:
        current_state_data = {}
    
    # Add uploaded image URLs to the current state
    existing_images = current_state_data.get('uploaded_image_urls', [])
    if not isinstance(existing_images, list):
        existing_images = []
    
    # Add new image URLs
    new_images_added = 0
    for url in image_urls:
        if isinstance(url, str) and url.strip() and url not in existing_images:
            existing_images.append(url.strip())
            new_images_added += 1
    
    current_state_data['uploaded_image_urls'] = existing_images
    current_state_data['product_images'] = 'uploaded'  # Mark as having images
    
    print(f"DEBUG (chatbot_router): Updated state with {len(existing_images)} total images")
    
    # Provide options including AI mockup generation
    if len(existing_images) == 1:
        estimated_cost = ai_mockup_service.estimate_mockup_cost()
        message = f"Great! I've uploaded your first image. You now have {len(existing_images)} image for your product.\n\n🎨 **AI Mockup Option**: I can generate 3 professional AI-enhanced mockups from your image (cost: ~${estimated_cost:.3f}). For clothing items, I'll show them on models in different settings!\n\nWould you like to:\n1. **Generate AI mockups** (recommended for better sales)\n2. Upload more images manually\n3. Continue with just your original image\n\nType 'generate mockups', 'upload more', or 'continue' to proceed."
    else:
        message = f"Perfect! I've uploaded {new_images_added} more image(s). You now have {len(existing_images)} images total for your product.\n\nWould you like to:\n1. Upload more images\n2. Continue with product creation\n\nYou can upload more images or type 'continue' to proceed."
    
    return {
        "status": "images_uploaded_awaiting_next_step",
        "message": message,
        "current_data_collected": current_state_data
    } 

async def continue_product_creation_after_images(current_state_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Continues the product creation process after images have been uploaded.
    This allows the user to proceed to the final confirmation step.
    """
    print(f"DEBUG (chatbot_router): continue_product_creation_after_images called")
    
    if not current_state_data:
        current_state_data = {}
    
    # Mark that the user wants to continue with the current images
    current_state_data['ready_for_final_confirmation'] = True
    
    uploaded_images = current_state_data.get('uploaded_image_urls', [])
    image_count = len(uploaded_images)
    
    message = f"Excellent! I'll proceed with your product creation using the {image_count} image(s) you've uploaded. Let me gather any remaining details and show you a final summary for confirmation."
    
    return {
        "status": "ready_for_final_confirmation",
        "message": message,
        "current_data_collected": current_state_data
    }

async def confirm_product_creation(current_state_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Helper tool to trigger the confirmation flow for product creation.
    This should be called when user says 'continue' or 'create' to show them the final summary.
    This will NOT immediately create the product - it will show a summary first.
    """
    print(f"DEBUG (chatbot_router): confirm_product_creation called with state: {current_state_data}")
    
    if not current_state_data:
        current_state_data = {}
    
    # Return a message that tells the assistant to call create_new_droplinked_product without user_confirmation
    # This will trigger the summary display
    return {
        "status": "trigger_confirmation_flow",
        "message": "User wants to see the product summary. Call create_new_droplinked_product WITHOUT user_confirmation to show the summary and ask for final confirmation.",
        "current_data_collected": current_state_data,
        "next_action": "show_summary"
    }

async def manage_droplinked_product(
    action: str,
    title: str = None,
    description: str = None, 
    collection_choice: str = None,
    price: float = None,
    quantity: int = None,
    weight: float = None,
    image_urls: list = None,
    skip_images: bool = None,
    use_ai_mockups: bool = None,
    user_message: str = None,
    droplinked_jwt: str = None
) -> Dict[str, Any]:
    """
    Single function to handle all product creation workflow.
    Uses action parameter to determine what step to perform.
    """
    print(f"DEBUG: manage_droplinked_product called with action='{action}'")
    
    # Generate session key from JWT
    session_key = f"product_creation_{droplinked_jwt[:20] if droplinked_jwt else 'no_jwt'}"
    
    if action == "create_product":
        # Data collection phase
        product_data = {
            "title": title,
            "description": description, 
            "productCollectionID_choice_index": collection_choice,
            "price": price,
            "quantity": quantity,
            "weight": weight,
            "skip_images": skip_images
        }
        
        # Remove None values
        product_data = {k: v for k, v in product_data.items() if v is not None}
        
        # Call existing function without user_confirmation
        return await droplinked_api_service.create_new_droplinked_product(droplinked_jwt, product_data)
        
    elif action == "upload_images":
        # Image upload phase
        if image_urls:
            return await handle_image_upload_response(image_urls)
        else:
            return {"status": "error", "message": "No image URLs provided for upload action"}
    
    elif action == "generate_ai_mockups":
        # AI mockup generation phase
        if not image_urls or len(image_urls) == 0:
            return {"status": "error", "message": "No image URLs provided for AI mockup generation"}
        
        try:
            # Use the first uploaded image to generate mockups
            original_image_url = image_urls[0]
            print(f"DEBUG (chatbot_router): Generating AI mockups from {original_image_url}")
            
            # Generate 3 AI mockups
            generated_mockup_urls = await ai_mockup_service.generate_ai_mockups(
                original_image_url, 
                droplinked_jwt
            )
            
            if generated_mockup_urls:
                # Combine original image with generated mockups
                all_image_urls = [original_image_url] + generated_mockup_urls
                
                return {
                    "status": "ai_mockups_generated",
                    "message": f"🎉 Successfully generated {len(generated_mockup_urls)} AI mockups! You now have {len(all_image_urls)} images total (1 original + {len(generated_mockup_urls)} AI-enhanced). The AI has created professional versions showing your product in different styles and settings.",
                    "generated_urls": generated_mockup_urls,
                    "all_image_urls": all_image_urls,
                    "cost": ai_mockup_service.estimate_mockup_cost(len(generated_mockup_urls))
                }
            else:
                return {
                    "status": "error", 
                    "message": "Failed to generate AI mockups. You can continue with your original image or try uploading a different image."
                }
                
        except Exception as e:
            print(f"ERROR (chatbot_router): AI mockup generation failed: {e}")
            return {
                "status": "error",
                "message": f"AI mockup generation failed: {str(e)}. You can continue with your original image or try again."
            }
        
    elif action == "show_summary":
        # Summary phase - show summary and ask for confirmation
        product_data = {
            "title": title,
            "description": description, 
            "productCollectionID_choice_index": collection_choice,
            "price": price,
            "quantity": quantity,
            "weight": weight,
            "uploaded_image_urls": image_urls,
            "skip_images": skip_images
        }
        
        # Remove None values
        product_data = {k: v for k, v in product_data.items() if v is not None}
        
        return await droplinked_api_service.create_new_droplinked_product(droplinked_jwt, product_data)
        
    elif action == "confirm_creation":
        # Creation phase - actually create the product
        product_data = {
            "title": title,
            "description": description, 
            "productCollectionID_choice_index": collection_choice,
            "price": price,
            "quantity": quantity,
            "weight": weight,
            "uploaded_image_urls": image_urls,
            "skip_images": skip_images,
            "user_confirmation": True  # This triggers actual creation
        }
        
        # Remove None values
        product_data = {k: v for k, v in product_data.items() if v is not None}
        
        return await droplinked_api_service.create_new_droplinked_product(droplinked_jwt, product_data)
        
    else:
        return {
            "status": "error",
            "message": f"Invalid action: {action}. Use: create_product, upload_images, show_summary, or confirm_creation"
        }

AVAILABLE_TOOLS = {
    "list_my_droplinked_products": droplinked_api_service.list_user_products,
    # Corrected to match the function name in droplinked_api_service.py
    "create_new_droplinked_product": droplinked_api_service.create_new_droplinked_product, 
    "get_droplinked_shop_collections": droplinked_api_service.get_collections,
    "handle_image_upload_response": handle_image_upload_response,
    "continue_product_creation_after_images": continue_product_creation_after_images,
    "confirm_product_creation": confirm_product_creation,
    # New single function approach
    "manage_droplinked_product": manage_droplinked_product,
}

def get_or_create_thread_for_session(session_id: str) -> str | None:
    # ... (this function remains the same as in message #55) ...
    if not OPENAI_CLIENT:
        print("ERROR (chatbot_router): OpenAI client not available in get_or_create_thread_for_session.")
        return None
    if session_id not in SESSION_THREADS:
        try:
            thread = OPENAI_CLIENT.beta.threads.create()
            SESSION_THREADS[session_id] = thread.id
            print(f"INFO (chatbot_router): New OpenAI thread for session {session_id}: {thread.id}")
        except Exception as e:
            print(f"ERROR (chatbot_router): Creating OpenAI thread for {session_id} failed: {e}")
            return None
    return SESSION_THREADS.get(session_id)

@router.post("/message", response_model=ChatResponse)
async def handle_chatbot_message(
    payload: ChatMessage,
    authorization: Annotated[str | None, Header(convert_underscores=True)] = None
):
    # ... (this function remains the same as in message #55, it calls the tools from AVAILABLE_TOOLS) ...
    # Ensure this function correctly uses the updated tool name when calling.
    # The key part is when it executes the tool:
    # if function_name == "create_new_droplinked_product":
    #     function_result = await tool_function(droplinked_jwt=droplinked_jwt, product_data=arguments)

    session_id = payload.session_id
    user_message = payload.message.strip()
    
    if not OPENAI_CLIENT or not ASSISTANT_ID:
        print("ERROR (chatbot_router): OpenAI client or Assistant ID not configured for message handler.")
        raise HTTPException(status_code=503, detail="AI Assistant service is not available.")

    droplinked_jwt: str | None = None
    if authorization and authorization.lower().startswith("bearer "):
        droplinked_jwt = authorization.split(" ", 1)[1]
        print(f"DEBUG (chatbot_router): JWT found for session {session_id}.")
    else:
        print(f"DEBUG (chatbot_router): No JWT for session {session_id}. Authenticated tools may be limited.")

    thread_id = get_or_create_thread_for_session(session_id)
    if not thread_id:
        raise HTTPException(status_code=500, detail="Failed to establish conversation thread with AI.")

    try:
        OPENAI_CLIENT.beta.threads.messages.create(
            thread_id=thread_id, role="user", content=user_message
        )
        print(f"DEBUG (chatbot_router): User message for thread {thread_id} added.")

        run = OPENAI_CLIENT.beta.threads.runs.create(
            thread_id=thread_id, assistant_id=ASSISTANT_ID
        )
        print(f"DEBUG (chatbot_router): Run {run.id} created, Status: {run.status}")

        start_time = time.time()
        timeout_seconds = 120 

        while run.status in ["queued", "in_progress", "requires_action"]:
            if time.time() - start_time > timeout_seconds:
                print(f"ERROR (chatbot_router): Run {run.id} timed out.")
                try: OPENAI_CLIENT.beta.threads.runs.cancel(thread_id=thread_id, run_id=run.id)
                except Exception as cancel_err: print(f"ERROR cancelling run: {cancel_err}")
                raise HTTPException(status_code=504, detail="AI Assistant response timed out.")
            
            time.sleep(1.5) 
            run = OPENAI_CLIENT.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
            print(f"DEBUG (chatbot_router): Polling Run {run.id}, Status: {run.status}")

            if run.status == "requires_action":
                tool_outputs = []
                if not run.required_action or not run.required_action.submit_tool_outputs or not run.required_action.submit_tool_outputs.tool_calls:
                    print(f"WARN (chatbot_router): Run {run.id} requires action but no tool_calls found.")
                    continue 
                
                for tool_call in run.required_action.submit_tool_outputs.tool_calls:
                    function_name = tool_call.function.name
                    tool_call_id = tool_call.id
                    try:
                        arguments_str = tool_call.function.arguments
                        arguments = json.loads(arguments_str if arguments_str else "{}") 
                    except json.JSONDecodeError:
                        print(f"ERROR (chatbot_router): Invalid JSON args for {function_name}: {arguments_str}")
                        tool_outputs.append({"tool_call_id": tool_call_id, "output": json.dumps({"error": f"Invalid arguments format: {arguments_str}"})})
                        continue

                    print(f"INFO (chatbot_router): Assistant tool call: {function_name}, Args: {arguments}")

                    if function_name in AVAILABLE_TOOLS:
                        tool_function = AVAILABLE_TOOLS[function_name]
                        output_str = ""
                        try:
                            if function_name in ["list_my_droplinked_products", 
                                                 "create_new_droplinked_product", # Name matches AVAILABLE_TOOLS key
                                                 "get_droplinked_shop_collections"]:
                                if not droplinked_jwt:
                                    print(f"WARN (chatbot_router): Tool {function_name} requires auth, but no JWT.")
                                    raise ValueError("Authentication token required for this action.")
                                
                                if function_name == "create_new_droplinked_product":
                                    function_result = await tool_function(droplinked_jwt=droplinked_jwt, product_data=arguments)
                                elif function_name == "list_my_droplinked_products":
                                    page = arguments.get("page", 1)
                                    limit = arguments.get("limit", 10)
                                    function_result = await tool_function(droplinked_jwt=droplinked_jwt, page=page, limit=limit)
                                elif function_name == "get_droplinked_shop_collections":
                                     function_result = await tool_function(droplinked_jwt=droplinked_jwt) 
                                else: # Should not be hit if logic is correct
                                    function_result = {"error": f"Tool {function_name} argument logic not fully implemented."}
                            elif function_name == "handle_image_upload_response":
                                # Handle image upload response tool
                                image_urls = arguments.get("image_urls", [])
                                current_state_data = arguments.get("current_state_data", {})
                                function_result = await tool_function(image_urls=image_urls, current_state_data=current_state_data)
                            elif function_name == "continue_product_creation_after_images":
                                # Handle continuing product creation after images
                                current_state_data = arguments.get("current_state_data", {})
                                function_result = await tool_function(current_state_data=current_state_data)
                            elif function_name == "confirm_product_creation":
                                # Handle user confirmation for product creation
                                current_state_data = arguments.get("current_state_data", {})
                                function_result = await tool_function(current_state_data=current_state_data)
                            elif function_name == "manage_droplinked_product":
                                # Handle the new single function approach
                                if not droplinked_jwt:
                                    print(f"WARN (chatbot_router): Tool {function_name} requires auth, but no JWT.")
                                    raise ValueError("Authentication token required for this action.")
                                function_result = await tool_function(droplinked_jwt=droplinked_jwt, **arguments)
                            else: 
                                function_result = await tool_function(**arguments)
                            
                            output_str = json.dumps(function_result, default=str) 
                            print(f"INFO (chatbot_router): Tool {function_name} executed. Result (snippet): {output_str[:200]}")
                        
                        except Exception as tool_exec_e:
                            print(f"ERROR (chatbot_router): Executing tool {function_name} failed: {tool_exec_e}")
                            traceback.print_exc()
                            output_str = json.dumps({"error": f"Error during {function_name}: {str(tool_exec_e)}"})
                        
                        tool_outputs.append({"tool_call_id": tool_call_id, "output": output_str})
                    else:
                        print(f"WARN (chatbot_router): Unknown tool called: {function_name}")
                        tool_outputs.append({"tool_call_id": tool_call_id, "output": json.dumps({"error": f"Unknown tool: {function_name}"})})
                
                if tool_outputs:
                    print(f"DEBUG (chatbot_router): Submitting tool outputs (count: {len(tool_outputs)}): {str(tool_outputs)[:500]}")
                    OPENAI_CLIENT.beta.threads.runs.submit_tool_outputs(
                        thread_id=thread_id, run_id=run.id, tool_outputs=tool_outputs
                    )
        
        if run.status == "completed":
            messages = OPENAI_CLIENT.beta.threads.messages.list(thread_id=thread_id, order="desc", limit=1)
            if messages.data and messages.data[0].role == "assistant" and messages.data[0].content:
                assistant_response_text = ""
                for content_block in messages.data[0].content:
                    if content_block.type == 'text':
                        text_val = content_block.text.value
                        if hasattr(content_block.text, 'annotations'):
                            for ann in content_block.text.annotations:
                                text_val = text_val.replace(ann.text, '') 
                        assistant_response_text += text_val.strip() + "\n"
                
                final_response = assistant_response_text.strip() if assistant_response_text else "(AI Assistant processed the request but provided no text output.)"
                print(f"INFO (chatbot_router): Assistant final response: {final_response}")
                return ChatResponse(session_id=session_id, response_message=final_response)
            else:
                print(f"WARN (chatbot_router): Run {run.id} completed, but no assistant message found or content empty.")
                return ChatResponse(session_id=session_id, response_message="(AI Assistant did not return a message.)")
        else: 
            error_detail = f"AI Assistant run ended with status: {run.status}"
            if run.last_error:
                error_detail += f". Error: {run.last_error.code} - {run.last_error.message}"
            print(f"ERROR (chatbot_router): {error_detail}")
            raise HTTPException(status_code=500, detail=error_detail)

    except HTTPException as e:
        raise 
    except Exception as e:
        print(f"CRITICAL ERROR (chatbot_router) in message handler: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred with the AI Assistant: {str(e)}")