#!/usr/bin/env python3
"""
Script to update OpenAI Assistant instructions with improved product list formatting.
"""

import os
from openai import OpenAI

def update_assistant_instructions():
    """Update the OpenAI Assistant with improved instructions."""
    
    # Initialize OpenAI client
    api_key = os.getenv("OPENAI_API_KEY")
    assistant_id = os.getenv("ASSISTANT_ID")
    
    if not api_key:
        print("❌ Error: OPENAI_API_KEY not found in environment variables")
        return False
        
    if not assistant_id:
        print("❌ Error: ASSISTANT_ID not found in environment variables")
        return False
    
    try:
        client = OpenAI(api_key=api_key)
        
        # Read the updated instructions
        with open("openai_config/updated_assistant_instructions.md", "r", encoding="utf-8") as f:
            new_instructions = f.read()
        
        print(f"📝 Updating Assistant {assistant_id} with improved instructions...")
        
        # Update the assistant
        updated_assistant = client.beta.assistants.update(
            assistant_id=assistant_id,
            instructions=new_instructions
        )
        
        print("✅ Assistant instructions updated successfully!")
        print(f"   Assistant ID: {updated_assistant.id}")
        print(f"   Model: {updated_assistant.model}")
        print(f"   Instructions length: {len(new_instructions)} characters")
        
        return True
        
    except Exception as e:
        print(f"❌ Error updating assistant: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔄 Starting Assistant Instruction Update...")
    success = update_assistant_instructions()
    
    if success:
        print("\n🎉 Update completed! The assistant should now properly display product lists.")
        print("💡 Try asking for your product list again in the web interface.")
    else:
        print("\n❌ Update failed. Please check the error messages above.") 