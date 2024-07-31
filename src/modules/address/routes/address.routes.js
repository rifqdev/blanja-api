const express = require("express");
const router = express.Router();
const addressControllers = require("../controller/address.controller");

router.post("/", addressControllers.addAddress);
router.put("/:id", addressControllers.editAddress);
router.put("/primary/:id", addressControllers.setPrimaryAddress);
router.get("/", addressControllers.listAddress);

module.exports = router;
