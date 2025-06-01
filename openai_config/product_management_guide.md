# Product Management Features Guide

## Overview

The Droplinked MCP now supports comprehensive product management operations including:
- **Get Product Details** - View complete product information
- **Update Products** - Modify product fields like title, description, price, etc.
- **Delete Products** - Remove products from your store

## Available Functions

### 1. Individual Functions

#### `get_product_by_id`
- **Purpose**: Get detailed information about a specific product
- **Parameters**: 
  - `product_id` (required): The ID of the product to retrieve
- **Returns**: Complete product data including title, description, pricing, media, etc.

#### `update_product` 
- **Purpose**: Update specific fields of a product
- **Parameters**:
  - `product_id` (required): The ID of the product to update
  - `update_data` (required): Object containing fields to update
- **Updatable Fields**: title, description, price, productCollectionID, media, tags, canBeAffiliated, commission

#### `delete_product`
- **Purpose**: Delete a product from the store
- **Parameters**:
  - `product_id` (required): The ID of the product to delete
- **Returns**: Confirmation of deletion

### 2. Unified Function (Recommended)

#### `manage_product_operations`
- **Purpose**: Unified interface for all product operations
- **Parameters**:
  - `action` (required): "get_product", "update_product", or "delete_product"
  - `product_id` (required): The product ID
  - For updates: `title`, `description`, `price`, `productCollectionID`, `media`, `tags`, `canBeAffiliated`, `commission`

## Usage Examples

### Getting Product Information
```
User: "Show me details for product ID 64f1a2b3c4d5e6f7g8h9i0j1"
Assistant calls: manage_product_operations(action="get_product", product_id="64f1a2b3c4d5e6f7g8h9i0j1")
```

### Updating a Product
```
User: "Update product 64f1a2b3c4d5e6f7g8h9i0j1 to change the title to 'New Product Name' and price to 29.99"
Assistant calls: manage_product_operations(
  action="update_product", 
  product_id="64f1a2b3c4d5e6f7g8h9i0j1",
  title="New Product Name",
  price=29.99
)
```

### Deleting a Product
```
User: "Delete product 64f1a2b3c4d5e6f7g8h9i0j1"
Assistant calls: manage_product_operations(action="delete_product", product_id="64f1a2b3c4d5e6f7g8h9i0j1")
```

## Product Data Structure

Based on the Droplinked API, products contain:

### Core Fields
- `title`: Product name
- `description`: Product description  
- `product_type`: NORMAL, PRINT_ON_DEMAND, DIGITAL, EVENT
- `lowestPrice`/`highestPrice`: Price range from SKUs
- `productCollectionID`: Collection the product belongs to

### Media & Assets
- `media`: Array of product images/videos
- `thumb`: Thumbnail image
- `skuIDs`: Array of SKU (variant) IDs

### Business Settings
- `canBeAffiliated`: Whether product can be affiliated
- `commission`: Affiliate commission percentage
- `shippingType`: Shipping method
- `publish_status`: Publication status

### Advanced Fields
- `tags`: Product tags for categorization
- `artwork`: Print-on-demand artwork
- `m2m_positions`: Mint-to-merch positions
- `nftData`: NFT-related data if applicable

## Error Handling

All functions include comprehensive error handling:
- Authentication validation
- Parameter validation  
- API error responses
- Network error handling
- Detailed error messages for troubleshooting

## Best Practices

1. **Always get product details first** before updating to see current values
2. **Use specific field updates** rather than updating everything
3. **Confirm deletions** with users before executing
4. **Handle errors gracefully** and provide clear feedback
5. **Use the unified function** for better consistency

## Integration with Existing Features

These new functions work alongside existing features:
- **Product Creation**: Use `manage_droplinked_product` for creating new products
- **Product Listing**: Use `list_my_droplinked_products` to see all products
- **Collections**: Use `get_droplinked_shop_collections` to get available collections
- **Image Management**: Existing image upload and AI mockup features remain available

## Security Notes

- All operations require valid JWT authentication
- Product IDs are validated before API calls
- Users can only manage their own products
- Deletion operations are irreversible - confirm with users first 