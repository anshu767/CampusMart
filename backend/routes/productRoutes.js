const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// SAVE DATA TO MONGODB
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.json(saved);
});

module.exports = router;