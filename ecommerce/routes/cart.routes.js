
const cartController = require('../controller/cart.controller');
const{authJwt} = require('../middlewares');
const { cart } = require('../models');
module.exports = function(app){
app.post("/ecomm/api/v1/carts", [authJwt.verifyToken,cartController.create]);
app.put("/ecomm/api/v1/carts/:id", [authJwt.verifyToken], cartController.update);
app.get("/ecomm/api/v1/carts/:id", [authJwt.verifyToken], cartController.getCart);
}