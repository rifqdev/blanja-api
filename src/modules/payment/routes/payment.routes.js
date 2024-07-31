const express = require("express");
const router = express.Router();
const paymentControllers = require("../controller/payment.controller");
const { upload } = require("../../../middlewares/upload");

router.post("/", upload.single("photo"), paymentControllers.insertPaymentMethod);
router.get("/", paymentControllers.listPaymentMethod);

module.exports = router;
