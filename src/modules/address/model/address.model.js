const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db/db");

const Address = sequelize.define(
  "address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    address_as: {
      type: DataTypes.STRING(10),
    },
    recipient_name: {
      type: DataTypes.STRING(50),
    },
    recipient_phone_number: {
      type: DataTypes.STRING(13),
    },
    full_address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING(50),
    },
    pos_code: {
      type: DataTypes.STRING(10),
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    primary_address: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
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

module.exports = Address;
