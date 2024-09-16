const prisma = require('../prisma/prismaClient');

// Get all products for a specific user
const getProductsByUserId = async (userId) => {
  return await prisma.product.findMany({
    where: { userId },
  });
};

// Create a new product for a user
const createProduct = async (userId, productData) => {
  return await prisma.product.create({
    data: {
      ...productData,
      userId,
    },
  });
};

// Update a product by product ID and user ID
const updateProduct = async (userId, productId, updateData) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId, 10) },
  });

  if (!product || product.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return await prisma.product.update({
    where: { id: parseInt(productId, 10) },
    data: updateData,
  });
};

// Delete a product by product ID and user ID
const deleteProduct = async (userId, productId) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId, 10) },
  });

  if (!product || product.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return await prisma.product.delete({
    where: { id: parseInt(productId, 10) },
  });
};

module.exports = { getProductsByUserId, createProduct, updateProduct, deleteProduct };