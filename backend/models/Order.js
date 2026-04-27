const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId:        { type: String },
  productId:     { type: String },
  title:         { type: String },
  price:         { type: Number },
  qty:           { type: Number, default: 1 },
  seller:        { type: String },
  sellerContact: { type: String },
  image:         { type: String },
  category:      { type: String },
  orderedAt:     { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);