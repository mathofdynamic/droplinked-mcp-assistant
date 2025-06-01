# Droplinked MCP (Model Context Protocol) Server

A FastAPI-based intelligent assistant that integrates with the Droplinked e-commerce platform, providing AI-powered product management capabilities through OpenAI's Assistant API with advanced AI image generation.

## 🚀 Features

- **AI-Powered Product Management**: Create, list, and manage Droplinked products through natural language conversations
- **🎨 AI Mockup Generation**: 
  - Generate professional AI-enhanced product mockups using OpenAI's GPT-Image-1 model
  - Automatic clothing detection - garments shown on models in different poses/settings
  - Cost-effective generation (~$0.033 for 3 professional mockups)
  - Smart prompts for fashion vs. general products
- **📦 Complete Product Management**:
  - **Get Product Details**: View comprehensive product information including pricing, media, and settings
  - **Update Products**: Modify product fields like title, description, price, collection, tags, and more
  - **Delete Products**: Remove products with safety confirmations
  - **Product Discovery**: List and search through your product catalog
- **Enhanced Image Upload Flow**: 
  - Upload multiple product images with intuitive workflow
  - Add images incrementally during product creation
  - AI mockup option offered after first image upload
  - Clear options to continue or add more images
  - No premature product creation after single image upload
- **Streamlined Workflow**: Single function approach with clear action-based steps
- **Collection Management**: Browse and organize products into collections
- **Secure Authentication**: JWT-based authentication with Droplinked API
- **Interactive Web Interface**: Modern chat-based UI with drag-and-drop image upload functionality
- **OpenAI Assistant Integration**: Leverages OpenAI's Assistant API for intelligent responses
- **Final Confirmation Process**: Always requires explicit user confirmation before creating products
- **Real-time Communication**: WebSocket-like experience through FastAPI endpoints
- **🔧 Robust Error Handling**: Enhanced error handling with automatic retries and comprehensive logging
- **📊 Improved API Response Processing**: Better handling of various Droplinked API response formats

## 📋 Prerequisites

- Python 3.8+
- OpenAI API account and API key
- Droplinked account and API access
- Modern web browser

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd droplinked_mcp
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## ⚙️ Configuration

1. **Create environment file**
   Create a `.env` file in the project root with the following variables:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   ASSISTANT_ID=your_openai_assistant_id_here
   
   # Droplinked Configuration (Optional - for test user workaround)
   STATIC_DROPLINKED_JWT=your_static_jwt_for_testing
   ```

2. **OpenAI Assistant Setup**
   - Create an OpenAI Assistant in your OpenAI dashboard
   - Configure the assistant with the following tools:
     - `list_my_droplinked_products`: List user's products
     - `create_new_droplinked_product`: Create new products (with image support)
     - `get_droplinked_shop_collections`: Get product collections
     - `handle_image_upload_response`: Process uploaded images
   - Copy the Assistant ID to your `.env` file

3. **Droplinked API Configuration**
   - The application uses the Droplinked API base URL: `https://apiv3.droplinked.com`
   - Image uploads use the Droplinked upload service: `https://tools.droplinked.com/upload`
   - Authentication is handled through the `/auth/login/basic` endpoint
   - A test user workaround is available for `mathofdynamic@gmail.com`

4. **AI Mockup Configuration**
   - Uses OpenAI's GPT-Image-1 model for professional mockup generation
   - Automatic clothing detection with GPT-4V
   - Cost structure:
     - Low quality: $0.011 per image
     - Medium quality: $0.042 per image  
     - High quality: $0.167 per image
   - Default setting: Low quality for cost efficiency (~$0.033 for 3 mockups)
   - Smart prompts differentiate between clothing and general products

## 🚀 Running the Application

1. **Start the server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`
   - You'll see the chat interface for the Droplinked MCP Assistant

3. **Authentication**
   - Visit `http://localhost:8000/login` to authenticate with your Droplinked credentials
   - The JWT token will be used for subsequent API calls

## 📁 Project Structure

