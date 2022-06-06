const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');
const env = "development";
const dbSettings = dbConfig[env];
const sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.username,
    dbSettings.password,
    dbSettings.dialectInformation);

const db ={Sequelize, sequelize};// or (const db ={Sequelize, sequelize})
db.category = require('./category.model')(sequelize, Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.cart = require('./cart.model')(sequelize, Sequelize);

//relation between user and roles
db.role.belongsToMany(db.user,{
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through:"user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
//db.ROLES = ["user", "admin"];

db.ROLES = ["customer", "admin"];

//relationship between cartt and user : 1 user hass many carts

db.user.hasMany(db.cart);

//relationship between cartt and user :Many- to - Many

db.product.belongsToMany(db.cart,{
    through: "cart_products",
    foreignKey: "productId",
    otherKey: "cartId"
});

db.cart.belongsToMany(db.product,{
    through: "cart_products",
    foreignKey: "cartId",
    otherKey: "productId"
});

module.exports = db;