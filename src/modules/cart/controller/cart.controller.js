const { Cart, Products, Users } = require("../../../config/db/assosiation");
const wrapper = require("../../../helper/responses");

const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const payload = { ...req.body };
    payload.custommer_id = userId;

    const getSellerId = await Products.findOne({ where: { id: payload.product_id } });
    payload.seller_id = getSellerId.dataValues.seller_id;

    const result = await Cart.create(payload);
    if (!result) throw new Error("failed add item to cart please contact the developer");

    delete result.dataValues.product_id;
    delete result.dataValues.custommer_id;
    return wrapper.sendSuccessResponse(res, "successfully add to bag", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed add to bag", error.message, 500);
  }
};

const listCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const exclude = ["stock", "color", "size", "description", "seller_id", "category_id", "sold", "createdAt", "updatedAt"];
    const sellerExclude = [
      "id",
      "name",
      "email",
      "password",
      "phone_number",
      "gender",
      "birth",
      "photo",
      "is_verified",
      "address",
      "account_type",
      "store_description",
      "token",
      "wallet",
      "createdAt",
      "updatedAt",
    ];
    const result = await Cart.findAll({
      where: { custommer_id: userId },
      include: [{ model: Products, attributes: { exclude }, include: { model: Users, attributes: { exclude: sellerExclude } } }],
      attributes: { exclude: ["custommer_id"] },
    });

    return wrapper.sendSuccessResponse(res, "successfully get list cart", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list cart", error.message, 500);
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Cart.destroy({ where: { id } });
    if (!result) throw new Error("failed delete item please contact the developer");

    return wrapper.sendSuccessResponse(res, "successfully delete item", null, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed delete item", error.message, 500);
  }
};

module.exports = {
  addItemToCart,
  listCart,
  deleteItem,
};
