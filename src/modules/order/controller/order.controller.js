const Order = require("../model/order.model");
const Cart = require("../../cart/model/cart.model");
const Address = require("../../address/model/address.model");
const Products = require("../../products/model/products.model");
const wrapper = require("../../../helper/responses");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payload = { ...req.body };
    payload.custommer_id = userId;

    const getAddress = await Address.findOne({ where: { user_id: userId, primary_address: true } });
    if (!getAddress) throw new Error("failed create checkout please add address first!");

    const getCart = await Cart.findAll({ where: { custommer_id: userId } });
    if (!getCart) throw new Error("cart is empty");
    payload.products = getCart.map((item) => {
      return item.dataValues;
    });

    const groupedBySeller = getCart.reduce((acc, cartItem) => {
      const sellerId = cartItem.dataValues.seller_id;
      if (!acc[sellerId]) {
        acc[sellerId] = [];
      }
      acc[sellerId].push(cartItem.dataValues);
      return acc;
    }, {});

    const groupedBySellerArray = Object.values(groupedBySeller).map((group, index) => {
      return {
        id: index + 1,
        items: group,
      };
    });

    let result;
    for (const product of groupedBySellerArray) {
      payload.custommer_address = getAddress.dataValues;
      payload.products = product.items;
      payload.seller_id = product.items[0].seller_id;

      result = await Order.create(payload);
      if (!result) throw new Error("failed create order please contact the developer");

      for (const x of payload.products) {
        const getProduct = await Products.findOne({ where: { id: x.product_id } });
        await Products.update({ stock: getProduct.dataValues.stock - 1 }, { where: { id: x.product_id } });
      }
    }

    await Cart.destroy({ where: { custommer_id: userId } });
    return wrapper.sendSuccessResponse(res, "order successfully", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "order failed", error.message, 500);
  }
};

const custommerListOrder = async (req, res) => {
  try {
    const status = req.query.status || "";
    const custommerId = req.user.userId;
    const page = 1;
    const limit = 10;
    const where = { custommer_id: custommerId, status: { [Op.like]: `%${status}%` } };
    const model = Order;
    const attributes = null;
    const order = null;
    const include = null;
    await wrapper.paginateData(res, model, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list order", error.message, 500);
  }
};

const sellerListOrder = async (req, res) => {
  try {
    const status = req.query.status || "";

    const sellerId = req.user.userId;
    const page = 1;
    const limit = 10;
    const where = { seller_id: sellerId, status: { [Op.like]: `%${status}%` } };
    const model = Order;
    const attributes = null;
    const order = null;
    const include = null;
    await wrapper.paginateData(res, model, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list order", error.message, 500);
  }
};

const updatedStatus = async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const orderId = req.params.orderId;
    const status = req.body.status;
    const result = await Order.update({ status: status }, { where: { id: orderId, seller_id: sellerId } });
    if (!result) throw new Error("failed updated status to packed please contact the developer");

    return wrapper.sendSuccessResponse(res, "successfully to change status to packed", null, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed to change status to packed", error.message, 500);
  }
};

module.exports = {
  createOrder,
  custommerListOrder,
  sellerListOrder,
  updatedStatus,
};