```
droplinked_mcp/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── core/
│   │   └── config.py          # Configuration settings
│   ├── models/                # Pydantic models (currently empty)
│   ├── routers/
│   │   └── chatbot_router.py  # Chat API endpoints
│   └── services/
│       ├── auth_service.py    # Authentication logic
│       ├── droplinked_api_service.py  # Droplinked API integration
│       ├── ai_mockup_service.py       # AI image generation service
│       └── nlu_service.py     # Natural language understanding
├── openai_config/             # OpenAI Assistant configuration
│   ├── assistant_system_instructions.md
│   ├── updated_function_definition.json
│   └── simplified_instructions.md
├── static/
│   ├── script.js             # Frontend JavaScript
│   └── style.css             # Frontend styling
├── templates/
│   ├── index.html            # Main chat interface
│   └── login.html            # Login page
├── tests/                    # Test files
├── requirements.txt          # Python dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🔧 API Endpoints

### Authentication
- `GET /login` - Login page
- `POST /auth/mcp/login` - Authenticate user and get JWT token

### Chat Interface
- `GET /` - Main chat interface
- `POST /chatbot/message` - Send message to AI assistant

### Image Upload
- `POST /upload/image` - Upload product images (requires authentication)

### Health Check
- `GET /health` - Application health status

## 🤖 Available AI Tools

The OpenAI Assistant uses a streamlined single-function approach:

### **manage_droplinked_product** (Primary Function)
A comprehensive function that handles all product creation steps through action parameters:

- **Action: `create_product`** - Data collection phase
  - Collects required information: title, description, collection, price, quantity, weight
  - Guides users through step-by-step data gathering

- **Action: `upload_images`** - Image processing phase
  - Processes uploaded product images
  - Supports multiple image uploads per product
  - Offers AI mockup generation option

- **Action: `generate_ai_mockups`** - AI enhancement phase
  - Generates 3 professional AI-enhanced mockups using GPT-Image-1
  - Automatically detects clothing items and shows them on models
  - Creates studio, lifestyle, and premium fashion photos
  - Cost: ~$0.033 for 3 high-quality mockups

- **Action: `show_summary`** - Confirmation phase
  - Displays complete product summary before creation
  - Shows all collected data including images
  - Requires explicit user confirmation

- **Action: `confirm_creation`** - Final creation phase
  - Actually creates the product on Droplinked
  - Only executes after user sees and confirms summary

### **Supporting Functions**
- **list_my_droplinked_products** - Lists user's existing products with pagination
- **get_droplinked_shop_collections** - Retrieves available product collections

### **Product Management Functions**
- **manage_product_operations** - Unified function for getting, updating, or deleting products (RECOMMENDED)
  - **Action: `get_product`** - Retrieve detailed product information by ID
  - **Action: `update_product`** - Modify product fields (title, description, price, collection, tags, etc.)
  - **Action: `delete_product`** - Remove products with safety confirmations
- **get_product_by_id** - Get detailed information about a specific product
- **update_product** - Update specific product fields with granular control
- **delete_product** - Delete products (requires explicit confirmation)

## 💬 Usage Examples

### Creating a Product with AI Mockup Generation
```
User: "I want to create a new product"
Assistant: "I'll help you create a new product. What is the title (name) of the product?"
User: "Vintage Denim Jacket"
Assistant: "What is the description for this product?"
User: "Classic vintage-style denim jacket with distressed details"
... (continues with guided setup including collection selection)
Assistant: "Would you like to upload product images? Please use the image upload feature in the chat interface, or type 'skip' to continue without images."
User: [Uploads first image using the camera button]
Assistant: "Great! I've uploaded your first image. You now have 1 image for your product.

🎨 **AI Mockup Option**: I can generate 3 professional AI-enhanced mockups from your image (cost: ~$0.033). For clothing items, I'll show them on models in different settings!

Would you like to:
1. **Generate AI mockups** (recommended for better sales)
2. Upload more images manually
3. Continue with just your original image

