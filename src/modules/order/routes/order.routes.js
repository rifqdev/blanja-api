const express = require("express");
const router = express.Router();
const orderControllers = require("../controller/order.controller");
const jwtMiddleware = require("../../../middlewares/jwt");

router.post("/", jwtMiddleware.authenticateJWT, orderControllers.createOrder);
router.get("/custommer", jwtMiddleware.authenticateJWT, orderControllers.custommerListOrder);
router.get("/seller", jwtMiddleware.authenticateJWT, orderControllers.sellerListOrder);
router.put("/seller/status/:orderId", jwtMiddleware.authenticateJWT, orderControllers.updatedStatus);

module.exports = router;
