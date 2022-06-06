//this file will have all controller logic for product



const db = require('../models');
console.log(db);
const Product = db.product;
//create and save new Product
exports.create = (req, res) => {
    
//creating the product object to be stored in  db
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId
    }

    //storing the product object in db

    //promise.then(resolved).catch(err)
    console.log("we are here in product controllerfor case*****",Product);
    Product.create(product).then(response =>{
        console.log(`product: [${response} got inserted in db]`);
        res.status(201).send(response);
    }).catch(err =>{
        console.log(`product: [${err} not inserted in db]`);
        res.status(500).send({
            message: "some internal error occured while storing product data"
        })
    })
}
//update an existing product

exports.update = (req, res) =>{
    
    //creting the product object to be update in db
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    const productId =req.params.id;
    Product.update(product,{
        where:{id:productId}
    }).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured whle updating the product data"
        })
    });
};

exports.delete = (req, res) =>{
    const productId = req.params.id;
    Product.destroy({
        where:{
            id:productId
        },
        returning: true
    }).then(response =>{
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.sendStatus(500).send({
            message:"some internal error occuerd while deleting the product"
        })
    });
}

//find a product based upo the product id
exports.findOne = (req,res) =>{
    const productId = req.params.id;
    Product.findByPk(productId).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occur while fetching product based upon product"
        })
    })
}
exports.findAll = (req, res) =>{
    let productName = req.params.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where:{
                name: productName
            }
        })
    }
    else{
        promise = Product.findAll();
    }
    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "some internal error occur while fetching all product"
        })
    })
}

exports.getProductsUnderCategory = (req, res) => {
    const categoryID = req.params.categoryId;
    Product.findall({
        where: {
            categoryId: categoryID
        }
    }).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "some internal error occurred while fetching all products based upon"
        })
    })
}