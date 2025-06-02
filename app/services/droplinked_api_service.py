# app/services/droplinked_api_service.py
import httpx
from fastapi import HTTPException, UploadFile
import json
import traceback
import time
import asyncio
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DROPLINKED_API_BASE_URL = "https://apiv3.droplinked.com"
DROPLINKED_UPLOAD_URL = "https://tools.droplinked.com/upload"

# Connection settings for better reliability
HTTPX_TIMEOUT = httpx.Timeout(connect=15.0, read=30.0, write=30.0, pool=10.0)
HTTPX_LIMITS = httpx.Limits(max_keepalive_connections=5, max_connections=10)

# Session-based state storage for product creation
PRODUCT_CREATION_SESSIONS = {}

async def make_robust_request(method: str, url: str, headers: dict, **kwargs):
    """
    Make a robust HTTP request with retries and better error handling
    """
    max_retries = 3
    base_delay = 1.0
    
    for attempt in range(max_retries):
        try:
            print(f"DEBUG (robust_request): Attempt {attempt + 1}/{max_retries} for {method} {url}")
            
            async with httpx.AsyncClient(
                timeout=HTTPX_TIMEOUT,
                limits=HTTPX_LIMITS,
                follow_redirects=True
            ) as client:
                if method.upper() == "GET":
                    response = await client.get(url, headers=headers, **kwargs)
                elif method.upper() == "POST":
                    response = await client.post(url, headers=headers, **kwargs)
                elif method.upper() == "PUT":
                    response = await client.put(url, headers=headers, **kwargs)
                elif method.upper() == "DELETE":
                    response = await client.delete(url, headers=headers, **kwargs)
                else:
                    raise ValueError(f"Unsupported HTTP method: {method}")
                
                print(f"DEBUG (robust_request): Success on attempt {attempt + 1}, Status: {response.status_code}")
                return response
                
        except httpx.TimeoutException as e:
            print(f"WARNING (robust_request): Timeout on attempt {attempt + 1}: {e}")
            if attempt < max_retries - 1:
                delay = base_delay * (2 ** attempt)  # Exponential backoff
                print(f"DEBUG (robust_request): Waiting {delay}s before retry...")
                await asyncio.sleep(delay)
            else:
                raise HTTPException(status_code=504, detail=f"Request timed out after {max_retries} attempts")
                
        except httpx.ConnectError as e:
            print(f"WARNING (robust_request): Connection error on attempt {attempt + 1}: {e}")
            if attempt < max_retries - 1:
                delay = base_delay * (2 ** attempt)
                print(f"DEBUG (robust_request): Waiting {delay}s before retry...")
                await asyncio.sleep(delay)
            else:
                raise HTTPException(status_code=503, detail=f"Connection failed after {max_retries} attempts")
                
        except httpx.RequestError as e:
            print(f"WARNING (robust_request): Request error on attempt {attempt + 1}: {e}")
            if attempt < max_retries - 1:
                delay = base_delay * (2 ** attempt)
                print(f"DEBUG (robust_request): Waiting {delay}s before retry...")
                await asyncio.sleep(delay)
            else:
                raise HTTPException(status_code=503, detail=f"Network error after {max_retries} attempts: {str(e)}")
    
    # Should never reach here
    raise HTTPException(status_code=500, detail="Unexpected error in robust request")

async def list_user_products(droplinked_jwt: str, page: int = 1, limit: int = 10) -> dict:
    """
    Fetches a list of products for the authenticated user from the Droplinked API.
    Returns the parsed JSON dictionary from the API response (full structure).
    """
    if not droplinked_jwt:
        print("ERROR (api_service - list_user_products): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for listing products.")

    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/product"
    params = {"page": page, "limit": limit}

    print(f"DEBUG (api_service - list_user_products): Calling Droplinked GET {url} with params {params}, token: {droplinked_jwt[:20]}...")
    
    raw_response_text = "" 
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, params=params, timeout=20.0)
            
            print(f"DEBUG (api_service - list_user_products): Response Status: {response.status_code}")
            # print(f"DEBUG (api_service - list_user_products): Response Headers: {response.headers}") # Optional: for debugging headers
            raw_response_text = response.text 
            # print(f"DEBUG (api_service - list_user_products): Raw Response Text (first 500): {raw_response_text[:500]}") # Optional: for debugging raw response

            response.raise_for_status() 

            parsed_json_response = response.json() 
            
            if not isinstance(parsed_json_response, dict):
                print(f"ERROR (api_service - list_user_products): Parsed response is not a dictionary! Type: {type(parsed_json_response)}")
                raise HTTPException(status_code=502, detail="Droplinked API returned an unexpected format for products (not a dictionary).")

            # print(f"DEBUG (api_service - list_user_products): Parsed JSON (repr first 500): {repr(parsed_json_response)[:500]}") # Optional: for debugging parsed object
            return parsed_json_response

        except httpx.HTTPStatusError as e:
            error_message = f"Failed to list products (Droplinked API Status: {e.response.status_code})."
            try:
                error_details = e.response.json()
                msg_from_api = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
                if isinstance(msg_from_api, list): msg_from_api = ", ".join(msg_from_api)
                error_message += f" API Message: {msg_from_api}"
            except json.JSONDecodeError: error_message += f" Raw Error (not JSON): {e.response.text[:200]}"
            print(f"ERROR (api_service - list_user_products): HTTPStatusError: {error_message}")
            raise HTTPException(status_code=e.response.status_code, detail=error_message)

        except httpx.RequestError as e: # For network errors
            print(f"ERROR (api_service - list_user_products): httpx.RequestError: {str(e)}")
            raise HTTPException(status_code=503, detail=f"Network error listing products: {str(e)}")
        
        except json.JSONDecodeError as e_json: # If response.json() fails
            print(f"ERROR (api_service - list_user_products): json.JSONDecodeError: {str(e_json)}")
            print(f"ERROR (api_service - list_user_products): Non-JSON response text that failed to parse: {raw_response_text[:500]}")
            raise HTTPException(status_code=502, detail="Invalid JSON response from Droplinked for products.")

        except Exception as e: # Catch-all for any other unexpected errors
            print(f"ERROR (api_service - list_user_products): Unexpected error: {str(e)}")
            traceback.print_exc()
            raise HTTPException(status_code=500, detail=f"Unexpected error listing products: {str(e)}")


