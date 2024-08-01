const express = require("express");
const router = express.Router();
const usersControllers = require("../controller/users.controller");
const { upload } = require("../../../middlewares/upload");
const jwtMiddleware = require("../../../middlewares/jwt");

router.post("/auth/register", usersControllers.register);
router.get("/auth/verify/:token", usersControllers.verificationEmail);
router.post("/auth/login", usersControllers.login);
router.post("/auth/refresh-token", usersControllers.refreshToken);
router.put("/profile/:id", jwtMiddleware.authenticateJWT, upload.single("photo"), usersControllers.editProfile);
router.get("/profile/:id", jwtMiddleware.authenticateJWT, usersControllers.getDetailProfile);

module.exports = router;
