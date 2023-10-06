// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../modal/ProductModal');
const Athenticate = require("../middleware/Athenticate")


// 1) Add a Product (POST /api/products):
router.post('/',Athenticate, async (req, res) => {
  try {
    const {formData} = req.body
    const product = new Product(formData);
    await product.save();
    res.status(201).json({message:"Product Created Successfully",Product:Product});
  } catch (error) {
    res.status(400).send(error);
  }
});



// 2) Get All Products (GET /api/products): 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});



//3) Update a Product (PUT /api/products/:productId): 
router.put('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});



// 4) Delete a Product (DELETE /api/products/:productId): 
router.delete('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});



// 5) Fetch Featured Products (GET /api/products/featured): 
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.send(featuredProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});



// 6) Fetch Products with Price Less Than a Certain Value (GET /api/products/price/:maxPrice): 
router.get('/price/:maxPrice', async (req, res) => {
  try {
    const maxPrice = parseFloat(req.params.maxPrice);
    if (isNaN(maxPrice)) {
      return res.status(400).send({ message: 'Invalid maxPrice parameter' });
    }
    const products = await Product.find({ price: { $lt: maxPrice } });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});



// 7) Fetch Products with Rating Higher Than a Certain Value (GET /api/products/rating/:minRating): 
router.get('/rating/:minRating', async (req, res) => {
  try {
    const minRating = parseFloat(req.params.minRating);
    if (isNaN(minRating) || minRating < 0 || minRating > 5) {
      return res.status(400).send({ message: 'Invalid minRating parameter' });
    }
    const products = await Product.find({ rating: { $gte: minRating } });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
