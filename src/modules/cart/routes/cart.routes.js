const express = require("express");
const router = express.Router();
const cartControllers = require("../controller/cart.controller");
const jwtMiddleware = require("../../../middlewares/jwt");

router.post("/", jwtMiddleware.authenticateJWT, cartControllers.addItemToCart);
router.get("/", jwtMiddleware.authenticateJWT, cartControllers.listCart);
router.delete("/:id", jwtMiddleware.authenticateJWT, cartControllers.deleteItem);

module.exports = router;
