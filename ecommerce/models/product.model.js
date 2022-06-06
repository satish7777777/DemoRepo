module.exports = (sequelize, Sequelize) =>{

    //const { Sequelize } = require(".");
    const Product = sequelize.define("product", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'product'
    });
    return Product;
}