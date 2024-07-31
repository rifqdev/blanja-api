const Users = require("../model/users.model");
const wrapper = require("../../../helper/responses");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../../helper/sendEmail");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../../../middlewares/jwt");
const { uploadToCloudinary, deleteImage } = require("../../../middlewares/upload");
const path = require("path");
const getPublicId = require("../../../helper/getPublicId");

const register = async (req, res) => {
  try {
    const body = { ...req.body };
    const isRegistered = await Users.findOne({ where: { email: body.email } });
    if (isRegistered) throw new Error("Email already registered!");

    const passwordHash = bcrypt.hashSync(body.password);
    const token = crypto.randomBytes(16).toString("hex");

    body.email = body.email.toLowerCase();
    body.password = passwordHash;
    body.token = token;
    const result = await Users.create(body);

    sendEmail.sendConfirmationEmail(body.email, token);
    delete result.dataValues.password;
    delete result.dataValues.token;
    delete result.dataValues.is_verified;

    return wrapper.sendSuccessResponse(res, "register successfully", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed register", error.message, 500);
  }
};

const verificationEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const checkUser = await Users.findOne({ where: { token } });
    if (!checkUser) throw new Error("token is invalid");

    const payload = {
      is_verified: true,
      token: null,
    };

    const result = await Users.update(payload, { where: { token } });
    if (!result) throw new Error("failed update verification");

    res.send(`<center>
            <div>
            <h1>Activation Success</h1>
            </div>
            </center>`);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "verification email failed", error.message, 500);
  }
};

const login = async (req, res) => {
  try {
    const body = { ...req.body };

    const checkUser = await Users.findOne({
      where: { email: body.email, account_type: body.account_type },
    });
    if (!checkUser) throw new Error("Email is not registered");

    const password = checkUser.dataValues.password;
    const isPassword = bcrypt.compareSync(body.password, password);
    if (!isPassword) throw new Error("password is invalid");

    const isVerifiedByEmail = checkUser.dataValues.is_verified;
    if (!isVerifiedByEmail) throw new Error("email has not verify, please check your email and click verify button");

    const payload = {
      userId: checkUser.dataValues.id,
    };
    const accessToken = jwtMiddleware.generateAccessToken(payload);
    const refreshToken = jwtMiddleware.generateRefreshToken(payload);

    delete checkUser.dataValues.password;
    delete checkUser.dataValues.token;
    const data = {
      ...checkUser.dataValues,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    return wrapper.sendSuccessResponse(res, "login successfully", data, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "login failed", error.message, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRETE_KEY_JWT);

    const payload = {
      userId: decoded.userId,
    };
    const result = {
      token: jwtMiddleware.generateAccessToken(payload),
      refreshToken: jwtMiddleware.generateRefreshToken(payload),
    };

    return wrapper.sendSuccessResponse(res, "successfully generate refresh token", result, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "failed generate refresh token", error.message, 500);
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const getUser = await Users.findOne({ where: { id: userId } });
    if (!getUser) throw new Error("user not found");

    let resUpload = "";
    if (req.file) {
      const mainFolder = getUser.dataValues.account_type === "custommer" ? "blanja/custommer" : "blanja/seller";
      const photoName = Date.now() + path.extname(req.file.originalname);
      resUpload = await uploadToCloudinary(mainFolder, req.file.path, photoName);
      if (resUpload.message === "Fail") throw new Error("Failed updload photo to cloudinary");
    } else {
      resUpload = {
        url: getUser.dataValues.photo,
      };
    }

    const payload = {
      ...getUser.dataValues,
      ...req.body,
      photo: resUpload.url,
      updatedAt: new Date(),
    };

    const result = await Users.update(payload, { where: { id: userId } });
    if (!result) throw new Error("failed edit profile");

    // TODO: Delete image from cloudinary
    if (req.file && getUser.dataValues.photo) {
      const publicId = await getPublicId(getUser.dataValues.photo);
      await deleteImage(publicId);
    }

    return wrapper.sendSuccessResponse(res, "edit profile successfully", null, 200);
  } catch (error) {
    return wrapper.sendErrorResponse(res, "edit profile failed", error.message, 500);
  }
};

module.exports = {
  register,
  verificationEmail,
  login,
  refreshToken,
  editProfile,
};
