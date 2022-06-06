const db = require('../models');

//create and save a new cart

exports.create = (req, res) => {
    const cartObj = {
        userId : req.userId //it will be provded by the middleware
    }
    db.cart.create(cartObj).then(cart =>{
        res.status(201).send(cart);
    }).catch(err =>{
        res.status(500).send({
            message: "Some internal server error occured"
        })
    })
}


exports.update = (req,res) => {
    const cardId = req.params.id;

    db.cart.findByPk(cardId).then(cart => {
        console.log(cart);
        console.log("***********product IDS*******", req.body.productIds)
        db.product.findAll({
            where: {
                id: req.body.productIds
            }
        }).then(productList => {
            if(!productList){
                res.status(400).send({
                    message: "added products doesn't exists "
                })
                return;
            }
            cart.setProducts(productList).then(() =>{

                
            })
        })
    })
}

//get aall the cart items based on cartId

exports.getCart = (req, res) =>{
    const cartId = req.params.id;
    db.cart.findByPk(cartId).then(cart =>{
        if(!cart){
            res.status(400).send({
                message: "cart doesn't exists"
            });
            return;
        }
        let selecteProducts = [];
                let totalCost = 0;
                cart.getProducts().then(products =>{
                    for(let i= 0; i<products.length; i++){
                        totalCost = totalCost + products[i].price;
                        selecteProducts.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].price
                        });
                    }
                    res.status(200).send({
                        id : cart.id,
                        selecteProducts : selecteProducts,
                        cost : totalCost
                    })
                })
    })
}