const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db/db");

const Products = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.JSON,
    },
    size: {
      type: DataTypes.JSON,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.JSON,
    },
    seller_id: {
      type: DataTypes.UUID,
    },
    category_id: {
      type: DataTypes.UUID,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    condition: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Products;
