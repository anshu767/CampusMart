require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    title: 'Wireless Headphones',
    price: 79.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    imageUrl: 'https://via.placeholder.com/300?text=Wireless+Headphones',
    category: 'Electronics',
    stock: 50,
    rating: 4.5
  },
  {
    title: 'Smart Watch',
    price: 299.99,
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    imageUrl: 'https://via.placeholder.com/300?text=Smart+Watch',
    category: 'Electronics',
    stock: 30,
    rating: 4.3
  },
  {
    title: 'USB-C Cable',
    price: 15.99,
    description: 'Durable 2-meter USB-C charging cable with fast charging support',
    imageUrl: 'https://via.placeholder.com/300?text=USB-C+Cable',
    category: 'Electronics',
    stock: 200,
    rating: 4.7
  },
  {
    title: 'Portable Speaker',
    price: 49.99,
    description: 'Waterproof Bluetooth speaker with 360-degree sound',
    imageUrl: 'https://via.placeholder.com/300?text=Portable+Speaker',
    category: 'Electronics',
    stock: 75,
    rating: 4.4
  },
  {
    title: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip exercise yoga mat with carrying strap',
    imageUrl: 'https://via.placeholder.com/300?text=Yoga+Mat',
    category: 'Sports',
    stock: 100,
    rating: 4.6
  },
  {
    title: 'Running Shoes',
    price: 89.99,
    description: 'Comfortable and lightweight running shoes for all terrains',
    imageUrl: 'https://via.placeholder.com/300?text=Running+Shoes',
    category: 'Sports',
    stock: 60,
    rating: 4.5
  },
  {
    title: 'Coffee Maker',
    price: 59.99,
    description: 'Programmable coffee maker with 12-cup capacity',
    imageUrl: 'https://via.placeholder.com/300?text=Coffee+Maker',
    category: 'Appliances',
    stock: 40,
    rating: 4.2
  },
  {
    title: 'Desk Lamp',
    price: 39.99,
    description: 'LED desk lamp with adjustable brightness and color temperature',
    imageUrl: 'https://via.placeholder.com/300?text=Desk+Lamp',
    category: 'Home',
    stock: 85,
    rating: 4.4
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${insertedProducts.length} sample products`);

    // Display inserted products
    console.log('\n📦 Sample Products Added:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
