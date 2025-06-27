const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const generateUniqueSlug = require('../../utils/slugify');
const Messages = require('../../constants/messages');
const { validateSubCategoryInput } = require('../../validators/product/subcategoryValidator');
exports.createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    await validateSubCategoryInput(name, categoryId);
    const slug = await generateUniqueSlug(name, 'subcategory', prisma);
    const existing = await prisma.subcategory.findFirst({
      where: { name },
    });

    if (existing) {
      throw new ApiError(500, Messages.CATEGORY.EXIST);
    }
    const subCategory = await prisma.subcategory.create({
      data: {
        name,
        slug,
        categoryId,
      },
      include: {
        category: true
      },
    },
    );

    return subCategory;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subcategory.findMany({
      include: {
        category: true
      },
    });

    return subCategories;
  } catch (error) {
    throw new ApiError(500, error);
  }
};
exports.getSubCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const subCategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        category: true
      },
    });

    if (!subCategory) {
      throw new ApiError(500, 'SubCategory not found');
    }

    return subCategory;
  } catch (error) {
    throw new ApiError(500, error);
  }
};
exports.updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;

  try {
    const slug = await generateUniqueSlug(name, 'subcategory', prisma);

    const updated = await prisma.subcategory.update({
      where: { id },
      data: {
        name,
        slug,
        categoryId,
      }, include: {
        category: true
      },
    });

    return updated;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.subcategory.delete({
      where: { id },
    });

    return 'SubCategory deleted successfully';
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
