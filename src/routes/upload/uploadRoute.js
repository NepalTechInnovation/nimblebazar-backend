const express = require('express');
const  uploadController  = require('../../controllers/upload/uploadController');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require('../../constants/roleEnum');
const router = express.Router();
router.post('/upload',authorize,authorizeRoles(Roles.CUSTOMER, Roles.SUPER_ADMIN),  uploadController.uploadImages);

module.exports = router;
