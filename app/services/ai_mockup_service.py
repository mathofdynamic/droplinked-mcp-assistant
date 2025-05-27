import os
import base64
from openai import OpenAI
from PIL import Image
from io import BytesIO
import json
from datetime import datetime
from typing import List, Dict, Any
import httpx
from fastapi import HTTPException

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

async def detect_clothing_item(image_data: bytes) -> bool:
    """Use GPT-4V to detect if the image contains clothing/garments"""
    try:
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Look at this image and determine if it shows clothing, garments, or wearable items (like shirts, pants, dresses, jackets, sweaters, etc.). Respond with only 'CLOTHING' if it's a wearable item, or 'OTHER' if it's not clothing."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=10
        )
        
        result = response.choices[0].message.content.strip().upper()
        return "CLOTHING" in result
        
    except Exception as e:
        print(f"WARNING (ai_mockup_service): Could not detect item type: {e}")
        # Default to clothing prompts if detection fails (safer for fashion items)
        return True

async def generate_ai_mockups(image_url: str, droplinked_jwt: str) -> List[str]:
    """
    Generate 3 AI mockup images from a single input image.
    Returns list of uploaded image URLs.
    """
    if not openai_client.api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    try:
        # Download the original image
        async with httpx.AsyncClient() as client:
            response = await client.get(image_url)
            response.raise_for_status()
            image_data = response.content
            content_type = response.headers.get('content-type', 'image/png')
        
        print(f"DEBUG (ai_mockup_service): Downloaded image from {image_url}, size: {len(image_data)} bytes, type: {content_type}")
        
        # Detect if this is clothing or general product
        is_clothing = await detect_clothing_item(image_data)
        
        if is_clothing:
            print("DEBUG (ai_mockup_service): Detected CLOTHING - Using fashion model prompts")
            enhancement_prompts = [
                "Show this clothing item being worn by an attractive model in a professional studio setting with clean white background. The model should be facing forward, well-lit, showing the garment's fit and style clearly. Professional fashion photography.",
                "Create a lifestyle photo of a person wearing this clothing item in a modern urban setting - walking down a stylish street, in a trendy cafe, or in a contemporary office. Natural lighting, candid pose, showing how the garment looks in real life.",
                "Generate a premium fashion photo of a model wearing this clothing item in an elegant indoor setting - luxury home, upscale restaurant, or sophisticated workspace. The model should be in a confident pose that showcases the garment's style and quality."
            ]
        else:
            print("DEBUG (ai_mockup_service): Detected GENERAL PRODUCT - Using standard prompts")
            enhancement_prompts = [
                "Transform this product into a professional e-commerce photo with clean white background, perfect lighting, and studio quality presentation.",
                "Create a lifestyle photo showing this product in a modern, stylish setting with natural lighting and appealing context.",
                "Generate a premium product mockup with elegant presentation, soft shadows, and commercial photography style."
            ]
        
        generated_urls = []
        
        # Generate 3 enhanced versions
        for i, prompt in enumerate(enhancement_prompts):
            print(f"DEBUG (ai_mockup_service): Generating mockup {i+1}/3: {prompt[:50]}...")
            
            try:
                # Ensure image is in a supported format
                try:
                    # Try to open and convert the image to ensure it's valid
                    pil_image = Image.open(BytesIO(image_data))
                    
                    # Convert to RGB if necessary (for JPEG compatibility)
                    if pil_image.mode in ('RGBA', 'LA', 'P'):
                        pil_image = pil_image.convert('RGB')
                    
                    # Save as JPEG to BytesIO
                    converted_image_data = BytesIO()
                    pil_image.save(converted_image_data, format='JPEG', quality=95)
                    converted_image_data.seek(0)
                    converted_image_data.name = "input_image.jpg"
                    
                    print(f"DEBUG (ai_mockup_service): Converted image to JPEG format")
                    
                except Exception as convert_error:
                    print(f"WARNING (ai_mockup_service): Could not convert image, using original: {convert_error}")
                    # Fallback to original image data
                    converted_image_data = BytesIO(image_data)
                    if 'jpeg' in content_type or 'jpg' in content_type:
                        converted_image_data.name = "input_image.jpg"
                    elif 'webp' in content_type:
                        converted_image_data.name = "input_image.webp"
                    else:
                        converted_image_data.name = "input_image.png"
                
                # Generate enhanced image using GPT-Image-1
                response = openai_client.images.edit(
                    model="gpt-image-1",
                    image=converted_image_data,
                    prompt=prompt,
                    size="1024x1024",
                    quality="low"  # Cost efficient!
                )
                
                # Get the generated image
                enhanced_image_base64 = response.data[0].b64_json
                enhanced_image_bytes = base64.b64decode(enhanced_image_base64)
                
                # Upload the enhanced image to Droplinked
                enhanced_url = await upload_generated_image_to_droplinked(
                    enhanced_image_bytes, 
                    f"ai_mockup_{i+1}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg",
                    droplinked_jwt
                )
                
                generated_urls.append(enhanced_url)
                print(f"DEBUG (ai_mockup_service): Successfully generated and uploaded mockup {i+1}")
                
            except Exception as e:
                print(f"ERROR (ai_mockup_service): Failed to generate mockup {i+1}: {e}")
                # Continue with other mockups even if one fails
                continue
        
        print(f"DEBUG (ai_mockup_service): Generated {len(generated_urls)} AI mockups successfully")
        return generated_urls
        
    except Exception as e:
        print(f"ERROR (ai_mockup_service): Failed to generate AI mockups: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate AI mockups: {str(e)}")

async def upload_generated_image_to_droplinked(image_bytes: bytes, filename: str, droplinked_jwt: str) -> str:
    """
    Upload a generated image to Droplinked and return the URL.
    """
    try:
        # Prepare multipart form data
        files = {
            "image": (filename, image_bytes, "image/jpeg")
        }
        
        headers = {
            "Authorization": f"Bearer {droplinked_jwt}",
            "Accept": "application/json"
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://tools.droplinked.com/upload",
                headers=headers,
                files=files,
                timeout=30.0
            )
            
            response.raise_for_status()
            upload_result = response.json()
            
            # Extract the URL from the response
            if upload_result.get("message") == "Upload successful" and upload_result.get("original"):
                return upload_result["original"]
            else:
                raise Exception(f"Upload response missing URL: {upload_result}")

    except Exception as e:
        print(f"ERROR (ai_mockup_service): Failed to upload generated image: {e}")
        raise Exception(f"Failed to upload generated image: {str(e)}")

def estimate_mockup_cost(num_images: int = 3) -> float:
    """Estimate cost for AI mockup generation"""
    # Official OpenAI pricing per image (1024x1024, low quality)
    cost_per_image = 0.011
    return num_images * cost_per_image 