const express = require("express");
const router = express.Router();
const productsControllers = require("../controller/products.controller");
const jwtMiddleware = require("../../../middlewares/jwt");
const { upload } = require("../../../middlewares/upload");

router.post("/", jwtMiddleware.authenticateJWT, upload.array("photo"), productsControllers.addProduct);
router.put("/:id", jwtMiddleware.authenticateJWT, upload.array("photo"), productsControllers.editProduct);
router.delete("/:id", jwtMiddleware.authenticateJWT, productsControllers.deleteProduct);
router.get("/new", productsControllers.listNewProducts);
router.get("/popular", productsControllers.listPopularProducts);
router.get("/search", productsControllers.listSearchProducts);
router.get("/:id", productsControllers.detailProduct);
router.get("/recents/:categoryId", productsControllers.recentsProducts);
router.get("/category/:categoryId", productsControllers.listProductsByCategory);

module.exports = router;
