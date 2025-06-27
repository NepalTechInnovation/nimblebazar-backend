const express = require("express");
const router = express.Router();

const tagController = require("./controller");

router.post("/create", tagController.createTag);
router.put("/update", tagController.updateTag);
router.delete("/delete/:id", tagController.deleteTag);
router.get("/get/all", tagController.getAllTags);

module.exports = router;