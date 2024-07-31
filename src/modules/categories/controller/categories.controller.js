const Categories = require("../model/model-category");
const wrapper = require("../../../helper/responses");
const path = require("path");
const { uploadToCloudinary, deleteImage } = require("../../../middlewares/upload");
const getPublicId = require("../../../helper/getPublicId");

const createCategories = async (req, res) => {
  try {
    const body = { ...req.body };

    const photoName = Date.now() + path.extname(req.file.originalname);
    const resUpload = await uploadToCloudinary("blanja/categories", req.file.path, photoName);
    if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");

    const payload = {
      ...body,
      photo: resUpload.url,
    };
    const result = await Categories.create(payload);
    return wrapper.sendSuccessResponse(res, "success create category", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed create category", error.message, 500);
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const getCategory = await Categories.findOne({ where: { id } });
    if (!getCategory) throw new Error("Category not Found");

    const photoName = Date.now() + path.extname(req.file.originalname);
    const resUpload = await uploadToCloudinary("blanja/categories", req.file.path, photoName);
    if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");

    const payload = {
      ...getCategory.dataValues,
      ...req.body,
      photo: resUpload.url,
      updatedAt: new Date(),
    };

    const result = await Categories.update(payload, { where: { id } });

    // TODO: Delete image from cloudinary
    const publicId = await getPublicId(getCategory.dataValues.photo);
    await deleteImage(publicId);

    const data = await Categories.findOne({ where: { id } });
    return wrapper.sendSuccessResponse(res, "success edit category", data.dataValues, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed edit category", error.message, 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const getCategory = await Categories.findOne({ where: { id } });
    if (!getCategory) throw new Error("Category not Found");

    const result = await Categories.destroy({ where: { id } });

    // TODO: Delete image from cloudinary
    const publicId = await getPublicId(getCategory.dataValues.photo);
    await deleteImage(publicId);

    return wrapper.sendSuccessResponse(res, "success delete category", getCategory.dataValues, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed delete category", error.message, 500);
  }
};

const listCategory = async (req, res) => {
  try {
    const result = await Categories.findAll();
    return wrapper.sendSuccessResponse(res, "success get category", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed get category", error.message, 500);
  }
};

module.exports = {
  createCategories,
  editCategory,
  deleteCategory,
  listCategory,
};
