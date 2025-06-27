const express = require("express");
const router = express.Router();

const siteSettingController = require("../../controllers/siteSetting/siteSettingController");
const socialMediaController = require("../../controllers/socialMedia/socialMediaController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");
router.post("/create-or-update-site-setting", authorize, authorizeRoles(Roles.SUPER_ADMIN), siteSettingController.addOrUpdateSetting);
router.post("/create-social-media", authorize, authorizeRoles(Roles.SUPER_ADMIN), socialMediaController.addSocialMedia);
router.put("/update-social-media/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), socialMediaController.updateSocialMedia);
router.delete("/delete-social-media/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), socialMediaController.deleteSocialMedia);
router.get("/fetch-all-social-media", socialMediaController.fetchAllActiveInOrderSocialMedia);
router.get("/fetch-social-media-by-id/:id", socialMediaController.fetchSocialMediaById);
router.get("/fetch-site-setting", siteSettingController.fetchSiteSetting);
module.exports = router;