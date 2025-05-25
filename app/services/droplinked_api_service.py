# app/services/droplinked_api_service.py
import httpx
from fastapi import HTTPException
import json
import traceback
import time

DROPLINKED_API_BASE_URL = "https://apiv3.droplinked.com"

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
        "title": "What is the title (name) of the product?",
        "description": "What is the description for this product?",
        "productCollectionID_choice_index": "Please choose a collection for your product by typing its number (I will list them).",
        "price": "What is the price for the product? (e.g., 19.99)",
        "quantity": "How many units are available? (Enter -1 for unlimited)",
        "weight": "What is the weight of the product (for shipping, e.g., 0.5 for half a pound/kg)?"
    }
    
    llm_current_state = product_data.get("current_state_data")
    current_collected_data = llm_current_state.copy() if isinstance(llm_current_state, dict) else {}
    
    direct_fields_from_llm = [
        "title", "description", "productCollectionID", "selected_collection_title",
        "price", "quantity", "weight"
    ]
    for key in direct_fields_from_llm:
        if key in product_data and product_data[key] is not None:
            current_collected_data[key] = product_data[key]
            print(f"DEBUG (api_service - create_tool): Merged direct field '{key}': {str(product_data[key])[:100]}")

    if "productCollectionID_choice_index" in product_data and product_data["productCollectionID_choice_index"] is not None:
        if "productCollectionID" not in current_collected_data or current_collected_data["productCollectionID"] is None:
            try:
                choice_index_str = str(product_data["productCollectionID_choice_index"]).strip()
                choice_index = int(choice_index_str) - 1
                _available_collections = current_collected_data.get("_available_collections_for_choice", [])
                if 0 <= choice_index < len(_available_collections):
                    selected_collection_obj = _available_collections[choice_index]
                    current_collected_data["productCollectionID"] = selected_collection_obj["id"]
                    current_collected_data["selected_collection_title"] = selected_collection_obj["title"]
                    current_collected_data.pop("_available_collections_for_choice", None)
                    print(f"DEBUG (api_service - create_tool): Collection selected via index: {selected_collection_obj['title']}")
                else:
                    print(f"WARN (api_service - create_tool): Invalid collection choice index: {choice_index_str}")
                    current_collected_data.pop("productCollectionID", None); current_collected_data.pop("selected_collection_title", None)
            except ValueError:
                print(f"WARN (api_service - create_tool): Non-integer collection choice: {product_data['productCollectionID_choice_index']}")
                current_collected_data.pop("productCollectionID", None); current_collected_data.pop("selected_collection_title", None)
        current_collected_data.pop("productCollectionID_choice_index", None)

    print(f"DEBUG (api_service - create_tool): Current collected_data (after all merges): {current_collected_data}")

    for field_key_in_flow, question_template in required_fields_for_api_flow.items():
        actual_field_to_check = "productCollectionID" if field_key_in_flow == "productCollectionID_choice_index" else field_key_in_flow
        if actual_field_to_check not in current_collected_data or current_collected_data[actual_field_to_check] is None:
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
            return {"status": "requires_more_info", "next_question": question_template, "field_to_collect": actual_field_to_check, "current_data_collected": current_collected_data}

    if not product_data.get("user_confirmation") == True:
        summary = (f"Okay, I have these details:\n"
                   f"- Title: {current_collected_data.get('title')}\n"
                   f"- Description: {str(current_collected_data.get('description', ''))[:60]}...\n"
                   f"- Collection: {current_collected_data.get('selected_collection_title', current_collected_data.get('productCollectionID'))}\n"
                   f"- Price: ${float(current_collected_data.get('price', 0.0)):.2f}\n"
                   f"- Quantity: {int(current_collected_data.get('quantity', 0)) if int(current_collected_data.get('quantity', 0)) != -1 else 'Unlimited'}\n"
                   f"- Weight: {float(current_collected_data.get('weight', 0.0))}\n"
                   f"Shall I create this product?")
        return {"status": "awaiting_confirmation", "confirmation_question": summary, "current_data_collected": current_collected_data}

    print(f"INFO (api_service - create_tool): User confirmation received. Preparing DTO for API.")
    default_sku_option = {"variantID": "62a989ab1f2c2bbc5b1e7153", "variantName": "Color", "value": "Default", "caption": "Default", "isCustom": False}
    try:
        final_api_dto = {
            "title": str(current_collected_data.get("title")),
            "description": f"<p>{str(current_collected_data.get('description', ''))}</p>",
            "productCollectionID": str(current_collected_data.get("productCollectionID")),
            "product_type": "NORMAL", "priceUnit": "USD", "shippingType": "EASY_POST",
            "shippingPrice": 0, "publish_product": True, "publish_status": "PUBLISHED",
            "media": [], "tags": [],
            "sku": [{"price": float(current_collected_data.get("price")), "rawPrice": float(current_collected_data.get("price")),
                     "quantity": int(current_collected_data.get("quantity")), "weight": float(current_collected_data.get("weight")),
                     "externalID": f"SKU-{str(current_collected_data.get('title', 'prod')).replace(' ', '_')[:10]}-{int(time.time())}",
                     "options": [default_sku_option], "dimensions": {"length": 1, "width": 1, "height": 1}}]}
    except (ValueError, TypeError) as e_type:
        print(f"ERROR (api_service - create_tool): Type error during DTO construction: {str(e_type)}")
        return {"status": "error", "message": f"Issue with data types: {str(e_type)}"}

    print(f"DEBUG (api_service - create_tool): Final DTO for API call: {json.dumps(final_api_dto, indent=2)}")
    headers = {"Authorization": f"Bearer {droplinked_jwt}", "Content-Type": "application/json", "Accept": "application/json"}
    url = f"{DROPLINKED_API_BASE_URL}/product"
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
            return {"status": "success", "message": f"Product '{created_title}' created successfully!", "product_details": api_response_data.get("data")}
        except httpx.HTTPStatusError as e:
            error_message = f"Droplinked API Error (Status: {e.response.status_code})."
            try:
                error_details = e.response.json(); 
                msg = error_details.get('message', error_details.get('data', {}).get('message', e.response.text[:100]))
                if isinstance(msg, list): msg = ", ".join(msg)
                error_message += f" Details: {msg}"
            except json.JSONDecodeError: error_message += f" Raw Error: {e.response.text[:200]}"
            print(f"ERROR (api_service - create_tool): HTTPStatusError on final create: {error_message}")
            return {"status": "api_error", "message": error_message} 
        except Exception as e_final:
            print(f"ERROR (api_service - create_tool): Unexpected error on final create: {str(e_final)}")
            traceback.print_exc()
            return {"status": "error", "message": f"Unexpected internal error on product creation: {str(e_final)}"}