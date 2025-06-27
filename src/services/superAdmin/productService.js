const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const prisma = new PrismaClient();
const Messages = require('../../constants/messages');
exports.searchProduct = async (searchQuery = '') => {
    try {
        return await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                category: true,
                media: true,
                stock: true, seoMeta: true
            },
        });
    }
    catch (e) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};

exports.fetchAllProducts = async (req) => {
    const {
        page = 1,
        limit = 10
    } = req.query;
    const count = await prisma.product.count();
    const totalPages = Math.ceil(count / limit);
    const products = await prisma.product.findMany({
        take: limit,
        skip: (page - 1) * limit,

        include: {
            stock: true,
            category: true,
            seoMeta: true,
            media: true
        }
    });
    return {
        products,
        pagination: {
            currentPage: page,
            totalPages,
            limit,
        },

    }
}

