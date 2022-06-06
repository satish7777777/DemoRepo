const express = require("express");
const app = express();
const serverConfig = require('./config/server.config.js');
const db = require("./models");//it wil automatic get model/index.js
const bodyParser = require('body-parser');
//const { ROLES } = require("./models");
//const { category, product } = require("./models");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function init(){
    db.role.create({
        id: 1,
        name:db.ROLES[0]
    })
    db.role.create({
        id: 2,
        name:db.ROLES[1]
    })
    var categoriesData =[
        {name: "Electronics",
        description: "This category contains electronic items"},
        {name: "Vegetables",
        description: "This category contains vegetable items"},
        {name: "study",
        description: "This category contains study items"},
    ]
    var productsData = [
        {name: "samsung",
        price: 1000},
    ]

    db.category.bulkCreate(categoriesData).then(() =>{
        console.log("category table is initialized with category data");
    }).catch((err)=>{
        console.log("Error in initializing categories table",err);
    })

    db.product.bulkCreate(productsData).then(() =>{
        console.log("category table is initialized with product data");
    }).catch((err)=>{
        console.log("Error in initializing categories table",err);
    })
}

//Set the One to many relationship between Category and Product
db.category.hasMany(db.product);
db.sequelize.sync({force:true}).then(()=>{
    //authticate
    //drop all tables
    //recreated all tables
    console.log("models/tables are dropped and recreated");
    init();
})
require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);
app.listen(process.env.PORT || serverConfig.PORT, () =>{
    console.log("my server is working");
});