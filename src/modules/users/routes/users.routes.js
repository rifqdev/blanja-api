const express = require("express");
const router = express.Router();
const usersControllers = require("../controller/users.controller");
const { upload } = require("../../../middlewares/upload");

router.post("/auth/register", usersControllers.register);
router.get("/auth/verify/:token", usersControllers.verificationEmail);
router.post("/auth/login", usersControllers.login);
router.post("/auth/refresh-token", usersControllers.refreshToken);
router.put("/profile/:id", upload.single("photo"), usersControllers.editProfile);

module.exports = router;