async def get_collections(droplinked_jwt: str) -> list[dict]: # Returns a list of processed collections
    """
    Fetches and processes collections for the authenticated user from the Droplinked API.
    Returns a list of dictionaries, each with "id" and "title".
    """
    if not droplinked_jwt:
        print("ERROR (api_service - get_collections): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for fetching collections.")

    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/collection"
    print(f"DEBUG (api_service - get_collections): Calling Droplinked GET {url}, token: {droplinked_jwt[:20]}...")

    raw_response_text = ""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=15.0)
            print(f"DEBUG (api_service - get_collections): Response Status: {response.status_code}")
            raw_response_text = response.text
            # print(f"DEBUG (api_service - get_collections): Raw Response Text (first 500): {raw_response_text[:500]}") # Optional
            
            response.raise_for_status()
            data = response.json() # This is the full response dict

            collections_list_from_api = []
            # Check common structures for where the list of collections might be
            if isinstance(data.get("data"), list): 
                collections_list_from_api = data["data"]
            elif isinstance(data.get("data"), dict) and isinstance(data["data"].get("data"), list): 
                collections_list_from_api = data["data"]["data"]
            else:
                print(f"WARN (api_service - get_collections): 'data' field in collections response is not a list or expected nested list. Full response: {str(data)[:500]}")
            
            # Process the extracted list
            processed_collections = [
                {"id": col.get("_id"), "title": col.get("title")}
                for col in collections_list_from_api 
                if isinstance(col, dict) and col.get("_id") and col.get("title")
            ]
            print(f"DEBUG (api_service - get_collections): Processed collections count: {len(processed_collections)}")
            return processed_collections

        except httpx.HTTPStatusError as e:
            error_message = f"Failed to fetch collections (Droplinked API Status: {e.response.status_code})."
            try:
                error_details = e.response.json()
                msg_from_api = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
                if isinstance(msg_from_api, list): msg_from_api = ", ".join(msg_from_api)
                error_message += f" API Message: {msg_from_api}"
            except json.JSONDecodeError: error_message += f" Raw Error (not JSON): {e.response.text[:200]}"
            print(f"ERROR (api_service - get_collections): HTTPStatusError: {error_message}")
            raise HTTPException(status_code=e.response.status_code, detail=error_message)
        
        except json.JSONDecodeError as e_json:
            print(f"ERROR (api_service - get_collections): json.JSONDecodeError: {str(e_json)}. Response text: {raw_response_text[:500]}")
            raise HTTPException(status_code=502, detail="Invalid JSON response from Droplinked for collections.")

        except Exception as e:
            print(f"ERROR (api_service - get_collections): Unexpected error: {str(e)}")
            traceback.print_exc()
            raise HTTPException(status_code=500, detail=f"Unexpected error fetching collections: {str(e)}")


