require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const sequelize = require("./src/config/db/db");
const absolutePath = path.resolve(__dirname, "uploads");
const indexRoutes = require("./src/routes/index.routes");

app.use("/uploads", express.static(absolutePath));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
test();

const frontendUrls = process.env.FRONTEND_URL.replace(/[\[\]]/g, "").split(",");
const corsOptions = {
  origin: frontendUrls,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/api", cors(corsOptions), indexRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server running properly",
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