Type 'generate mockups', 'upload more', or 'continue' to proceed."
User: "generate mockups"
Assistant: "🎉 Successfully generated 3 AI mockups! You now have 4 images total (1 original + 3 AI-enhanced). The AI has created professional versions showing your product in different styles and settings."
User: "create it"
Assistant: "Here's a summary of your product:

- Title: Vintage Denim Jacket
- Description: Classic vintage-style denim jacket with distressed details
- Collection: Fashion
- Price: $89.99
- Quantity: 25
- Weight: 1.2
- Images: 4 image(s) uploaded
  1. original_jacket.jpg
  2. ai_studio_model.png (AI-generated)
  3. ai_lifestyle_photo.png (AI-generated)
  4. ai_premium_fashion.png (AI-generated)

Would you like to:
1. Create the product as is
2. Add more images
3. Make changes to the details

Please type 'create', 'add images', or tell me what you'd like to change."
User: "create"
Assistant: "Product 'Vintage Denim Jacket' created successfully with 4 professional images!"
```

### Listing Products
```
User: "Show me my products"
Assistant: [Lists all products with details]

User: "Show me the first 5 products"
Assistant: [Lists first 5 products]
```

### Managing Collections
```
User: "What collections do I have?"
Assistant: [Lists available collections]
```

### Uploading Product Images
```
User: "I want to create a new product"
Assistant: [Guides through product creation process]
Assistant: "Would you like to upload images for this product?"
User: [Clicks the camera button (📷) in the chat interface]
User: [Selects multiple image files or drags and drops them]
Assistant: "I've received 3 images for your product. Processing..."
Assistant: "Images uploaded successfully! Continuing with product creation..."
```

### AI Mockup Generation
```
User: "I want to create a product called 'Summer Dress'"
Assistant: [Guides through product creation]
User: [Uploads dress image]
Assistant: "🎨 AI Mockup Option available! Generate 3 professional mockups?"
User: "yes"
Assistant: "✅ Generated 3 AI mockups showing the dress on models in studio, lifestyle, and premium settings!"
```

### Getting Product Information
```
User: "Show me details for my product with ID 64f1a2b3c4d5e6f7g8h9i0j1"
Assistant: "📦 **Product: Vintage Denim Jacket**
- **ID**: 64f1a2b3c4d5e6f7g8h9i0j1
- **Description**: Classic vintage-style denim jacket with distressed details
- **Price Range**: $79.99 - $89.99
- **Collection**: Fashion
- **Type**: NORMAL
- **Images**: 4 uploaded
- **Status**: PUBLISHED
- **Affiliate**: Yes (15% commission)"

User: "What products do I have?"
Assistant: [Lists products with titles and IDs, then asks which one to view in detail]
```

### Updating Products
```
User: "I want to update the price of my denim jacket to $95"
Assistant: "I'll help you update your product. First, let me get the current details..."
Assistant: [Shows current product information]
Assistant: "I can see your Vintage Denim Jacket is currently priced at $89.99. Would you like me to update it to $95.00?"
User: "Yes, update it"
Assistant: "✅ **Product Updated Successfully**
- **Product**: Vintage Denim Jacket (64f1a2b3c4d5e6f7g8h9i0j1)
- **Updated Fields**: price
- **Changes Applied**: Price updated from $89.99 to $95.00"

User: "Change the description of product 64f1a2b3c4d5e6f7g8h9i0j1 to 'Premium vintage denim jacket with authentic distressed finish'"
Assistant: [Gets current product, shows current description, then updates it]
Assistant: "✅ Description updated successfully!"
```

### Deleting Products
```
User: "Delete product 64f1a2b3c4d5e6f7g8h9i0j1"
Assistant: "⚠️ **Deletion Confirmation Required**

I found this product to delete:
📦 **Product: Vintage Denim Jacket**
- **ID**: 64f1a2b3c4d5e6f7g8h9i0j1
- **Price Range**: $95.00
- **Images**: 4 uploaded
- **Status**: PUBLISHED

