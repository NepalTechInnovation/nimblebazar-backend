const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const prisma = new PrismaClient();
const generateUniqueSlug = require('../../utils/slugify');
const db = require('../../config/db');
const categoryService = require('./categoryService');
const Messages = require('../../constants/messages');

exports.createProduct = async (productData, userId) => {
    try {
        const slug = await generateUniqueSlug(productData.name, 'product', db);

        const category = await categoryService.findCategoryById(productData.categoryId);
        if (!category) {
            throw new ApiError(404, Messages.CATEGORY.NOT_FOUND);
        }
        const seo = await prisma.seoMeta.create({
            data: {
                model: "Product",
                metaTitle: productData.seoMeta.metaTitle,
                metaDescription: productData.seoMeta.metaDescription,
                metaKeywords: productData.seoMeta.metaKeywords,
                metaRobots: productData.seoMeta.metaRobots
            }
        });

        const product = await prisma.product.create({
            data: {
                featureImage: productData.featureImage,
                name: productData.name,
                price: productData.price,
                description: productData.description || '',
                categoryId: productData.categoryId || null,
                subcategoryId: productData.subcategoryId || null,
                slug: slug,
                seoMetaId: seo.id,
                media: {
                    create: productData.media.map((item) => ({
                        mediaUrl: item.url,
                        mediaType: item.type,
                    })),
                },
                stock: {
                    create: {
                        quantity: productData.stock.quantity,
                    },
                },
                tags: {
                    connect: productData.tags
                        .filter(tag => tag.id)
                        .map(tag => ({ id: tag.id })),

                    create: productData.tags
                        .filter(tag => tag.name && !tag.id)
                        .map(tag => ({ name: tag.name })),
                },
                attributes: {
                    createMany: { data: productData.attributes },
                },
                userId: userId

            },
            include: {
                media: true,
                stock: true,
                tags: true,

                category: {
                    include: {
                        subcategories: true
                    }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
                user: {
                    select: { id: true, name: true, email: true }
                },
                seoMeta: true
            },
        });

        return product;
    } catch (error) {

        throw error;
    }
};


exports.getAllProducts = async ({ page = 1, limit = 10, sort = 'desc', search = '', categoryId }) => {
    // try {
    const skip = (page - 1) * limit;
    const filters = {
        ...(search && {
            name: { contains: search, mode: 'insensitive' },
        }),
        ...(categoryId && { categoryId }),
    };

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where: {
                ...filters,
            },

            include: {
                media: true,
                stock: true,
                tags: true,
                reviews: true,
                seoMeta: true,
                category: {
                    include: {
                        subcategories: true
                    }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
                user: {
                    select: { id: true, name: true, email: true }
                }
            },

            orderBy: { createdAt: sort },
            skip,
            take: limit,
        }),
        prisma.product.count({ where: filters }),
    ]);

    return {
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        product: products,
    };
    // } catch (err) {

    //     throw new ApiError(500, Messages.PRODUCT.FETCH_PRODUCT_FAILED);
    // }
};

