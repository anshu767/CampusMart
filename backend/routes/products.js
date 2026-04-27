const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} = require('../controllers/productController');

// Product routes
// GET all products with filters
router.get('/', getAllProducts);

// POST add new product
router.post('/', addProduct);

// GET search products
router.get('/search', searchProducts);

// GET products by category
router.get('/category/:category', getProductsByCategory);

// GET single product by ID
router.get('/:id', getProductById);

// PUT update product
router.put('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

module.exports = router;
