const { PrismaClient } = require('@prisma/client');
const Messages = require('../../constants/messages');
const ApiError = require('../../utils/ApiError');
const prisma = new PrismaClient();


exports.createProductAttribute = async (req, res) => {
    const { name, type, unit, categoryId } = req.body
    const attribute = await prisma.attributeDefinition.create({
        data: {
            name,
            type,
            unit,
            categoryId
        }
    });
    return attribute;
}

exports.getAllAttributes = async (req, res) => {
    try {
        const { categoryId } = req.query
        const attributes = await prisma.attributeDefinition.findMany({
            where: categoryId ? { categoryId } : undefined,
            orderBy: { name: 'asc' },
            include:{
                category:true
            }
        },)
        return attributes;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}

exports.getAttributeById = async (req, res) => {
    try {
        const { id } = req.params
        const attribute = await prisma.attributeDefinition.findUnique({
            where: { id }
        })
        if (!attribute) throw new ApiError(500, 'Attribute not found')
        return attribute;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}


exports.updateAttribute = async (req, res) => {
    try {
        const { id } = req.params
        const { name, type, unit, categoryId } = req.body
        const updated = await prisma.attributeDefinition.update({
            where: { id },
            data: { name, type, unit, categoryId }
        })
        return updated;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}


exports.deleteAttribute = async (req, res) => {
    try {
        const { id } = req.params
        await prisma.attributeDefinition.delete({
            where: { id }
        })

    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
}