async def create_new_droplinked_product(droplinked_jwt: str, product_data: dict) -> dict:
    """
    Manages the multi-step process of creating a new product via LLM interaction.
    'product_data' comes from the LLM's arguments potentially containing partial info.
    Returns a structured dictionary indicating status, next question, or results.
    """
    if not droplinked_jwt:
        return {"status": "error", "message": "Authentication token missing for create_new_droplinked_product."}

    print(f"DEBUG (api_service - create_tool): Tool 'create_new_droplinked_product' called with product_data from LLM: {product_data}")

    required_fields_for_api_flow = {
        "title": "What is the title (name) of the product? (REQUIRED)",
        "description": "What is the description for this product? (REQUIRED)",
        "productCollectionID_choice_index": "Please choose a collection for your product by typing its number (I will list them). (REQUIRED)",
        "price": "What is the price for the product? (e.g., 19.99) (REQUIRED)",
        "quantity": "How many units are available? Enter a number or -1 for unlimited. (REQUIRED)",
        "weight": "What is the weight of the product for shipping? (e.g., 0.5 for half a pound/kg) (REQUIRED)",
        "product_images": "Would you like to upload images for this product? You can upload them now or skip this step."
    }
    
    # Use session-based state management
    session_key = f"product_creation_{droplinked_jwt[:20]}"  # Use part of JWT as session key
    
    # Get existing state from session storage
    llm_current_state = product_data.get("current_state_data")
    session_state = PRODUCT_CREATION_SESSIONS.get(session_key, {})
    
    # Merge LLM state with session state, prioritizing LLM state if provided
    if isinstance(llm_current_state, dict) and llm_current_state:
        current_collected_data = llm_current_state.copy()
        print(f"DEBUG (api_service - create_tool): Using LLM provided state: {current_collected_data}")
    else:
        current_collected_data = session_state.copy()
        print(f"DEBUG (api_service - create_tool): Using session stored state: {current_collected_data}")
    
    # If user wants to create but we don't have much data, try to merge with session
    if product_data.get("user_confirmation") and len(current_collected_data) < 4:
        print(f"DEBUG (api_service - create_tool): 🔄 User confirmation detected but limited data. Merging with session...")
        # Merge session data first, then LLM data
        merged_data = session_state.copy()
        if isinstance(llm_current_state, dict):
            merged_data.update(llm_current_state)
        current_collected_data = merged_data
        print(f"DEBUG (api_service - create_tool): After merge: {current_collected_data}")
    
    # Check if this is a new product creation (reset session if user explicitly starts over)
    if product_data.get("reset_session") or (len(current_collected_data) == 0 and any(key in product_data for key in ["title", "description"])):
        current_collected_data = {}
        print(f"DEBUG (api_service - create_tool): Starting new product creation session")
    
    direct_fields_from_llm = [
        "title", "description", "productCollectionID", "selected_collection_title",
        "price", "quantity", "weight", "product_images", "uploaded_image_urls"
    ]
    for key in direct_fields_from_llm:
        if key in product_data and product_data[key] is not None:
            current_collected_data[key] = product_data[key]
            print(f"DEBUG (api_service - create_tool): Merged direct field '{key}': {str(product_data[key])[:100]}")
    
    # Handle "skip" for images
    if product_data.get("skip_images") or (isinstance(product_data.get("product_images"), str) and product_data.get("product_images").lower() in ["skip", "no", "none"]):
        current_collected_data["product_images"] = "skipped"
        print("DEBUG (api_service - create_tool): User chose to skip image upload")

    if "productCollectionID_choice_index" in product_data and product_data["productCollectionID_choice_index"] is not None:
        if "productCollectionID" not in current_collected_data or current_collected_data["productCollectionID"] is None:
            try:
                choice_index_str = str(product_data["productCollectionID_choice_index"]).strip()
                choice_index = int(choice_index_str) - 1
                _available_collections = current_collected_data.get("_available_collections_for_choice", [])
                
                # If we don't have the available collections in session, fetch them again
                if not _available_collections:
                    print(f"DEBUG (api_service - create_tool): No available collections in session, fetching fresh list")
                    try:
                        _available_collections = await get_collections(droplinked_jwt)
                        current_collected_data["_available_collections_for_choice"] = _available_collections
                    except Exception as e:
                        print(f"ERROR (api_service - create_tool): Failed to fetch collections: {e}")
                        return {"status": "error", "message": f"Could not fetch collections: {e}"}
                
                print(f"DEBUG (api_service - create_tool): Attempting to select collection index {choice_index} from {len(_available_collections)} available collections")
                if 0 <= choice_index < len(_available_collections):
                    selected_collection_obj = _available_collections[choice_index]
                    current_collected_data["productCollectionID"] = selected_collection_obj["id"]
                    current_collected_data["selected_collection_title"] = selected_collection_obj["title"]
                    current_collected_data.pop("_available_collections_for_choice", None)
                    print(f"DEBUG (api_service - create_tool): Collection selected via index: {selected_collection_obj['title']} (ID: {selected_collection_obj['id']})")
                    collections_debug = [f"{i+1}. {col.get('title')} (ID: {col.get('id')})" for i, col in enumerate(_available_collections)]
                    print(f"DEBUG (api_service - create_tool): Available collections were: {collections_debug}")
                else:
                    print(f"WARN (api_service - create_tool): Invalid collection choice index: {choice_index_str} (converted to {choice_index}), available range: 0-{len(_available_collections)-1}")
                    # Don't remove the collection data, just mark it as invalid so we ask again
                    current_collected_data.pop("productCollectionID", None)
                    current_collected_data.pop("selected_collection_title", None)
            except ValueError:
                print(f"WARN (api_service - create_tool): Non-integer collection choice: {product_data['productCollectionID_choice_index']}")
                current_collected_data.pop("productCollectionID", None)
                current_collected_data.pop("selected_collection_title", None)
        current_collected_data.pop("productCollectionID_choice_index", None)

    print(f"DEBUG (api_service - create_tool): Current collected_data (after all merges): {current_collected_data}")
    
    # Save current state to session storage
    PRODUCT_CREATION_SESSIONS[session_key] = current_collected_data.copy()
    print(f"DEBUG (api_service - create_tool): Saved state to session {session_key}")

    for field_key_in_flow, question_template in required_fields_for_api_flow.items():
        actual_field_to_check = "productCollectionID" if field_key_in_flow == "productCollectionID_choice_index" else field_key_in_flow
        
        # Check if field is missing or None, but allow "skipped" for images
        field_missing = (actual_field_to_check not in current_collected_data or 
                        current_collected_data[actual_field_to_check] is None)
        
        # Special handling for product_images field
        if actual_field_to_check == "product_images":
            has_images = (current_collected_data.get("uploaded_image_urls") and 
                         len(current_collected_data.get("uploaded_image_urls", [])) > 0)
            is_skipped = (current_collected_data.get("product_images") == "skipped")
            field_missing = not (has_images or is_skipped)
        
        if field_missing:
            if actual_field_to_check == "productCollectionID":
                print("DEBUG (api_service - create_tool): productCollectionID still missing, fetching collections to present choices...")
                try:
                    actual_collections_list = await get_collections(droplinked_jwt)
                    if actual_collections_list:
                        options_text = "Please choose a collection for your product by typing its number:\n"
                        for i, col in enumerate(actual_collections_list):
                            options_text += f"{i+1}. {col.get('title', f'Collection {i+1}')}\n"
                        current_collected_data["_available_collections_for_choice"] = actual_collections_list
                        return {"status": "requires_more_info", "next_question": options_text.strip(), "field_to_collect": "productCollectionID_choice_index", "current_data_collected": current_collected_data}
                    else:
                        return {"status": "error", "message": "No product collections found. Please create one on Droplinked first."}
                except Exception as e_coll:
                    detail_msg = e_coll.detail if isinstance(e_coll, HTTPException) else str(e_coll)
                    print(f"ERROR (api_service - create_tool): Exception fetching collections: {detail_msg}"); traceback.print_exc()
                    return {"status": "error", "message": f"Could not fetch collections: {detail_msg}"}
            # Special handling for image upload
            if actual_field_to_check == "product_images":
                return {
                    "status": "requires_image_upload", 
                    "next_question": "Would you like to upload product images? Please use the image upload feature in the chat interface, or type 'skip' to continue without images.", 
                    "field_to_collect": "product_images", 
                    "current_data_collected": current_collected_data
                }
            return {"status": "requires_more_info", "next_question": question_template, "field_to_collect": actual_field_to_check, "current_data_collected": current_collected_data}

    # Check if user wants to add more images
    if product_data.get("add_more_images") == True:
        return {
            "status": "requires_image_upload", 
            "next_question": "Please upload additional images using the image upload feature in the chat interface, or type 'done' when you're finished adding images.", 
            "field_to_collect": "product_images", 
            "current_data_collected": current_collected_data
        }

    # Check if user explicitly confirmed creation
    user_wants_to_create = (
        product_data.get("user_confirmation") == True or 
        product_data.get("confirm_creation") == True or
        product_data.get("create_product") == True
    )
    
    # Also check if we have all required fields and user_confirmation is True
    # This means the assistant detected user wants to create the product
    if user_wants_to_create:
        print(f"DEBUG (api_service - create_tool): 🎯 User wants to create product! Checking if we have all required fields...")
        required_for_api = ["title", "description", "productCollectionID", "price", "quantity", "weight"]
        missing_fields = [field for field in required_for_api if field not in current_collected_data or current_collected_data[field] is None]
        
        if missing_fields:
            print(f"DEBUG (api_service - create_tool): ⚠️ User wants to create but missing fields: {missing_fields}")
            # Don't proceed with creation, ask for missing fields first
            user_wants_to_create = False
    
    if not user_wants_to_create:
        # Include detailed image information in summary
        image_info = ""
        uploaded_images = current_collected_data.get('uploaded_image_urls', [])
        if uploaded_images:
            image_info = f"- Images: {len(uploaded_images)} image(s) uploaded\n"
            for i, img_url in enumerate(uploaded_images, 1):
                filename = img_url.split('/')[-1] if '/' in img_url else f"image_{i}"
                image_info += f"  {i}. {filename}\n"
        else:
            image_info = "- Images: No images uploaded\n"
            
        summary = (f"Here's a summary of your product:\n\n"
                   f"- Title: {current_collected_data.get('title')}\n"
                   f"- Description: {str(current_collected_data.get('description', ''))[:100]}{'...' if len(str(current_collected_data.get('description', ''))) > 100 else ''}\n"
                   f"- Collection: {current_collected_data.get('selected_collection_title', current_collected_data.get('productCollectionID'))}\n"
                   f"- Price: ${float(current_collected_data.get('price', 0.0)):.2f}\n"
                   f"- Quantity: {int(current_collected_data.get('quantity', 0)) if int(current_collected_data.get('quantity', 0)) != -1 else 'Unlimited'}\n"
                   f"- Weight: {float(current_collected_data.get('weight', 0.0))}\n"
                   f"{image_info}\n"
                   f"⚠️ IMPORTANT: To actually create this product, you must call this tool again with 'user_confirmation': true or 'create_product': true.\n\n"
                   f"Would you like to:\n"
                   f"1. Create the product as is\n"
                   f"2. Add more images\n"
                   f"3. Make changes to the details\n\n"
                   f"Please type 'create', 'add images', or tell me what you'd like to change.")
        print(f"DEBUG (api_service - create_tool): Awaiting user confirmation. Current data: {current_collected_data}")
        return {"status": "awaiting_final_confirmation", "confirmation_question": summary, "current_data_collected": current_collected_data}

    print(f"INFO (api_service - create_tool): ✅ USER CONFIRMATION RECEIVED! Preparing DTO for API.")
    print(f"DEBUG (api_service - create_tool): Confirmation flags in product_data: user_confirmation={product_data.get('user_confirmation')}, confirm_creation={product_data.get('confirm_creation')}, create_product={product_data.get('create_product')}")
    print(f"DEBUG (api_service - create_tool): Final collected data before API call: {current_collected_data}")
    
    # Verify we have all required fields
    required_for_api = ["title", "description", "productCollectionID", "price", "quantity", "weight"]
    missing_fields = [field for field in required_for_api if field not in current_collected_data or current_collected_data[field] is None]
    if missing_fields:
        print(f"ERROR (api_service - create_tool): ❌ MISSING REQUIRED FIELDS: {missing_fields}")
        print(f"ERROR (api_service - create_tool): Current data: {current_collected_data}")
        
        # Return to collection step to gather missing info
        missing_info = []
        for field in missing_fields:
            if field == "productCollectionID":
                missing_info.append("collection selection")
            elif field == "quantity":
                missing_info.append("quantity (how many units)")
            elif field == "weight":
                missing_info.append("weight (for shipping)")
            else:
                missing_info.append(field)
        
        return {
            "status": "error", 
            "message": f"Cannot create product yet. Missing required information: {', '.join(missing_info)}. Please provide all required details first.",
            "missing_fields": missing_fields,
            "current_data_collected": current_collected_data
        }
    
    default_sku_option = {"variantID": "62a989ab1f2c2bbc5b1e7153", "variantName": "Color", "value": "Default", "caption": "Default", "isCustom": False}
    
    # Prepare media array from uploaded images (Droplinked expects objects, not strings)
    media_array = []
    uploaded_images = current_collected_data.get('uploaded_image_urls', [])
    if uploaded_images:
        for i, img_url in enumerate(uploaded_images):
            if isinstance(img_url, str) and img_url.strip():
                # Extract filename from URL or use a default
                filename = img_url.split('/')[-1] if '/' in img_url else f"image_{i+1}.png"
                # Create thumbnail URL (Droplinked usually provides _small version)
                thumbnail_url = img_url.replace('.png', '_small.png').replace('.jpg', '_small.jpg').replace('.jpeg', '_small.jpeg')
                
                media_obj = {
                    "thumbnail": thumbnail_url,
                    "url": img_url.strip(),
                    "isMain": i == 0,  # First image is main
                    "fileName": filename,
                    "fileSize": "1.0"  # Default file size
                }
                media_array.append(media_obj)
        print(f"DEBUG (api_service - create_tool): Including {len(media_array)} images in product media")
    
    try:
        # Create properties array for color variant
        properties_array = [{
            "title": "Color",
            "value": "62a989ab1f2c2bbc5b1e7153",
            "items": [{
                "caption": "Default",
                "value": "Default"
            }],
            "isCustom": False
        }]
        
        # Create SKU with proper structure
        sku_quantity = int(current_collected_data.get("quantity"))
        if sku_quantity == -1:
            sku_quantity = 1000  # Use 1000 instead of 999999 for unlimited
            
        sku_array = [{
            "externalID": f"SKU-{str(current_collected_data.get('title', 'prod')).replace(' ', '_')[:10]}-{int(time.time())}",
            "rawPrice": float(current_collected_data.get("price")),
            "index": 0,
            "options": [{
                "variantID": "62a989ab1f2c2bbc5b1e7153",
                "variantName": "Color",
                "value": "Default",
                "caption": "Default",
                "isCustom": False
            }],
            "price": float(current_collected_data.get("price")),
            "quantity": sku_quantity,
            "record": False,
            "weight": float(current_collected_data.get("weight")),
            "dimensions": {
                "width": 1,
                "height": 1,
                "length": 1
            },
            "royalty": None
        }]
        
        final_api_dto = {
            "prodviderID": None,
            "custome_external_id": None,
            "product_type": "NORMAL",
            "productCollectionID": str(current_collected_data.get("productCollectionID")),
            "mainCategory": None,
            "subCategories": [],
            "title": str(current_collected_data.get("title")),
            "description": f"<p>{str(current_collected_data.get('description', ''))}</p>",
            "media": media_array,
            "tags": [],
            "thumb": "",
            "priceUnit": "USD",
            "shippingType": "EASY_POST",
            "shippingPrice": 0,
            "commission": 0,
            "canBeAffiliated": False,
            "purchaseAvailable": True,
            "isAddToCartDisabled": False,
            "publish_product": True,
            "publish_status": "PUBLISHED",
            "pre_purchase_data_fetch": False,
            "launchDate": None,
            "properties": properties_array,
            "sku": sku_array,
            "pod_blank_product_id": None,
            "printful_template_id": None,
            "technique": None,
            "printful_option_data": None,
            "artwork": None,
            "artwork2": None,
            "artwork_position": None,
            "artwork2_position": None,
            "m2m_positions": [],
            "m2m_positions_options": [],
            "m2m_services": [],
            "positions": None,
            "digitalDetail": {
                "chain": ""
            }
        }
    except (ValueError, TypeError) as e_type:
        print(f"ERROR (api_service - create_tool): Type error during DTO construction: {str(e_type)}")
        return {"status": "error", "message": f"Issue with data types: {str(e_type)}"}

    print(f"DEBUG (api_service - create_tool): Final DTO for API call: {json.dumps(final_api_dto, indent=2)}")
    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Content-Type": "application/json", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/product"
    print(f"INFO (api_service - create_tool): About to make POST request to {url}")
    
    # Validate critical fields before API call
    if not final_api_dto.get("productCollectionID"):
        return {"status": "error", "message": "Product collection ID is missing or invalid"}
    
    raw_response_text_create = ""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=final_api_dto, timeout=30.0)
            raw_response_text_create = response.text
            print(f"DEBUG (api_service - create_tool): Droplinked API Create Status: {response.status_code}")
            print(f"DEBUG (api_service - create_tool): Droplinked API Create Raw Response (first 500): {raw_response_text_create[:500]}")
            response.raise_for_status()
            api_response_data = response.json()
            created_title = api_response_data.get("data", {}).get("title", final_api_dto.get("title", "The product"))
            
            # Clear the session state after successful creation
            if session_key in PRODUCT_CREATION_SESSIONS:
                del PRODUCT_CREATION_SESSIONS[session_key]
                print(f"DEBUG (api_service - create_tool): Cleared session state {session_key} after successful creation")
            
            return {"status": "success", "message": f"Product '{created_title}' created successfully!", "product_details": api_response_data.get("data")}
        except httpx.HTTPStatusError as e:
            error_message = f"Failed to create product on Droplinked (Status: {e.response.status_code})."
            try:
                error_details = e.response.json(); 
                msg = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
                if isinstance(msg, list): msg = ", ".join(msg)
                error_message += f" API Error: {msg}"
                
                # Add helpful context for common errors
                if e.response.status_code == 500:
                    error_message += " This appears to be a server-side issue with Droplinked."
                    # Check if product was actually created despite the error
                    try:
                        print(f"DEBUG (api_service - create_tool): Checking if product was created despite 500 error...")
                        recent_products = await list_user_products(droplinked_jwt, page=1, limit=5)
                        if recent_products.get("data", {}).get("data"):
                            recent_product_titles = [p.get("title", "") for p in recent_products["data"]["data"]]
                            if final_api_dto.get("title") in recent_product_titles:
                                print(f"INFO (api_service - create_tool): Product '{final_api_dto['title']}' was actually created despite 500 error!")
                                # Clear the session state since product was created
                                if session_key in PRODUCT_CREATION_SESSIONS:
                                    del PRODUCT_CREATION_SESSIONS[session_key]
                                return {"status": "success", "message": f"Product '{final_api_dto['title']}' was created successfully (despite API error response)!"}
                    except Exception as check_error:
                        print(f"DEBUG (api_service - create_tool): Could not verify if product was created: {check_error}")
                    
                    error_message += " Please check your products list to see if it was created, or try again in a few moments."
                elif e.response.status_code == 400:
                    error_message += " There may be an issue with the product data format."
                    
            except json.JSONDecodeError: error_message += f" Raw Error: {e.response.text[:200]}"
            print(f"ERROR (api_service - create_tool): HTTPStatusError on final create: {error_message}")
            return {"status": "api_error", "message": error_message} 
        except Exception as e_final:
            print(f"ERROR (api_service - create_tool): Unexpected error on final create: {str(e_final)}")
            traceback.print_exc()
            return {"status": "error", "message": f"Unexpected internal error on product creation: {str(e_final)}"}

