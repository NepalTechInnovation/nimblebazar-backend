const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const Roles = require('../../constants/roleEnum');
const prisma = new PrismaClient();
exports.addNewsletter = async (req, res) => {
    const {
        email,
        name,
    } = req.body;
    const existing = await prisma.newsletter.findUnique({
        where: { email },
    });

    if (existing) {
        throw new ApiError(500, 'Email is already subscribed.');
    }
    const subscribe = await prisma.newsletter.create({
        data: { name, email },
    });

    return subscribe;
};


exports.fetchAllNewsletter = async (req, res) => {
    const {
        page = 1,
        limit = 10
    } = req.query;
    const count = await prisma.newsletter.count();
    const totalPages = Math.ceil(count / limit);
    try {
        const newsletters = await prisma.newsletter.findMany({
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            newsletters,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
            },
        };

    } catch (e) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }

};



exports.searchNewsletter = async (searchQuery = '', req) => {
    const { role, } = req.user;
    try {
        return await prisma.newsletter.findMany({
            where: {
                ...(role !== Roles.SUPER_ADMIN ),
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};
