const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
exports.addSocialMedia = async (req, res) => {
    const { platform, url, iconUrl, isActive, order } = req.body;
    const socialMedia = await prisma.socialMedia.create({
        data: {
            platform, url, iconUrl, isActive, order
        }
    });
    return socialMedia;
}

exports.updateSocialMedia = async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.socialMedia.findFirst({
        where: { id },
    });
    if (!existing) {
        throw new ApiError(500, Messages.SITE_SETTING.ERROR);
    }
    const { platform, url, iconUrl, isActive, order } = req.body;
    const socialMedia = await prisma.socialMedia.update({
        where: {
            id: id
        },
        data: {
            platform, url, iconUrl, isActive, order
        }
    });
    return socialMedia;
}


exports.deleteSocialMedia = async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.socialMedia.findFirst({
        where: { id },
    });
    if (!existing) {
        throw new ApiError(500, Messages.SITE_SETTING.ERROR);
    }
    const socialMedia = await prisma.socialMedia.delete({
        where: {
            id: id
        }
    });
    return socialMedia;
}


exports.fetchAllActiveInOrderSocialMedia = async (req, res) => {
    const socialMedia = await prisma.socialMedia.findMany({
        orderBy: {
            order: "asc"
        }
    });
    return socialMedia;
}

exports.fetchSocialMediaById = async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.socialMedia.findFirst({
        where: { id },
    });
    if (!existing) {
        throw new ApiError(500, Messages.SITE_SETTING.ERROR);
    }
    return existing;
}