**This action is irreversible.** Are you sure you want to permanently delete this product?"
User: "Yes, delete it"
Assistant: "✅ Product 'Vintage Denim Jacket' (64f1a2b3c4d5e6f7g8h9i0j1) has been permanently deleted from your store."
```

### Product Discovery and Management
```
User: "Show me all my products in the Fashion collection"
Assistant: [Lists products filtered by collection]

User: "Which of my products can be affiliated?"
Assistant: [Shows products with affiliate settings enabled]

User: "Update all my products to allow affiliate marketing with 20% commission"
Assistant: [Guides through bulk update process with confirmations]
```

**Image Upload Features:**
- Support for multiple image formats (JPEG, PNG, GIF, WebP)
- Drag-and-drop interface
- Real-time upload progress indicators
- Image preview functionality
- Maximum file size: 10MB per image
- Option to skip image upload if not needed

**AI Mockup Features:**
- Automatic clothing detection using GPT-4V
- Professional mockup generation with GPT-Image-1
- Fashion items shown on models in different poses/settings
- Cost-effective: ~$0.033 for 3 professional images
- Smart prompts for different product types
- Seamless integration with product creation workflow
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with Droplinked
- **Session Management**: In-memory session storage (suitable for development)
- **Error Handling**: Comprehensive error handling with detailed logging
- **Input Validation**: Pydantic models for request validation

## 🧪 Development

### Running Tests
```bash
# Run all tests
python -m pytest tests/

# Run with coverage
python -m pytest tests/ --cov=app
```

### Development Mode
```bash
# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Debugging
- Enable debug logging by checking console output
- All API calls and responses are logged for troubleshooting
- OpenAI Assistant interactions are tracked with detailed logs

## 🚨 Production Considerations

Before deploying to production, consider:

1. **Session Storage**: Replace in-memory session storage with Redis or database
2. **Environment Variables**: Use proper secret management
3. **HTTPS**: Enable SSL/TLS encryption
4. **Rate Limiting**: Implement API rate limiting
5. **Monitoring**: Add application monitoring and logging
6. **Database**: Consider persistent storage for session and user data

## 🐛 Troubleshooting

### Common Issues

1. **OpenAI Client Not Initialized**
   - Ensure `OPENAI_API_KEY` is set in `.env`
   - Verify the API key is valid

2. **Assistant ID Not Found**
   - Create an OpenAI Assistant and add the ID to `.env`
   - Ensure the assistant has the required tools configured

3. **Droplinked Authentication Fails**
   - Check your Droplinked credentials
   - Verify the API endpoint is accessible
   - For test user, ensure `STATIC_DROPLINKED_JWT` is set

4. **Tool Execution Errors**
   - Check that JWT token is valid and not expired
   - Verify Droplinked API permissions
   - Review console logs for detailed error messages

5. **Image Upload Issues**
   - Ensure file format is supported (JPEG, PNG, GIF, WebP)
   - Check file size is under 10MB limit
   - Verify authentication token is valid
   - Check browser console for upload errors
   - Ensure Droplinked upload service is accessible

6. **AI Mockup Generation Issues**
   - Verify OpenAI API key has access to GPT-Image-1 model
   - Check that image format is supported (automatically converts to JPEG if needed)
   - Ensure sufficient OpenAI API credits for image generation
   - Review console logs for detailed error messages from OpenAI API
   - Verify image download from URL is successful before AI processing

7. **Product Update Errors (Fixed in v2.1.0)**
   - ✅ **Resolved**: `'str' object has no attribute 'get'` error during product updates
   - ✅ **Resolved**: Updates now properly handle both dictionary and string SKU responses from Droplinked API
   - If you still see update errors, ensure you're using the latest version

8. **Dependency Issues (Fixed in v2.1.0)**
   - ✅ **Resolved**: Pillow import errors with `_imaging` module
   - ✅ **Resolved**: `jiter` dependency issues affecting OpenAI client
   - **Solution Applied**: Reinstalled Pillow 10.4.0 and jiter for compatibility
   - If you encounter dependency issues, try:
     ```bash
     pip uninstall Pillow jiter -y
     pip install Pillow==10.4.0 jiter
     ```

