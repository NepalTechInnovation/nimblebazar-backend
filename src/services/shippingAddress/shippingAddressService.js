const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
exports.createShippingAddress = async (data, userId) => {
    const address = await prisma.shippingAddress.create({
        data: {
            userId: userId,
            fullName: data.fullName,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country
        }
    });
    return address;
};

exports.getShippingAddressById = async (id) => {
    const address = await prisma.shippingAddress.findFirst({ where: { id, isActive: true, } });
    if (!address) throw new ApiError(404, Messages.SHIPPING_ADDRESS.FETCH_FAILED);
    return address;
};

exports.getAllShippingAddressesByUser = async (userId) => {
    return await prisma.shippingAddress.findMany({ where: { userId, isActive: true, } });
};

exports.updateShippingAddress = async (id, updateData) => {
    const exists = await prisma.shippingAddress.findUnique({ where: { id } });
    if (!exists) throw new ApiError(404, Messages.SHIPPING_ADDRESS.NOT_FOUND);

    return await prisma.shippingAddress.update({
        where: { id },
        data: {
            fullName: updateData.fullName,
            phone: updateData.phone,
            street: updateData.street,
            city: updateData.city,
            state: updateData.state,
            zipCode: updateData.zipCode,
            country: updateData.country
        }
    });
};

exports.deleteShippingAddress = async (id) => {

    try {
        const exists = await prisma.shippingAddress.findFirst({ where: { id } });
        if (!exists) throw new ApiError(404, Messages.SHIPPING_ADDRESS.NOT_FOUND);


        await prisma.shippingAddress.update({
            where: { id }, data: {
                isActive: false
            }
        });
    } catch (err) {
        console.error("Error deleting shipping address:", err);
        throw new ApiError(500, "Failed to delete address");
    }

};
