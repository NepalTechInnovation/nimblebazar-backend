const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');

const prisma = new PrismaClient();

const validateCategoryInput = async (name) => {
  if (!name) {
    throw new ApiError(400, 'name are required.');
  }

  const existing = await prisma.category.findFirst({
    where: { name },
  });

  if (existing) {
    throw new ApiError(409, 'name already exists');
  }
};

module.exports = { validateCategoryInput };
