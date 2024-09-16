const productService = require('../services/productService');

// Get all products for the logged-in user
const getUserProducts = async (req, res) => {
  try {
    const products = await productService.getProductsByUserId(req.user.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.user.id, req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.user.id, req.params.productId, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.user.id, req.params.productId);
    res.json({ message: 'Product successfully deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
};

module.exports = { getUserProducts, createProduct, updateProduct, deleteProduct };