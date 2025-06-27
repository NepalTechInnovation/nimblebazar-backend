const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');

const prisma = new PrismaClient();

const validateSubCategoryInput = async (name, categoryId) => {
  if (!name || !categoryId) {
    throw new ApiError(400, 'Both name and category are required.');
  }

  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new ApiError(404, 'Category not found.');
  }

  const existing = await prisma.subcategory.findFirst({
    where: { name, categoryId },
  });

  if (existing) {
    throw new ApiError(409, 'SubCategory already exists for this category');
  }
};

module.exports = { validateSubCategoryInput };
