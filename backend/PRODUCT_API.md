# Product API Documentation

## Base URL
```
http://localhost:5000/api/products
```

## Endpoints

### 1. Get All Products
**GET** `/api/products`

**Query Parameters:**
- `category` - Filter by category (Electronics, Appliances, Sports, Books, Home, Fashion, Beauty, Other)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search by title or description
- `sort` - Sort order (price-asc, price-desc, newest, rating)

**Example:**
```bash
GET /api/products?category=Electronics&sort=price-asc
GET /api/products?search=headphones&minPrice=50&maxPrice=150
```

**Response:**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "count": 8,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Wireless Headphones",
      "price": 79.99,
      "description": "High-quality wireless headphones...",
      "imageUrl": "https://via.placeholder.com/300?text=Wireless+Headphones",
      "category": "Electronics",
      "stock": 50,
      "rating": 4.5,
      "reviews": [],
      "isActive": true,
      "createdBy": "admin",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Add New Product
**POST** `/api/products`

**Required Fields:**
- `title` (string) - Product title (max 100 chars)
- `price` (number) - Product price (must be >= 0)
- `description` (string) - Product description (max 500 chars)
- `imageUrl` (string) - Image URL

**Optional Fields:**
- `category` - Category (default: "Other")
- `stock` - Stock quantity (default: 0)

**Request Body Example:**
```json
{
  "title": "Wireless Headphones",
  "price": 79.99,
  "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life",
  "imageUrl": "https://via.placeholder.com/300?text=Wireless+Headphones",
  "category": "Electronics",
  "stock": 50
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Wireless Headphones",
    "price": "79.99",
    "description": "High-quality wireless headphones...",
    "imageUrl": "https://via.placeholder.com/300?text=Wireless+Headphones",
    "category": "Electronics",
    "stock": 50,
    "rating": 0,
    "reviews": [],
    "isActive": true,
    "createdBy": "admin",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Missing required fields: title, price, description, imageUrl"
}
```

---

### 3. Get Product by ID
**GET** `/api/products/:id`

**Parameters:**
- `id` - Product ID (MongoDB ObjectId)

**Example:**
```bash
GET /api/products/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Wireless Headphones",
    "price": "79.99",
    ...
  }
}
```

---

### 4. Update Product
**PUT** `/api/products/:id`

**Parameters:**
- `id` - Product ID

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "price": 89.99,
  "description": "Updated description",
  "imageUrl": "new-image-url",
  "category": "Electronics",
  "stock": 75,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "price": "89.99",
    ...
  }
}
```

---

### 5. Delete Product
**DELETE** `/api/products/:id`

**Parameters:**
- `id` - Product ID

**Example:**
```bash
DELETE /api/products/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "isActive": false,
    ...
  }
}
```

---

### 6. Search Products
**GET** `/api/products/search?query=headphones`

**Query Parameters:**
- `query` - Search term (searches title, description, and category)

**Example:**
```bash
GET /api/products/search?query=wireless
GET /api/products/search?query=electronics
```

**Response:**
```json
{
  "success": true,
  "message": "Search results",
  "count": 2,
  "products": [...]
}
```

---

### 7. Get Products by Category
**GET** `/api/products/category/:category`

**Parameters:**
- `category` - Category name

**Example:**
```bash
GET /api/products/category/Electronics
GET /api/products/category/Sports
```

**Response:**
```json
{
  "success": true,
  "message": "Products in Electronics category",
  "count": 5,
  "products": [...]
}
```

---

## Product Categories
- Electronics
- Appliances
- Sports
- Books
- Home
- Fashion
- Beauty
- Other

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `.env` file in backend folder:
```
MONGO_URI=mongodb://localhost:27017/fullstack
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Seed Database with Sample Products
```bash
node seed.js
```

### 4. Start the Server
```bash
npm start
# or for development with hot reload:
npm run dev
```

---

## Testing with cURL

### Add Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "price": 99.99,
    "description": "A test product",
    "imageUrl": "https://via.placeholder.com/300",
    "category": "Electronics",
    "stock": 10
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Search Products
```bash
curl "http://localhost:5000/api/products/search?query=headphones"
```

### Get by Category
```bash
curl http://localhost:5000/api/products/category/Electronics
```

### Get Single Product
```bash
curl http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

### Update Product
```bash
curl -X PUT http://localhost:5000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99, "stock": 50}'
```

### Delete Product
```bash
curl -X DELETE http://localhost:5000/api/products/507f1f77bcf86cd799439011
```

---

## Error Handling

### Missing Required Fields (400)
```json
{
  "success": false,
  "message": "Missing required fields: title, price, description, imageUrl"
}
```

### Product Not Found (404)
```json
{
  "success": false,
  "message": "Product not found"
}
```

### Invalid Product ID (400)
```json
{
  "success": false,
  "message": "Invalid product ID"
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Title cannot be more than 100 characters, Price cannot be negative"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to add product",
  "error": "Error details..."
}
```

---

## MongoDB Product Schema

```javascript
{
  title: String (required, max 100),
  price: Number (required, min 0),
  description: String (required, max 500),
  imageUrl: String (required),
  category: String (enum: ['Electronics', 'Appliances', 'Sports', 'Books', 'Home', 'Fashion', 'Beauty', 'Other']),
  stock: Number (default: 0, min: 0),
  rating: Number (default: 0, min: 0, max: 5),
  reviews: Array of Objects,
  isActive: Boolean (default: true),
  createdBy: String (default: 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Notes

- All prices are stored with 2 decimal places
- Products have soft delete (isActive flag) instead of hard delete
- Search is case-insensitive
- Sorting options: price-asc, price-desc, newest, rating
- CORS is configured for http://localhost:3000
