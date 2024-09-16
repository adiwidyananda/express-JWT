// src/server.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Register routes
app.use("/users", userRoutes);
app.use('/auth', authRoutes);
app.use('/products', authenticateToken, productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
