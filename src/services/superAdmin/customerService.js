const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Messages = require('../../constants/messages');

const Roles = require('../../constants/roleEnum');
const ApiError = require('../../utils/ApiError');
// exports.fetchAllCustomer = async () => {
//     return await prisma.user.findMany({
//         where: {
//             role: Roles.CUSTOMER
//         },
//     });
// }
exports.fetchAllCustomer = async (req, res) => {
    const {
        page = 1,
        limit = 10
    } = req.query;

    const count = await prisma.user.count();
    const totalPages = Math.ceil(count / limit);

    try {
        const users = await prisma.user.findMany({
            take: limit,
            skip: (page - 1) * limit
        });

        return {
            users,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
            },
        };

    } catch (error) {
        throw new ApiError("Unable to fetch coupons"
        );
    }
};
exports.searchCustomer = async (searchQuery = '') => {
    return await prisma.user.findMany({
        where: {
            role: Roles.CUSTOMER,
            OR: [
                {
                    name: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    email: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ]
        },
    });
}