async def upload_image_to_droplinked(droplinked_jwt: str, image_file: UploadFile) -> dict:
    """
    Uploads an image file to Droplinked's upload service.
    Returns the response containing the uploaded image URLs.
    """
    if not droplinked_jwt:
        print("ERROR (api_service - upload_image): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for image upload.")

    if not image_file:
        raise HTTPException(status_code=400, detail="No image file provided.")

    # Validate file type
    allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if image_file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_types)}"
        )

    # Validate file size (max 10MB)
    max_size = 10 * 1024 * 1024  # 10MB
    if image_file.size and image_file.size > max_size:
        raise HTTPException(status_code=400, detail="File size too large. Maximum size is 10MB.")

    print(f"DEBUG (api_service - upload_image): Uploading image {image_file.filename}, size: {image_file.size}, type: {image_file.content_type}")

    try:
        # Read file content
        file_content = await image_file.read()
        
        # Prepare multipart form data
        files = {
            "image": (image_file.filename, file_content, image_file.content_type)
        }
        
        headers = {
            "Authorization": f"Bearer {droplinked_jwt}",
            "Accept": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                DROPLINKED_UPLOAD_URL,
                headers=headers,
                files=files,
                timeout=30.0
            )
            
            print(f"DEBUG (api_service - upload_image): Upload response status: {response.status_code}")
            raw_response_text = response.text
            print(f"DEBUG (api_service - upload_image): Upload response (first 500): {raw_response_text[:500]}")
            
            response.raise_for_status()
            upload_result = response.json()
            
            print(f"DEBUG (api_service - upload_image): Upload successful: {upload_result}")
            return upload_result

    except httpx.HTTPStatusError as e:
        error_message = f"Failed to upload image (Status: {e.response.status_code})."
        try:
            error_details = e.response.json()
            msg = error_details.get('message', error_details.get('error', e.response.text[:100]))
            if isinstance(msg, list):
                msg = ", ".join(msg)
            error_message += f" Details: {msg}"
        except json.JSONDecodeError:
            error_message += f" Raw Error: {e.response.text[:200]}"
        print(f"ERROR (api_service - upload_image): HTTPStatusError: {error_message}")
        raise HTTPException(status_code=e.response.status_code, detail=error_message)
    
    except Exception as e:
        print(f"ERROR (api_service - upload_image): Unexpected error: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Unexpected error uploading image: {str(e)}")

