const Address = require("../model/address.model");
const wrapper = require("../../../helper/responses");
const { Op } = require("sequelize");

const addAddress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const payload = {
      ...req.body,
      user_id: userId,
    };

    const result = await Address.create(payload);
    if (!result) throw new Error("failed insert address, please contact the developer");

    if (payload.primary_address == "true") {
      const checkPrimaryAddress = await Address.findOne({
        where: {
          user_id: userId,
          primary_address: true,
          id: { [Op.ne]: result.dataValues.id },
        },
      });

      if (checkPrimaryAddress) {
        await Address.update({ primary_address: false }, { where: { id: checkPrimaryAddress.dataValues.id } });
      }
    }

    return wrapper.sendSuccessResponse(res, "add address successfully", result, 200);
  } catch (error) {
    return wrapper.sendSuccessResponse(res, "add address successfully", null, 200);
  }
};

const editAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const payload = { ...req.body };

    const checkAddress = await Address.findOne({ where: { id } });
    if (!checkAddress) throw new Error("address not found");

    const result = await Address.update(payload, { where: { id } });
    if (!result) throw new Error("Failed edit address please contact the developer");

    if (payload.primary_address == "true") {
      const checkPrimaryAddress = await Address.findOne({
        where: {
          user_id: userId,
          primary_address: true,
          id: { [Op.ne]: checkAddress.dataValues.id },
        },
      });

      if (checkPrimaryAddress) {
        await Address.update({ primary_address: false }, { where: { id: checkPrimaryAddress.dataValues.id } });
      }
    }
    const data = await Address.findOne({ where: { id } });
    return wrapper.sendSuccessResponse(res, "edit address successfully", data, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "edit address failed", error.message, 500);
  }
};

const setPrimaryAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;
    const payload = { primary_address: true };

    const getAddress = await Address.findOne({
      where: { id, user_id: userId },
    });
    if (!getAddress) throw new Error("address not found");

    const result = await Address.update(payload, {
      where: { id, user_id: userId },
    });
    if (!result) throw new Error("failed set address please contact developer");

    await Address.update({ primary_address: false }, { where: { id: { [Op.ne]: id }, user_id: userId } });

    return wrapper.sendSuccessResponse(res, "set primary address successfully", null, 200);
  } catch (error) {
    return wrapper.sendSuccessResponse(res, "set primary address failed", error.message, 500);
  }
};

const listAddress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await Address.findAll({ where: { user_id: userId } });

    return wrapper.sendSuccessResponse(res, "get list address successfully", result ? result : [], 200);
  } catch (error) {
    return wrapper.sendSuccessResponse(res, "get list address failed", error.message, 500);
  }
};

module.exports = {
  addAddress,
  editAddress,
  setPrimaryAddress,
  listAddress,
};
