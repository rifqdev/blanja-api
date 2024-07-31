const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categories.controller");
const { upload } = require("../../../middlewares/upload");

router.post("/", upload.single("photo"), categoriesController.createCategories);
router.put("/:id", upload.single("photo"), categoriesController.editCategory);
router.delete("/:id", categoriesController.deleteCategory);
router.get("/", categoriesController.listCategory);

module.exports = router;
