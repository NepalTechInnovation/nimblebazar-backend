const express = require("express");
const router = express.Router();

const testimonailController = require("../../controllers/testimonial/testimonailController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");
router.post("/create-testimonial", authorize, authorizeRoles(Roles.SUPER_ADMIN), testimonailController.addTestimonial);
router.put("/update-testimonial/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), testimonailController.updateTestimonial);
router.delete("/delete-testimonial/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), testimonailController.deleteTestimonial);
router.get("/fetch-all-testimonial", testimonailController.fetchAllTestimonial);
router.get("/fetch-testimonial-by-id/:id", testimonailController.fetchTestimonialById);
module.exports = router;