
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateUniqueSlug = require('../../utils/slugify');
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
// Create Blog
exports.createBlog = async (req, res) => {
    // try {
    const { title, image, description, categoryId, seoMeta } = req.body;
    const slug = await generateUniqueSlug(title, 'blog', prisma);
    const seo = await prisma.seoMeta.create({
        data: {
            model: "Blog",
            metaTitle: seoMeta.metaTitle,
            metaDescription: seoMeta.metaDescription,
            metaKeywords: seoMeta.metaKeywords,
            metaRobots: seoMeta.metaRobots
        }
    });
    const blog = await prisma.blog.create({
        data: {
            title,
            slug,
            image,
            description,
            categoryId,
            seoMetaId: seo.id
        },
        include: {
            seoMeta: true
        }
    });

    return blog;
    // } catch (error) {

    //     throw new ApiError(404, "Error creating blog");
    // }
};

// Get Blogs (Paginated with Category & Trimmed Description)
exports.getBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const blogs = await prisma.blog.findMany({
            include: { category: true,seoMeta:true },
            orderBy: { createdAt: 'desc' },
            skip: Number(offset),
            take: Number(limit),

        });

        const totalBlogs = await prisma.blog.count();
        const totalPages = Math.ceil(totalBlogs / limit);

        const processedBlogs = blogs.map((blog) => {
            const stripped = blog.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
            return {
                ...blog,
                description: stripped.length > 100 ? stripped.slice(0, 100) + "..." : stripped,
            };

        });

        return {
            blogs,
            meta: {
                currentPage: Number(page),
                totalPages,
                totalBlogs,
                limit: Number(limit),
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    } catch (error) {

        throw new ApiError(500, "Error getting blogs");
    }
};

// Get All Blogs (Full Description)
exports.getAllBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const blogs = await prisma.blog.findMany({
            include: {
                category: true,
                seoMeta: true
            },
            orderBy: { createdAt: 'desc' },
            skip: Number(offset),
            take: Number(limit),
        });

        const totalBlogs = await prisma.blog.count();
        const totalPages = Math.ceil(totalBlogs / limit);

        return {
            blogs,
            meta: {
                currentPage: Number(page),
                totalPages,
                totalBlogs,
                limit: Number(limit),
            },
        };
    } catch (error) {
        throw new ApiError(500, "Error getting all blogs");
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    // try {
        const { id, title, image, description, categoryId, seoMeta } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
        }

        const slug = await generateUniqueSlug(title, 'blog', prisma);

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(slug && { slug }),
                ...(image && { image }),
                ...(description && { description }),
                // ...(categoryId && { categoryId }),
                  category: {
                connect: { id: categoryId }
            },
                seoMeta: {
                    upsert: {
                        update: {
                            metaTitle: seoMeta?.metaTitle,
                            metaDescription: seoMeta?.metaDescription,
                            metaKeywords: seoMeta?.metaKeywords,
                            metaRobots: seoMeta?.metaRobots,
                        },
                        create: {
                            model: "Blog",
                            metaTitle: seoMeta?.metaTitle,
                            metaDescription: seoMeta?.metaDescription,
                            metaKeywords: seoMeta?.metaKeywords,
                            metaRobots: seoMeta?.metaRobots,
                        },
                    },
                },
            },
            include:{
                seoMeta:true
            }
        });

        return updatedBlog;
    // } catch (error) {
    //     throw new ApiError(500, "Error updating blog");
    // }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(500, "ID is required");
        }

        const deletedBlog = await prisma.blog.delete({
            where: { id },
        });


    } catch (error) {
        console.error("Error deleting blog:", error);
        throw new ApiError(500, "Error deleting blog");
    }
};

// Get Single Blog by ID or Slug
exports.getBlog = async (req, res) => {
    // try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
        where: {
            slug: slug
        },

        include: {
            category: true,
            seoMeta: true
        },
    });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return blog;
    // } catch (error) {
    //     throw new ApiError(500, "Error fetching blog");
    // }
};
