const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateUniqueSlug = require('../../utils/slugify');
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
const Roles = require('../../constants/roleEnum');

const createBanner = async (req, res) => {

    const {
        title,
        description,
        image,
        buttonText,
        buttonLink,
        isActive = true,
        displayImage,
        displayNumber,
        displayText,
    } = req.body;
    // try {

    const banner = await prisma.banner.create({
        data: {
            title: title,
            description: description,
            image: image,
            buttonLink: buttonLink,
            buttonText: buttonText,
            isActive: isActive,
            displayImage: displayImage,
            displayNumber: displayNumber,
            displayText: displayText,
        }
    });
    return banner
        ;
    // } catch (error) {
    //     throw new ApiError(500, "Unable to create banner"
    //     );
    // }
};

const updateBanner = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        image,
        buttonLink,
        buttonText,
        isActive,
        displayImage,
        displayNumber,
        displayText,
    } = req.body;

    // try {
    const existingBanner = await prisma.banner.findUnique({
        where: { id: (id) },
    });

    if (!existingBanner) {
        throw new ApiError(500, "Banner not found");
    }
    const updatedBanner = await prisma.banner.update({
        where: { id },
        data: {
            title,
            description,
            image,
            buttonLink,
            buttonText,
            isActive,
            displayImage: displayImage,
            displayNumber: displayNumber,
            displayText: displayText,
        }
    });

    return updatedBanner

    // } catch (error) {
    //     throw new ApiError(500, "Unable to update banner");
    // }
};

const deleteBanner = async (req, res) => {
    const { id } = req.params;
    try {
        const existingBanner = await prisma.banner.findUnique({
            where: { id: (id) },
        });

        if (!existingBanner) {
            throw new ApiError(500, "Banner not found");
        }
        const banner = await prisma.banner.delete({
            where: { id }
        });
    } catch (error) {
        throw new ApiError(500, "Unable to delete banner"
        );
    }
};

const fetAllActiveBanner = async (req, res) => {
    try {
        const banners = await prisma.banner.findMany({
            where: {
                isActive: true
            }
        });

        return banners

    } catch (error) {
        throw new ApiError(500, "Unable to fetch banners");
    }
};


const fetchAllBanner = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
        const banners = await prisma.banner.findMany({
            skip: Number(offset),
            take: Number(limit),
        });
        const totalBanners = await prisma.banner.count();
        const totalPages = Math.ceil(totalBanners / limit);
        return {
            banners,
            meta: {
                currentPage: Number(page),
                totalPages,
                totalBanners,
                limit: Number(limit),
            },
        };
    } catch (error) {
        throw new ApiError(500, "Unable to fetch banners");
    }
};

const fetchStoryAndMission = async (req, res) => {
    try {
        const banners = await prisma.banner.findMany({
            where: {
                OR: [
                    { position: "MISSION_PAGE" },
                    { position: "ABOUT_PAGE" },
                ],
            },

        });
        return banners;
    } catch (error) {

        throw new ApiError(500, "Unable to fetch banners");
    }
};


const fetchBannerById = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await prisma.banner.findFirst({
            where: {
                id
            }
        });
        return banner;

    } catch (error) {
        throw new ApiError(500, "Unable to fetch banners");
    }
};
module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    fetchAllBanner,
    fetchStoryAndMission,
    fetchBannerById
};