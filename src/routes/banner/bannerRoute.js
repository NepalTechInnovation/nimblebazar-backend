const express = require("express");
const router = express.Router();

const bannerController = require("../../controllers/banner/bannerController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");
router.post("/create-banner", authorize, authorizeRoles(Roles.SUPER_ADMIN,), bannerController.createBanner);
router.put("/update-banner/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN, ), bannerController.updateBanner);
router.delete("/delete-banner/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN,), bannerController.deleteBanner);
router.get("/fetch-all-banner", bannerController.fetchAllBanner);
router.get("/fetch-story-and-mission", bannerController.fetchStoryAndMission);
router.get("/fetch-banner-by-id/:id", bannerController.fetchBannerById);
module.exports = router;