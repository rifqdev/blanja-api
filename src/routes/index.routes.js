const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middlewares/jwt");
const categoriesRoutes = require("../modules/categories/routes/categories.routes");
const usersRoutes = require("../modules/users/routes/users.routes");
const addressRoutes = require("../modules/address/routes/address.routes");
const productsRoutes = require("../modules/products/routes/products.routes");
const cartRoutes = require("../modules/cart/routes/cart.routes");
const paymentRoutes = require("../modules/payment/routes/payment.routes");
const orderRoutes = require("../modules/order/routes/order.routes");

router.use("/v1/categories", categoriesRoutes);
router.use("/v1/users", usersRoutes);
router.use("/v1/address", jwtMiddleware.authenticateJWT, addressRoutes);
router.use("/v1/products", productsRoutes);
router.use("/v1/cart", cartRoutes);
router.use("/v1/payment", paymentRoutes);
router.use("/v1/order", orderRoutes);

module.exports = router;
