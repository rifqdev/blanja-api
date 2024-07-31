const Users = require("../../modules/users/model/users.model");
const Products = require("../../modules/products/model/products.model");
const Categories = require("../../modules/categories/model/model-category");
const Cart = require("../../modules/cart/model/cart.model");

Users.hasMany(Products, { foreignKey: "seller_id" });
Products.belongsTo(Users, { foreignKey: "seller_id" });

Products.belongsTo(Categories, { foreignKey: "category_id" });
Categories.hasMany(Products, { foreignKey: "category_id" });

Cart.belongsTo(Products, { foreignKey: "product_id" });
Products.hasMany(Cart, { foreignKey: "product_id" });

Users.hasMany(Cart, { foreignKey: "custommer_id" });
Cart.belongsTo(Users, { foreignKey: "custommer_id" });

module.exports = { Users, Products, Categories, Cart };