async def get_product_by_id(droplinked_jwt: str, product_id: str) -> dict:
    """
    Fetches a specific product by ID from the Droplinked API.
    Returns the parsed JSON dictionary from the API response.
    """
    if not droplinked_jwt:
        print("ERROR (api_service - get_product_by_id): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for getting product.")

    if not product_id:
        raise HTTPException(status_code=400, detail="Product ID is required.")

    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/product/{product_id}"

    print(f"DEBUG (api_service - get_product_by_id): Calling Droplinked GET {url}, token: {droplinked_jwt[:20]}...")
    
    raw_response_text = "" 
    try:
        # Use robust request method with retries
        response = await make_robust_request(
            method="GET",
            url=url,
            headers=headers
        )
        
        print(f"DEBUG (api_service - get_product_by_id): Response Status: {response.status_code}")
        raw_response_text = response.text 

        response.raise_for_status() 

        parsed_json_response = response.json() 
        
        if not isinstance(parsed_json_response, dict):
            print(f"ERROR (api_service - get_product_by_id): Parsed response is not a dictionary! Type: {type(parsed_json_response)}")
            raise HTTPException(status_code=502, detail="Droplinked API returned an unexpected format for product (not a dictionary).")

        return parsed_json_response

    except HTTPException as e:
        # Re-raise HTTPExceptions from robust_request
        raise e
    except httpx.HTTPStatusError as e:
        error_message = f"Failed to get product (Droplinked API Status: {e.response.status_code})."
        try:
            error_details = e.response.json()
            msg_from_api = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
            if isinstance(msg_from_api, list): msg_from_api = ", ".join(msg_from_api)
            error_message += f" API Message: {msg_from_api}"
        except json.JSONDecodeError: error_message += f" Raw Error (not JSON): {e.response.text[:200]}"
        print(f"ERROR (api_service - get_product_by_id): HTTPStatusError: {error_message}")
        raise HTTPException(status_code=e.response.status_code, detail=error_message)
    except json.JSONDecodeError as e_json:
        print(f"ERROR (api_service - get_product_by_id): json.JSONDecodeError: {str(e_json)}")
        print(f"ERROR (api_service - get_product_by_id): Non-JSON response text that failed to parse: {raw_response_text[:500]}")
        raise HTTPException(status_code=502, detail="Invalid JSON response from Droplinked for product.")
    except Exception as e:
        print(f"ERROR (api_service - get_product_by_id): Unexpected error: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Unexpected error getting product: {str(e)}")


