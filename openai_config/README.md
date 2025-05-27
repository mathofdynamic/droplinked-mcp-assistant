# OpenAI Configuration Documentation

This folder contains all the OpenAI Assistant configuration files for the Droplinked Product Management Chatbot.

## Files Overview

### Function Definitions
- `function_create_new_droplinked_product.json` - Main product creation function
- `function_confirm_product_creation.json` - Confirmation flow trigger function  
- `function_continue_product_creation_after_images.json` - Continue after image uploads
- `function_handle_image_upload_response.json` - Process uploaded images

### System Configuration
- `assistant_system_instructions.md` - Complete system instructions for the assistant

## Important Notes

⚠️ **These files are for documentation and tracking purposes only!**

- All actual configuration must be done through the OpenAI Dashboard
- These files represent the current state of the OpenAI assistant configuration
- When making changes in OpenAI Dashboard, update these files accordingly for tracking

## Key Configuration Points

### Critical Workflow
1. **Never create a product without showing a summary first**
2. `confirm_product_creation` triggers summary display (does NOT create product)
3. `create_new_droplinked_product` with `user_confirmation: true` actually creates the product

### Backend Integration
- All functions correspond to tools in `app/routers/chatbot_router.py`
- The `AVAILABLE_TOOLS` dictionary maps OpenAI function names to backend functions
- Session state is maintained through `current_state_data` parameter

## Troubleshooting

If the confirmation flow isn't working:
1. Check that `confirm_product_creation` description emphasizes it shows summary first
2. Verify system instructions include the critical workflow section
3. Ensure backend `confirm_product_creation` function returns `"trigger_confirmation_flow"` status

## Maintenance

When updating OpenAI configuration:
1. Make changes in OpenAI Dashboard
2. Update corresponding files in this folder
3. Test the workflow end-to-end
4. Document any changes in git commits 