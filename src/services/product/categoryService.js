const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const generateUniqueSlug = require('../../utils/slugify');
const Messages = require('../../constants/messages');
exports.createCategory = async (req, res) => {
  const { name, slug, image = null } = req.body;
  try {
    const existing = await prisma.category.findFirst({
      where: { name },
    });

    if (existing) {
      throw new ApiError(500, Messages.CATEGORY.EXIST);
    }
    const slug = await generateUniqueSlug(name, 'category', prisma);
    const category = await prisma.category.create({
      data: {
        name: name,
        slug: slug,
        image: image,
      },
      include: {
        subcategories: true
      }
    });

    return category;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
exports.updateCategory = async (req, res) => {
  const { id, name, slug, image = null, isActive, subcategories = [] } = req.body;

  // try {

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      name, slug, image, isActive,
    },
    include: {
      subcategories: true
    }

  });


  const subcategoryIds = subcategories.map((sub) => sub.id);


  await prisma.subcategory.updateMany({
    where: {
      categoryId: id,
      id: { notIn: subcategoryIds },
    },
    data: { categoryId: null },
  });


  await prisma.subcategory.updateMany({
    where: {
      id: { in: subcategoryIds },
    },
    data: { categoryId: id },
  });


  const finalCategory = await prisma.category.findUnique({
    where: { id },
    include: { subcategories: true },
  });

  return (finalCategory);
  // } catch (error) {
  //   console.error(error);
  //   throw new ApiError(500, "Something went wrong while updating the category.");
  // }
};




exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        isActive: false,
      }

    });

    return category;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({

      include: {
        subcategories: true
      }
    });

    return categories;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.fetchAllActiveCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      include: {
        subcategories: true
      }
    });

    return categories;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await prisma.subcategory.findMany({
      include: {
        category: true,
      }
    });

    return categories;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

exports.getAllCategoriesAdminPanel = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });

    return categories;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
exports.findCategoryById = async (categoryId) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new ApiError("400", 'Category not found');
    }

    return category;
  } catch (error) {

    let errorMsg = 'Something went wrong';
    if (error.code && error.meta) {
      errorMsg = `${error.code}: ${error.meta?.cause || error.message}`;
    } else if (error.message) {
      errorMsg = error.message;
    }

    return new ApiError("400", errorMsg);
  }
};

exports.fetchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findFirst({
      where: {
        id
      },
      include: {
        subcategories: true
      }
    });

    return category;
  } catch (error) {
    throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
  }
};


exports.fetchAllDeleteCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: false
      },
      include: {
        subcategories: true
      }
    });

    return categories;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};