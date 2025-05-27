# Droplinked MCP (Model Context Protocol) Server

A FastAPI-based intelligent assistant that integrates with the Droplinked e-commerce platform, providing AI-powered product management capabilities through OpenAI's Assistant API.

## 🚀 Features

- **AI-Powered Product Management**: Create, list, and manage Droplinked products through natural language conversations
- **Enhanced Image Upload Flow**: 
  - Upload multiple product images with intuitive workflow
  - Add images incrementally during product creation
  - Clear options to continue or add more images
  - No premature product creation after single image upload
- **Collection Management**: Browse and organize products into collections
- **Secure Authentication**: JWT-based authentication with Droplinked API
- **Interactive Web Interface**: Modern chat-based UI with drag-and-drop image upload functionality
- **OpenAI Assistant Integration**: Leverages OpenAI's Assistant API for intelligent responses
- **Final Confirmation Process**: Always requires explicit user confirmation before creating products
- **Real-time Communication**: WebSocket-like experience through FastAPI endpoints

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
│       └── nlu_service.py     # Natural language understanding
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

The OpenAI Assistant has access to the following tools:

1. **list_my_droplinked_products**
   - Lists products for the authenticated user
   - Supports pagination with `page` and `limit` parameters

2. **create_new_droplinked_product**
   - Creates new products through guided conversation
   - Collects required information: title, description, collection, price, quantity, weight, and optional product images
   - Supports image upload during the creation process
   - Provides confirmation before creation

3. **get_droplinked_shop_collections**
   - Retrieves available product collections
   - Used for organizing products into categories

4. **handle_image_upload_response**
   - Processes uploaded product images
   - Supports multiple image uploads per product
   - Integrates with the conversational product creation flow

5. **continue_product_creation_after_images**
   - Continues product creation after image uploads are complete
   - Allows users to proceed to final confirmation

## 💬 Usage Examples

### Creating a Product with Multiple Images
```
User: "I want to create a new product"
Assistant: "I'll help you create a new product. What is the title (name) of the product?"
User: "Wireless Bluetooth Headphones"
Assistant: "What is the description for this product?"
User: "High-quality wireless headphones with noise cancellation"
... (continues with guided setup including image upload option)
Assistant: "Would you like to upload images for this product? You can upload them now or skip this step."
User: [Uploads first image using the camera button]
Assistant: "Great! I've uploaded your first image. You now have 1 image for your product.

Would you like to:
1. Upload more images
2. Continue with product creation

You can upload more images or type 'continue' to proceed."
User: [Uploads second image]
Assistant: "Perfect! I've uploaded 1 more image. You now have 2 images total for your product.

Would you like to:
1. Upload more images
2. Continue with product creation

You can upload more images or type 'continue' to proceed."
User: "continue"
Assistant: "Here's a summary of your product:

- Title: Wireless Bluetooth Headphones
- Description: High-quality wireless headphones with noise cancellation
- Collection: Electronics
- Price: $99.99
- Quantity: 50
- Weight: 0.5
- Images: 2 image(s) uploaded
  1. headphones_main.jpg
  2. headphones_side.jpg

Would you like to:
1. Create the product as is
2. Add more images
3. Make changes to the details

Please type 'create', 'add images', or tell me what you'd like to change."
User: "create"
Assistant: "Product 'Wireless Bluetooth Headphones' created successfully!"
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

**Image Upload Features:**
- Support for multiple image formats (JPEG, PNG, GIF, WebP)
- Drag-and-drop interface
- Real-time upload progress indicators
- Image preview functionality
- Maximum file size: 10MB per image
- Option to skip image upload if not needed
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

## 📝 Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **HTTPX**: Async HTTP client for API calls
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management
- **Jinja2**: Template engine for HTML rendering
- **OpenAI**: Official OpenAI Python client
- **python-multipart**: Support for multipart form data (file uploads)

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