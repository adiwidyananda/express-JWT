// src/routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, productController.getUserProducts);
router.post('/', authenticateToken, productController.createProduct);
router.put('/:productId', authenticateToken, productController.updateProduct);
router.delete('/:productId', authenticateToken, productController.deleteProduct);

module.exports = router;