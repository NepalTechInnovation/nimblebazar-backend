const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.addOrUpdateSetting = async (req, res) => {
    const { siteName, siteDescription, faviconUrl, logoUrl, footerLogoUrl, contactEmail, address, metaTitle, metaDescription, metaKeywords, whatsappNumber, phoneNumber } = req.body;
    const setting = await prisma.siteSettings.upsert({
        where: { id: "singleton" },
        update: {
            siteName, siteDescription, faviconUrl, logoUrl, footerLogoUrl, contactEmail, address, metaTitle, metaDescription, metaKeywords, whatsappNumber, phoneNumber
        },
        create: {
            id: "singleton",
            siteName, siteDescription, faviconUrl, logoUrl, footerLogoUrl, contactEmail, address, metaTitle, metaDescription, metaKeywords, whatsappNumber, phoneNumber
        },
    });
    return setting;
}

exports.fetchSiteSetting = async (req, res) => {
    const setting = await prisma.siteSettings.findFirst({
        where: {
            id: "singleton"
        }
    });
    return setting;
}