9. **Server Startup Issues**
   - **ImportError for PIL/_imaging**: Run `pip uninstall Pillow -y && pip install Pillow==10.4.0`
   - **No module named 'jiter.jiter'**: Run `pip uninstall jiter -y && pip install jiter`
   - **OpenAI client failures**: Ensure both OpenAI and jiter packages are properly installed
   - Check Python version compatibility (requires Python 3.8+)

10. **False Error Messages After Successful Operations**
    - ✅ **Fixed**: Product updates that actually succeeded but showed error messages
    - ✅ **Fixed**: SKU response parsing that caused post-operation errors
    - Operations now correctly report success/failure status

### Debugging Steps

1. **Check Server Status**
   ```bash
   # Verify Python processes are running
   Get-Process | Where-Object {$_.ProcessName -like "*python*"}
   
   # Test server response (PowerShell)
   Invoke-WebRequest -Uri http://localhost:8000/ -UseBasicParsing
   ```

2. **Review Logs**
   - Check console output for detailed error messages
   - Look for DEBUG/ERROR prefixed lines
   - API response codes and error details are logged

3. **Verify Dependencies**
   ```bash
   pip list | grep -E "(openai|pillow|jiter|fastapi)"
   ```

4. **Restart Fresh**
   ```bash
   # Stop server (Ctrl+C)
   # Reinstall problematic dependencies if needed
   pip uninstall Pillow jiter -y
   pip install Pillow==10.4.0 jiter
   # Restart server
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## 📝 Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **HTTPX**: Async HTTP client for API calls with retry logic
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management
- **Jinja2**: Template engine for HTML rendering
- **OpenAI**: Official OpenAI Python client (includes GPT-Image-1 support)
- **python-multipart**: Support for multipart form data (file uploads)
- **Pillow**: Image processing for format conversion and optimization (v10.4.0 for stability)
- **jiter**: JSON parsing library required by OpenAI client

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review the console logs for detailed error messages
- Ensure all environment variables are properly configured
- Verify OpenAI Assistant setup and tool configurations

## 🔄 Version History

- **v2.1.0**: Bug Fixes & Stability Improvements
  - 🐛 **Fixed Product Update Errors**: Resolved `'str' object has no attribute 'get'` error during product updates
  - 🔧 **Enhanced SKU Response Handling**: Better processing of Droplinked API responses with mixed SKU formats
  - 📦 **Dependency Fixes**: Resolved Pillow import errors and jiter compatibility issues
  - 🚀 **Improved Server Stability**: Better error handling and recovery mechanisms
  - 🛠️ **Enhanced Debugging**: More detailed logging and troubleshooting guidance
  - ✅ **Accurate Status Reporting**: Fixed false error messages after successful operations
  - 🔄 **Robust Request Handling**: Added retry logic and better timeout management

- **v2.0.0**: AI Mockup Generation & Streamlined Workflow
  - 🎨 **AI Mockup Generation**: Professional product mockups using OpenAI's GPT-Image-1
  - **Smart Clothing Detection**: Automatic detection of garments for model-based mockups
  - **Single Function Architecture**: Streamlined `manage_droplinked_product` with action-based workflow
  - **Enhanced User Experience**: Clear step-by-step guidance with proper confirmation flow
  - **Cost-Effective AI**: Generate 3 professional mockups for ~$0.033
  - **Improved Error Handling**: Better image format support and conversion
  - **Updated OpenAI Integration**: Latest Assistant API with comprehensive function definitions

- **v1.1.0**: Image Upload Integration
  - Added product image upload functionality
  - Integrated with Droplinked's upload service
  - Enhanced product creation flow with image support
  - Added drag-and-drop image upload interface

- **v1.0.0**: Initial release with core functionality
  - OpenAI Assistant integration
  - Droplinked API integration
  - Web-based chat interface
  - Product management tools 