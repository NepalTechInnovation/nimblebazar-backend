// model Tag {
//     id    String  @id @default(cuid())
//     name  String
//     slug  String  @unique
//     image String?
  
//     products Product[] @relation("ProductTags")
  
//     @@map("tags")
//   }

const db = require("../../config/db");

const createTag = async (req, res) => {
    const {
        name,
        slug,
        image
    } = req.body;

    try {
        const tag = await db.tag.create({
            data: {
                name,
                slug,
                image
            }
        });

        res.status(201).json({
            success: true,
            message: "Tag created successfully",
            data: tag
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create tag"
        });
    }
};

const updateTag = async (req, res) => {
    const {
        id,
        name,
        slug,
        image
    } = req.body;

    try {
        const tag = await db.tag.update({
            where: { id },
            data: {
                name,
                slug,
                image
            }
        });

        res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: tag
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update tag"
        });
    }
};

const deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await db.tag.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            data: tag
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete tag"
        });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tags = await db.tag.findMany();

        res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            data: tags
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch tags"
        });
    }
}

module.exports = {
    createTag,
    updateTag,
    deleteTag,
    getAllTags
}