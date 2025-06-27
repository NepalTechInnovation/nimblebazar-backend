const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateUniqueSlug = require('../../../utils/slugify');
const ApiError = require('../../../utils/ApiError');
// Create a new Blog Category
exports.createCategory = async (req, res) => {
    // try {
    const { title } = req.body;

    if (!title) {
        throw new ApiError(500, "Title is required");
    }

    const slug = await generateUniqueSlug(title.toLowerCase(), 'BlogCategory', prisma);

    const category = await prisma.blogCategory.create({
        data: {
            title,
            slug,
        },
    });

    return category;
    // } catch (error) {
    //     throw new ApiError(500,  "Error creating category");
    // }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { title: 'asc' },
        });

        return categories;
    } catch (error) {
        throw new ApiError("Error fetching categories");
    }
};

exports.fetchAllActiveCategories = async (req, res) => {
    try {
        const categories = await prisma.blogCategory.findMany({
            where:{
                isActive:true
            },
            
            orderBy: { title: 'asc' },
        });

        return categories;
    } catch (error) {
        throw new ApiError("Error fetching categories");
    }
};
// Get a single category by ID or slug
exports.getCategory = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return ApiError(" slug requried")
        }

        const category = await prisma.blogCategory.findFirst({
            where: {
                slug: slug
            },
            include: {
                blogs: true,
            },
        });

        if (!category) {
            return ApiError("Category not found");
        }

        return category;
    } catch (error) {
        throw new ApiError("Error fetching category");
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id, title } = req.body;

        if (!id || !title) {
            return res.status(400).json({ error: "ID and title are required" });
        }

        const slug = slugify(title.toLowerCase(), { lower: true, strict: true });

        const updatedCategory = await prisma.blogCategory.update({
            where: { id },
            data: {
                title,
                slug,
            },
        });

        return updatedCategory;
    } catch (error) {
        throw new ApiError("Error updating category");
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    // try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        const existing = await prisma.blogCategory.findUnique({ where: { id } });

        if (!existing) {
            return ApiError(500, "Category not found" );
        }

        const deleted = await prisma.blogCategory.update({
            where: { id }, data: {
                isActive: false
            }
        });

        // res.status(200).json(dseleted);
    // } catch (error) {
    //     throw new ApiError(500, "Error deleting category");
    // }
};


exports.fetchCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.blogCategory.findFirst({
            where: {
                id
            }
        });

        return category;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};