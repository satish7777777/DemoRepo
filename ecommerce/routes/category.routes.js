
const categoryController = require('../controller/category.controller');
const {requestvalidator, authJwt} = require('../middlewares');
module.exports = function(app){
    //route for post request to create the category
app.post("/ecomm/api/v1/categories",[requestvalidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin],categoryController.create)

//route for -- request to update the category
app.put("/ecomm/api/v1/categories/:id",[requestvalidator.validateCategoryRequest],categoryController.update)
//route for --- request to delete the category
app.delete("/ecomm/api/v1/categories/:id",[authJwt.verifyToken, authJwt.isAdmin],categoryController.delete)

//route for ---- GET request to get the category based on id
app.get("/ecomm/api/v1/categories/:id",categoryController.findOne)

//route for ---GET request to get all category based on id
app.get("/ecomm/api/v1/categories",categoryController.findAll)
}
