const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const s3Client = require('../../config/s3Client');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMultiple = upload.array('images', 10);

const uploadImages = async (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) return res.status(400).json(new ApiError(400, err.message));

    if (!req.files || req.files.length === 0) {
      return res.status(400).json(new ApiError(400, 'No files uploaded'));
    }

    try {
      const rawFolder = Object.keys(req.body).find(key => key.trim() === 'folder');
      const folder = rawFolder ? req.body[rawFolder].trim() : '';
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const ext = path.extname(file.originalname);
          const fileName = `${uuidv4()}${ext}`;
          const key = `${folder}/${fileName}`;

          const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
          };

          await s3Client.send(new PutObjectCommand(uploadParams));

          return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        })
      );

      return res.status(200).json(new ApiResponse(200, Messages.UPLOAD_SUCCESS, imageUrls));
    } catch (error) {
      return res.status(500).json(new ApiError(500, error.message));
    }
  });
};

module.exports = { uploadImages };