async def update_product(droplinked_jwt: str, product_id: str, update_data: dict) -> dict:
    """
    Updates a specific product by ID via the Droplinked API.
    update_data should contain the fields to update (title, description, price, etc.)
    Returns the updated product data from the API response.
    """
    if not droplinked_jwt:
        print("ERROR (api_service - update_product): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for updating product.")

    if not product_id:
        raise HTTPException(status_code=400, detail="Product ID is required.")

    if not update_data:
        raise HTTPException(status_code=400, detail="Update data is required.")

    # Try to get current product data, but continue even if it fails
    current_product = None
    try:
        print(f"DEBUG (api_service - update_product): Attempting to fetch current product data...")
        current_product_response = await get_product_by_id(droplinked_jwt, product_id)
        current_product = current_product_response.get('data', {})
        
        print(f"DEBUG (api_service - update_product): Current product structure keys: {list(current_product.keys())}")
        
        # Handle price updates properly with full product context
        if 'price' in update_data and current_product:
            new_price = update_data.pop('price')  # Remove from update_data
            print(f"DEBUG (api_service - update_product): Updating price to {new_price}")
            
            # Check if product has skuIDs (variants) or uses simple pricing
            sku_ids = current_product.get('skuIDs', [])
            if sku_ids:
                print(f"DEBUG (api_service - update_product): Product has {len(sku_ids)} SKUs, updating SKU prices")
                # Update all SKU prices - make sure to update BOTH price and rawPrice
                for sku in sku_ids:
                    sku['price'] = new_price
                    sku['rawPrice'] = new_price  # This is likely the actual displayed price!
                    print(f"DEBUG (api_service - update_product): Updated SKU {sku.get('_id', 'unknown')} price: {new_price}, rawPrice: {new_price}")
                update_data['skuIDs'] = sku_ids
            else:
                # Simple product, update direct price
                print(f"DEBUG (api_service - update_product): Simple product, updating direct price")
                update_data['price'] = new_price
            
            # CRITICAL: Also update the lowestPrice and highestPrice fields!
            # These are likely what's displayed in the Droplinked interface
            update_data['lowestPrice'] = new_price
            update_data['highestPrice'] = new_price
            print(f"DEBUG (api_service - update_product): Also updating lowestPrice and highestPrice to {new_price}")
        
        # Preserve important fields to prevent status changes
        if current_product:
            preserve_fields = ['publish_status', 'productCollectionID', 'product_type', 'shippingType']
            for field in preserve_fields:
                if field in current_product and field not in update_data:
                    field_value = current_product[field]
                    
                    # Special handling for productCollectionID - extract just the ID string
                    if field == 'productCollectionID' and isinstance(field_value, dict):
                        field_value = field_value.get('_id', field_value)
                        print(f"DEBUG (api_service - update_product): Extracting productCollectionID: {field_value}")
                    
                    update_data[field] = field_value
                    print(f"DEBUG (api_service - update_product): Preserving {field}: {field_value}")
        
    except Exception as e:
        print(f"WARNING (api_service - update_product): Could not fetch current product data: {e}")
        print(f"DEBUG (api_service - update_product): Attempting fallback direct update approach...")
        
        # Fallback: Try direct price update using common Droplinked structure
        if 'price' in update_data:
            new_price = update_data.get('price')
            print(f"DEBUG (api_service - update_product): FALLBACK - Direct price update to {new_price}")
            
            # Use both approaches in case one works
            # Method 1: Direct price field
            update_data['price'] = new_price
            
            # Method 2: Update lowestPrice and highestPrice (likely what's displayed!)
            update_data['lowestPrice'] = new_price
            update_data['highestPrice'] = new_price
            
            # Method 3: Assume SKU structure and update that too
            fallback_sku = [{
                "price": new_price,
                "rawPrice": new_price  # Make sure both fields match!
            }]
            update_data['sku'] = fallback_sku
            
            # Method 4: Also try skuIDs format
            fallback_sku_ids = [{
                "price": new_price,
                "rawPrice": new_price  # Make sure both fields match!
            }]
            update_data['skuIDs'] = fallback_sku_ids
            
            print(f"DEBUG (api_service - update_product): FALLBACK - Using multiple price update strategies including lowestPrice/highestPrice: {new_price}")

    headers = {
        "Authorization": f"Bearer {droplinked_jwt}", 
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    url = f"{DROPLINKED_API_BASE_URL}/product/{product_id}"

    print(f"DEBUG (api_service - update_product): Calling Droplinked PUT {url}, token: {droplinked_jwt[:20]}...")
    print(f"DEBUG (api_service - update_product): Update data: {update_data}")
    
    raw_response_text = "" 
    try:
        # Use robust request method with retries
        response = await make_robust_request(
            method="PUT",
            url=url,
            headers=headers,
            json=update_data
        )
        
        print(f"DEBUG (api_service - update_product): Response Status: {response.status_code}")
        raw_response_text = response.text 

        response.raise_for_status() 

        parsed_json_response = response.json() 
        
        if not isinstance(parsed_json_response, dict):
            print(f"ERROR (api_service - update_product): Parsed response is not a dictionary! Type: {type(parsed_json_response)}")
            raise HTTPException(status_code=502, detail="Droplinked API returned an unexpected format for updated product (not a dictionary).")

        print(f"DEBUG (api_service - update_product): ✅ Product update successful!")
        
        # Log the full response to understand the API structure
        if isinstance(parsed_json_response, dict) and 'data' in parsed_json_response:
            updated_product = parsed_json_response['data']
            print(f"DEBUG (api_service - update_product): Updated product title: {updated_product.get('title', 'N/A')}")
            print(f"DEBUG (api_service - update_product): Updated product lowestPrice: {updated_product.get('lowestPrice', 'N/A')}")
            print(f"DEBUG (api_service - update_product): Updated product highestPrice: {updated_product.get('highestPrice', 'N/A')}")
            
            # Check SKU prices in response - handle both dict and string SKUs
            response_skus = updated_product.get('skuIDs', [])
            for i, sku in enumerate(response_skus):
                # Handle case where sku might be a string ID instead of a dict
                if isinstance(sku, dict):
                    sku_id = sku.get('_id', f'sku_{i}')
                    sku_price = sku.get('price', 'N/A')
                    sku_raw_price = sku.get('rawPrice', 'N/A')
                    print(f"DEBUG (api_service - update_product): Response SKU {sku_id}: price={sku_price}, rawPrice={sku_raw_price}")
                elif isinstance(sku, str):
                    print(f"DEBUG (api_service - update_product): Response SKU {i}: ID={sku} (string reference)")
                else:
                    print(f"DEBUG (api_service - update_product): Response SKU {i}: Unexpected type={type(sku)}, value={sku}")
        
        return parsed_json_response

    except HTTPException as e:
        # Re-raise HTTPExceptions from robust_request
        raise e
    except httpx.HTTPStatusError as e:
        error_message = f"Failed to update product (Droplinked API Status: {e.response.status_code})."
        try:
            error_details = e.response.json()
            msg_from_api = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
            if isinstance(msg_from_api, list): msg_from_api = ", ".join(msg_from_api)
            error_message += f" API Message: {msg_from_api}"
        except json.JSONDecodeError: error_message += f" Raw Error (not JSON): {e.response.text[:200]}"
        print(f"ERROR (api_service - update_product): HTTPStatusError: {error_message}")
        raise HTTPException(status_code=e.response.status_code, detail=error_message)
    except json.JSONDecodeError as e_json:
        print(f"ERROR (api_service - update_product): json.JSONDecodeError: {str(e_json)}")
        print(f"ERROR (api_service - update_product): Non-JSON response text that failed to parse: {raw_response_text[:500]}")
        raise HTTPException(status_code=502, detail="Invalid JSON response from Droplinked for updated product.")
    except Exception as e:
        print(f"ERROR (api_service - update_product): Unexpected error: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Unexpected error updating product: {str(e)}")


async def delete_product(droplinked_jwt: str, product_id: str) -> dict:
    """
    Deletes a specific product by ID via the Droplinked API.
    Returns a confirmation message from the API response.
    """
    if not droplinked_jwt:
        print("ERROR (api_service - delete_product): No JWT provided.")
        raise HTTPException(status_code=401, detail="Authentication token missing for deleting product.")

    if not product_id:
        raise HTTPException(status_code=400, detail="Product ID is required.")

    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/product/{product_id}"

    print(f"DEBUG (api_service - delete_product): Calling Droplinked DELETE {url}, token: {droplinked_jwt[:20]}...")
    
    raw_response_text = "" 
    async with httpx.AsyncClient() as client:
        try:
            response = await client.delete(url, headers=headers, timeout=20.0)
            
            print(f"DEBUG (api_service - delete_product): Response Status: {response.status_code}")
            raw_response_text = response.text 

            response.raise_for_status() 

            # Delete endpoint might return just a success message, not necessarily JSON
            try:
                parsed_json_response = response.json() 
                if not isinstance(parsed_json_response, dict):
                    # If it's not a dict, wrap it in a success response
                    return {"status": "success", "message": "Product deleted successfully", "response": parsed_json_response}
                return parsed_json_response
            except json.JSONDecodeError:
                # If response is not JSON, assume success if status code is 2xx
                return {"status": "success", "message": "Product deleted successfully", "response": raw_response_text}

        except httpx.HTTPStatusError as e:
            error_message = f"Failed to delete product (Droplinked API Status: {e.response.status_code})."
            try:
                error_details = e.response.json()
                msg_from_api = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
                if isinstance(msg_from_api, list): msg_from_api = ", ".join(msg_from_api)
                error_message += f" API Message: {msg_from_api}"
            except json.JSONDecodeError: error_message += f" Raw Error (not JSON): {e.response.text[:200]}"
            print(f"ERROR (api_service - delete_product): HTTPStatusError: {error_message}")
            raise HTTPException(status_code=e.response.status_code, detail=error_message)

        except httpx.RequestError as e:
            print(f"ERROR (api_service - delete_product): httpx.RequestError: {str(e)}")
            raise HTTPException(status_code=503, detail=f"Network error deleting product: {str(e)}")

        except Exception as e:
            print(f"ERROR (api_service - delete_product): Unexpected error: {str(e)}")
            traceback.print_exc()
            raise HTTPException(status_code=500, detail=f"Unexpected error deleting product: {str(e)}")