exports.getProductById = async (id, includeRelated = true) => {
    try {

        const include = includeRelated
            ? {
                attributes: {
                    include: { attributeDefinition: true },
                },
                media: true,
                stock: true,
                category: true,
                subcategory: true,
                tags: true,
                review: true,
                seoMeta: true,
                user: { select: { id: true, name: true, email: true } },
            }
            : {};


        const product = await prisma.product.findUnique({
            where: { id, isActive: true, },
            include,
        });


        if (!product) {
            throw new ApiError(404, Messages.PRODUCT.NOT_FOUND);
        }

        return product;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};

exports.getProductBySlug = async (slug, includeRelated = true) => {
    try {
        const include = includeRelated
            ? {
                media: true,
                stock: true,
                attributes: {
                    include: { attributeDefinition: true },
                },
                category: true,
                subcategory: true,
                tags: true,
                seoMeta: true,
                user: { select: { id: true, name: true, email: true } },
            }
            : {};


        const product = await prisma.product.findUnique({
            where: { slug: slug },
            include,
        });


        if (!product) {
            throw new ApiError(404, Messages.PRODUCT.NOT_FOUND);
        }

        return product;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}

exports.updateProduct = async (productId, productData, userId) => {
    // try {

    const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
        include: { media: true },
    });

    if (!existingProduct) {
        throw new ApiError(404, Messages.PRODUCT.NOT_FOUND);
    }

    if (productData.categoryId) {
        const category = await categoryService.findCategoryById(productData.categoryId);
        if (!category) {
            throw new ApiError(404, Messages.CATEGORY.NOT_FOUND);
        }
    }

    const updatedProduct = await prisma.$transaction(async (tx) => {
        await tx.product.update({
            where: { id: productId },
            data: {
                name: productData.name,
                price: productData.price,
                description: productData.description || '',
                isFeatured: productData.isFeatured,
                isActive: productData.isActive,
                slug: await generateUniqueSlug(productData.name, 'product', prisma),
                seoMeta: {
                    upsert: {
                        update: {
                            metaTitle: productData.seoMeta?.metaTitle,
                            metaDescription: productData.seoMeta?.metaDescription,
                            metaKeywords: productData.seoMeta?.metaKeywords,
                            metaRobots: productData.seoMeta?.metaRobots,
                        },
                        create: {
                            model: "Product",
                            metaTitle: productData.seoMeta?.metaTitle,
                            metaDescription: productData.seoMeta?.metaDescription,
                            metaKeywords: productData.seoMeta?.metaKeywords,
                            metaRobots: productData.seoMeta?.metaRobots,
                        },
                    },
                },
                media: {
                    deleteMany: {},
                    create: productData.media.map((item) => ({
                        mediaUrl: item.url,
                        mediaType: item.type,
                    })),
                },
                category: {
                    connect: { id: productData.categoryId }
                },

            },
            include: {
                media: true,
                tags: true,
                stock: true,
                category: true,
                seoMeta: true,
                attributes: {
                    include: { attributeDefinition: true },
                },
            },
        });
        for (const attr of productData.attributes) {
            await tx.productAttributeValue.upsert({
                where: {
                    productId_attributeDefinitionId: {
                        productId,
                        attributeDefinitionId: attr.attributeDefinitionId,
                    },
                },
                update: {
                    valueString: attr.valueString ?? null,
                    valueInt: attr.valueInt ?? null,
                    valueBool: attr.valueBool ?? null,
                    valueDate: attr.valueDate ? new Date(attr.valueDate) : null,
                    valueDecimal: attr.valueDecimal ?? null,
                },
                create: {
                    productId,
                    attributeDefinitionId: attr.attributeDefinitionId,
                    valueString: attr.valueString ?? null,
                    valueInt: attr.valueInt ?? null,
                    valueBool: attr.valueBool ?? null,
                    valueDate: attr.valueDate ? new Date(attr.valueDate) : null,
                    valueDecimal: attr.valueDecimal ?? null,
                },
            });
        }


    });
    return updatedProduct;
    // } catch (error) {

    //     throw new ApiError(400, Messages.PRODUCT.FAILED_PRODUCT_UPDATE);
    // }
};


exports.deleteProduct = async (id) => {
    try {
        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) {
            throw new ApiError(404, Messages.PRODUCT.NOT_FOUND);
        }

        return prisma.product.update({
            where: { id },
            data: { isActive: false }
        });

    } catch (error) {
        console.error("Error deleting product:", error);
        throw new ApiError(400, 'Failed to delete product');
    }
};

