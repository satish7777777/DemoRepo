
const productController = require('../controller/product.controller');
const {requestvalidator , authJwt} = require('../middlewares');

module.exports = function(app){
    //route for post request to create the category
    app.post("/ecomm/api/v1/products",[requestvalidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.create)

    //route for -- request to update the category
    app.put("/ecomm/api/v1/products/:id",[requestvalidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.update)
    //route for --- request to delete the category
    app.delete("/ecomm/api/v1/products/:id",[authJwt.verifyToken, authJwt.isAdmin],productController.delete)

    //route for ---- GET request to get the category based on id
    app.get("/ecomm/api/v1/products/:id",productController.findOne)

    //route for ---GET request to get all category based on id
    app.get("/ecomm/api/v1/products",productController.findAll)

    //route for ---GET request to get all category based on id
    app.get("/ecomm/api/v1/categories/:categoryId/products", productController.getProductsUnderCategory)
}
