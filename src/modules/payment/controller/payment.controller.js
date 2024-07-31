const Payment = require("../model/payment.model.js");
const wrapper = require("../../../helper/responses.js");
const { uploadToCloudinary } = require("../../../middlewares/upload.js");
const path = require("path");

const insertPaymentMethod = async (req, res) => {
  try {
    const payload = { ...req.body };

    const photoName = Date.now() + path.extname(req.file.originalname);
    const resUpload = await uploadToCloudinary("blanja/paymentmethod", req.file.path, photoName);
    if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");
    payload.photo = resUpload.url;

    const result = await Payment.create(payload);
    if (!result) throw new Error("failed insert payment method please contact the developer");

    return wrapper.sendSuccessResponse(res, "successfully insert payment method", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed insert payment method", error.message, 500);
  }
};

const listPaymentMethod = async (req, res) => {
  try {
    const result = await Payment.findAll();
    if (!result) throw new Error("failed get list payment method please contact the developer");

    return wrapper.sendSuccessResponse(res, "successfully get payment method list", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get payment method list", error.message, 500);
  }
};

module.exports = {
  insertPaymentMethod,
  listPaymentMethod,
};
