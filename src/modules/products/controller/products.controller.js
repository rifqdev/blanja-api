const { Users, Products, Categories } = require("../../../config/db/assosiation");
const wrapper = require("../../../helper/responses");
const path = require("path");
const { uploadToCloudinary, deleteImage } = require("../../../middlewares/upload");
const getPublicId = require("../../../helper/getPublicId");
const { Op } = require("sequelize");

const addProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payload = { ...req.body };
    let photos = [];
    if (req.files) {
      for (const photo of req.files) {
        const photoName = Date.now() + path.extname(photo.originalname);
        const resUpload = await uploadToCloudinary("blanja/products", photo.path, photoName);
        if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");

        photos.push(resUpload.url);
      }
    }
    payload.seller_id = userId;
    payload.photo = photos;

    const result = await Products.create(payload);
    if (!result) throw new Error("failed insert products please contact the developer");

    return wrapper.sendSuccessResponse(res, "add product successfully", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "add product failed", error.message, 500);
  }
};

const editProduct = async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const id = req.params.id;

    const getProduct = await Products.findOne({ where: { id, seller_id: sellerId } });
    if (!getProduct) throw new Error("product not found");

    let photos = [];
    if (req.files.length > 0) {
      for (const photo of req.files) {
        const photoName = Date.now() + path.extname(photo.originalname);
        const resUpload = await uploadToCloudinary("blanja/products", photo.path, photoName);
        if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");

        photos.push(resUpload.url);
      }
      // TODO: delete old photos
      for (const photo of getProduct.dataValues.photo) {
        const publicId = await getPublicId(photo);
        await deleteImage(publicId);
      }
    } else {
      photos = getProduct.dataValues.photo;
    }

    const payload = { ...getProduct.dataValues, ...req.body, photo: photos };

    const result = await Products.update(payload, { where: { id, seller_id: sellerId } });
    if (!result) throw new Error("failed edit product please contact the developer");

    const data = await Products.findOne({ where: { id } });

    return wrapper.sendSuccessResponse(res, "edit product successfully", data, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "edit product failed", error.message, 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const sellerId = req.user.userId;

    const getProduct = await Products.findOne({ where: { id, seller_id: sellerId } });
    if (!getProduct) throw new Error("product not found");

    const result = await Products.destroy({ where: { id, seller_id: sellerId } });
    if (!result) throw new Error("failed delete product please contact the developer");

    if (getProduct.dataValues.photo.length > 0) {
      // TODO: delete old photos
      for (const photo of getProduct.dataValues.photo) {
        const publicId = await getPublicId(photo);
        await deleteImage(publicId);
      }
    }
    return wrapper.sendSuccessResponse(res, "delete product successfully", null, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "delete product failed", error.message, 500);
  }
};

const listNewProducts = async (req, res) => {
  try {
    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold", "price"];
    const order = [["createdAt", "DESC"]];
    const where = null;
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
        ],
      },
    };

    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list new products", error.message, 500);
  }
};

const listPopularProducts = async (req, res) => {
  try {
    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold", "price"];
    const order = [["sold", "DESC"]];
    const where = null;
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
          "wallet",
          "token",
          "createdAt",
          "updatedAt",
        ],
      },
    };
    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list new products", error.message, 500);
  }
};

const listSearchProducts = async (req, res) => {
  try {
    const key = req.query.key || "";
    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold"];
    const order = [["sold", "DESC"]];
    const where = { name: { [Op.like]: `%${key}%` } };
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
          "createdAt",
          "updatedAt",
        ],
      },
    };
    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list new products", error.message, 500);
  }
};

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const include = {
      model: Users,
      attributes: {
        exclude: [
          "id",
          "name",
          "email",
          "password",
          "phone_number",
          "gender",
          "birth",
          "photo",
          "is_verified",
          "account_type",
          "store_description",
          "token",
          "createdAt",
          "updatedAt",
        ],
      },
    };

    const result = await Products.findOne({ where: { id }, include, attributes: { exclude: ["seller_id"] } });
    if (!result) throw new Error("product not found");

    return wrapper.sendSuccessResponse(res, "get detail product successfully", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "get detail product failed", error.message, 500);
  }
};

const recentsProducts = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const checkCategory = await Categories.findOne({ where: { id: categoryId } });
    if (!checkCategory) throw new Error("category not found");

    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold"];
    const order = [["createdAt", "DESC"]];
    const where = { category_id: categoryId };
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
          "createdAt",
          "updatedAt",
        ],
      },
    };

    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);

    // return wrapper.sendSuccessResponse(res, "get recents products successfully", null, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "get recents products failed", error.message, 500);
  }
};
const listProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const checkCategory = await Categories.findOne({ where: { id: categoryId } });
    if (!checkCategory) throw new Error("category not found");

    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold"];
    const order = [["createdAt", "DESC"]];
    const where = { category_id: categoryId };
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
          "createdAt",
          "updatedAt",
        ],
      },
    };

    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "get recents products failed", error.message, 500);
  }
};

const getProductBySellerId = async (req, res) => {
  try {
    const page = 1;
    const limit = 10;
    const attributes = ["id", "name", "photo", "sold", "price"];
    const order = [["createdAt", "DESC"]];
    const where = {seller_id: req.user.userId};
    const include = {
      model: Users,
      attributes: {
        exclude: [
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
        ],
      },
    };

    await wrapper.paginateData(res, Products, where, page, limit, attributes, order, include);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get list new products", error.message, 500);
  }
};

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  listNewProducts,
  listPopularProducts,
  listSearchProducts,
  detailProduct,
  recentsProducts,
  listProductsByCategory,
  getProductBySellerId
};
