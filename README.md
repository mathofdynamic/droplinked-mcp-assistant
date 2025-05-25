# Droplinked MCP (Model Context Protocol) Server

A FastAPI-based intelligent assistant that integrates with the Droplinked e-commerce platform, providing AI-powered product management capabilities through OpenAI's Assistant API.

## 🚀 Features

- **AI-Powered Product Management**: Create, list, and manage Droplinked products through natural language conversations
- **Collection Management**: Browse and organize products into collections
- **Secure Authentication**: JWT-based authentication with Droplinked API
- **Interactive Web Interface**: Modern chat-based UI for seamless user interaction
- **OpenAI Assistant Integration**: Leverages OpenAI's Assistant API for intelligent responses
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
     - `create_new_droplinked_product`: Create new products
     - `get_droplinked_shop_collections`: Get product collections
   - Copy the Assistant ID to your `.env` file

3. **Droplinked API Configuration**
   - The application uses the Droplinked API base URL: `https://apiv3.droplinked.com`
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

### Health Check
- `GET /health` - Application health status

## 🤖 Available AI Tools

The OpenAI Assistant has access to the following tools:

1. **list_my_droplinked_products**
   - Lists products for the authenticated user
   - Supports pagination with `page` and `limit` parameters

2. **create_new_droplinked_product**
   - Creates new products through guided conversation
   - Collects required information: title, description, collection, price, quantity, weight
   - Provides confirmation before creation

3. **get_droplinked_shop_collections**
   - Retrieves available product collections
   - Used for organizing products into categories

## 💬 Usage Examples

### Creating a Product
```
User: "I want to create a new product"
Assistant: "I'll help you create a new product. What is the title (name) of the product?"
User: "Wireless Bluetooth Headphones"
Assistant: "What is the description for this product?"
User: "High-quality wireless headphones with noise cancellation"
... (continues with guided setup)
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

## 📝 Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications
- **HTTPX**: Async HTTP client for API calls
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management
- **Jinja2**: Template engine for HTML rendering
- **OpenAI**: Official OpenAI Python client

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

- **v1.0.0**: Initial release with core functionality
  - OpenAI Assistant integration
  - Droplinked API integration
  - Web-based chat interface
  - Product management tools 