/**
 * Product API Integration Examples
 * Usage examples for frontend integration with the product API
 */

import axios from 'axios';

export const addProduct = async (product) => {
  const res = await fetch("http://localhost:5001/api/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  return res.json();
};

const API_BASE_URL = 'http://localhost:5001/api/products';

// Configure axios instance
const productAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Increased timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
productAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection and try again.');
    }
    if (!error.response) {
      throw new Error('Network error. Please check your internet connection and ensure the server is running.');
    }
    // Re-throw the error with the response data
    throw error;
  }
);

// ============================================
// 1. GET ALL PRODUCTS
// ============================================
export const getAllProducts = async (filters = {}) => {
  try {
    const { category, minPrice, maxPrice, search, sort } = filters;
    
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const response = await productAPI.get(`/?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// ============================================
// 2. ADD NEW PRODUCT
// ============================================
export const addProduct = async (productData) => {
  try {
    const response = await productAPI.post('/', {
      title: productData.title,
      price: parseFloat(productData.price),
      description: productData.description,
      imageUrl: productData.imageUrl,
      category: productData.category || 'Other',
      stock: productData.stock || 0
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// ============================================
// 3. GET PRODUCT BY ID
// ============================================
export const getProductById = async (productId) => {
  try {
    const response = await productAPI.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

// ============================================
// 4. UPDATE PRODUCT
// ============================================
export const updateProduct = async (productId, updateData) => {
  try {
    const response = await productAPI.put(`/${productId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error;
  }
};

// ============================================
// 5. DELETE PRODUCT
// ============================================
export const deleteProduct = async (productId) => {
  try {
    const response = await productAPI.delete(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
};

// ============================================
// 6. SEARCH PRODUCTS
// ============================================
export const searchProducts = async (query) => {
  try {
    const response = await productAPI.get(`/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// ============================================
// 7. GET PRODUCTS BY CATEGORY
// ============================================
export const getProductsByCategory = async (category) => {
  try {
    const response = await productAPI.get(`/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example 1: Fetch all products on component mount
 * 
 * useEffect(() => {
 *   const fetchProducts = async () => {
 *     try {
 *       const data = await getAllProducts();
 *       setProducts(data.products);
 *     } catch (error) {
 *       setError('Failed to fetch products');
 *     }
 *   };
 *   fetchProducts();
 * }, []);
 */

/**
 * Example 2: Fetch products with filters
 * 
 * const handleFilter = async (category, minPrice, maxPrice) => {
 *   try {
 *     const data = await getAllProducts({
 *       category,
 *       minPrice,
 *       maxPrice,
 *       sort: 'price-asc'
 *     });
 *     setProducts(data.products);
 *   } catch (error) {
 *     console.error('Filter failed');
 *   }
 * };
 */

/**
 * Example 3: Add new product
 * 
 * const handleAddProduct = async (formData) => {
 *   try {
 *     const result = await addProduct({
 *       title: formData.title,
 *       price: formData.price,
 *       description: formData.description,
 *       imageUrl: formData.imageUrl,
 *       category: formData.category,
 *       stock: formData.stock
 *     });
 *     if (result.success) {
 *       setProducts([...products, result.product]);
 *       alert('Product added successfully!');
 *     }
 *   } catch (error) {
 *     alert('Failed to add product');
 *   }
 * };
 */

/**
 * Example 4: Search products
 * 
 * const handleSearch = async (searchQuery) => {
 *   try {
 *     const data = await searchProducts(searchQuery);
 *     setProducts(data.products);
 *   } catch (error) {
 *     console.error('Search failed');
 *   }
 * };
 */

/**
 * Example 5: Get products by category
 * 
 * const handleCategoryClick = async (category) => {
 *   try {
 *     const data = await getProductsByCategory(category);
 *     setProducts(data.products);
 *   } catch (error) {
 *     console.error('Category fetch failed');
 *   }
 * };
 */

export default {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
};
