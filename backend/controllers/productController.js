const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    console.log('📦 Add product request received:', req.body);

    const { title, price, description, imageUrl, category, stock } = req.body;

    // Validation
    if (!title || !price || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, price, description, imageUrl'
      });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ title: title.trim() });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: 'Product with this title already exists'
      });
    }

    // Create new product
    const product = await Product.create({
      title: title.trim(),
      price: parseFloat(price),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      category: category || 'Other',
      stock: stock || 0,
      createdBy: req.userId || 'admin'
    });

    console.log('✅ Product created successfully:', product);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('❌ Add product error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log('📚 Fetching all products');

    const { category, minPrice, maxPrice, search, sort } = req.query;

    // Build filter
    let filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    let sortOptions = { createdAt: -1 };
    if (sort) {
      if (sort === 'price-asc') sortOptions = { price: 1 };
      if (sort === 'price-desc') sortOptions = { price: -1 };
      if (sort === 'newest') sortOptions = { createdAt: -1 };
      if (sort === 'rating') sortOptions = { rating: -1 };
    }

    const products = await Product.find(filter)
      .sort(sortOptions)
      .lean();

    console.log(`✅ Found ${products.length} products`);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: products.length,
      products
    });
  } catch (error) {
    console.error('❌ Fetch products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Fetch single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('📦 Fetching product by ID:', id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      product
    });
  } catch (error) {
    console.error('❌ Fetch product by ID error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, imageUrl, category, stock, isActive } = req.body;

    console.log('✏️ Updating product:', id);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...(title && { title: title.trim() }),
        ...(price && { price: parseFloat(price) }),
        ...(description && { description: description.trim() }),
        ...(imageUrl && { imageUrl: imageUrl.trim() }),
        ...(category && { category }),
        ...(stock !== undefined && { stock }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('✅ Product updated successfully');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('❌ Update product error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting product:', id);

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('✅ Product deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      product
    });
  } catch (error) {
    console.error('❌ Delete product error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    console.log('🔍 Searching products:', query);

    const products = await Product.find({
      isActive: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).lean();

    res.status(200).json({
      success: true,
      message: 'Search results',
      count: products.length,
      products
    });
  } catch (error) {
    console.error('❌ Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search products',
      error: error.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    console.log('📂 Fetching products by category:', category);

    const products = await Product.find({
      category,
      isActive: true
    }).lean();

    res.status(200).json({
      success: true,
      message: `Products in ${category} category`,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('❌ Fetch by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products by category',
      error: error.message
    });
  }
};