exports.searchProducts = async ({ query = '', sortBy = 'alphabetical', orderDirection = 'asc', categoryId = "" }) => {
    const cleanedQuery = query.trim();

    const validDirections = ['asc', 'desc'];
    const direction = validDirections.includes(orderDirection.toLowerCase()) ? orderDirection.toLowerCase() : 'asc';

    let orderByClause;
    switch (sortBy) {
        case 'alphabetical':
            orderByClause = { name: direction };
            break;
        case 'price_low_to_high':
            orderByClause = { price: 'asc' };
            break;
        case 'price_high_to_low':
            orderByClause = { price: 'desc' };
            break;
        case 'newest':
            orderByClause = { createdAt: 'desc' };
            break;
        case 'oldest':
            orderByClause = { createdAt: 'asc' };
            break;
        default:
            orderByClause = { name: 'asc' };
    }

    const products = await prisma.product.findMany({
        where: {
            ...(categoryId && { categoryId }),
            isActive: true,
            name: {
                contains: cleanedQuery,
                mode: 'insensitive',
            },

        },
        include: {
            media: true,
            stock: true,
            tags: true,
            seoMeta: true,
            category: true,
            user: {
                select: { id: true, name: true, email: true }
            },
            attributes: {
                include: { attributeDefinition: true },
            },
        },
        orderBy: orderByClause,

    });
    if (sortBy === 'alphabetical') {
        products.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            return direction === 'asc'
                ? aName.localeCompare(bName)
                : bName.localeCompare(aName);
        });
    }
    return products;
};

exports.fetchProductsByTag = async (req, res) => {
    const { tag } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                tags: {
                    some: {
                        name: tag,
                    },
                },
            },
            include: {
                media: true,
                stock: true,
                tags: true,
                seoMeta: true,
                category: true,
                user: {
                    select: { id: true, name: true, email: true }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
            },
        });

        return products;
    } catch (error) {
        throw new ApiError(500, "Error fetching products");
    }
};


exports.fetchProductsByCategorySlug = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                categoryId: categoryId,
            },
            include: {
                media: true,
                stock: true,
                tags: true,
                category: true,
                user: {
                    select: { id: true, name: true, email: true }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
            },
        });

        return products;
    } catch (error) {

        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};


exports.fetchProductsBySubcategorySlug = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                subcategoryId: categoryId,

            },
            include: {
                media: true,
                stock: true,
                tags: true,
                seoMeta: true,
                category: true,
                user: {
                    select: { id: true, name: true, email: true }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
            },
        });

        return products;
    } catch (error) {

        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};


exports.getAllActiveProducts = async ({ page = 1, limit = 10, sort = 'desc', search = '', categoryId }) => {
    try {
        const skip = (page - 1) * limit;
        const filters = {
            ...(search && {
                name: { contains: search, mode: 'insensitive' },
            }),
            ...(categoryId && { categoryId }),
        };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where: {
                    ...filters,
                    isActive: true,
                },

                include: {
                    media: true,
                    stock: true,
                    tags: true,
                    reviews: true,
                    seoMeta: true,
                    category: {
                        include: {
                            subcategories: true
                        }
                    },
                    attributes: {
                        include: { attributeDefinition: true },
                    },
                    user: {
                        select: { id: true, name: true, email: true }
                    }
                },

                orderBy: { createdAt: sort },
                skip,
                take: limit,
            }),
            prisma.product.count({ where: filters }),
        ]);

        return {
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            products: products,
        };
    } catch (err) {

        throw new ApiError(500, Messages.PRODUCT.FETCH_PRODUCT_FAILED);
    }
};


exports.getAllDeleteProducts = async ({ page = 1, limit = 10, sort = 'desc', search = '', categoryId }) => {
    // try {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where: {
                isActive: false,
            },

            include: {
                media: true,
                stock: true,
                tags: true,
                reviews: true,
                seoMeta: true,
                category: {
                    include: {
                        subcategories: true
                    }
                },
                attributes: {
                    include: { attributeDefinition: true },
                },
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: sort },
            skip,
            take: limit,
        }),
        prisma.product.count({
            where: {
                isActive: false
            }
        }),
    ]);

    return {
        success: true,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        products: products,
    };
    // } catch (err) {

    //     throw new ApiError(500, Messages.PRODUCT.FETCH_PRODUCT_FAILED);
    // }
};