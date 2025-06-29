const { PrismaClient } = require('@prisma/client');
const Messages = require('../../constants/messages');
const prisma = new PrismaClient();


exports.createProductAttributeValue = async (req, res) => {
    const { productId,
        attributeDefinitionId,
        valueString,
        valueInt,
        valueDecimal,
        valueBool,
        valueDate, } = req.body
    const value = await prisma.productAttributeValue.create({
        data: {
            productId,
            attributeDefinitionId,
            valueString,
            valueInt,
            valueDecimal,
            valueBool,
            valueDate,
        }
    });
    return value;
}

exports.getAllProductAttributeValue = async (req, res) => {
    try {
        const { attributeId } = req.query
        const attributes = await prisma.attributeDefinition.findMany({
            where: categoryId ? { categoryId } : undefined,
            orderBy: { name: 'asc' }
        })
        return attributes;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}

exports.getAttributeById = async (req, res) => {
    try {
        const { id } = req.params
        const value = await prisma.productAttributeValue.findUnique({
            where: { id }
        })
        if (!value) throw new ApiError(500, 'Product Attribute Value not found')
        return value;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}


exports.updateAttribute = async (req, res) => {
    try {
        const { id } = req.params
        const { productId,
            attributeDefinitionId,
            valueString,
            valueInt,
            valueDecimal,
            valueBool,
            valueDate, } = req.body
        const updated = await prisma.productAttributeValue.update({
            where: { id },
            data: {
                productId,
                attributeDefinitionId,
                valueString,
                valueInt,
                valueDecimal,
                valueBool,
                valueDate,
            }
        })
        return updated;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}


exports.deleteAttribute = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.productAttributeValue.delete({
            where: { id: id },
        });

    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}