const { category } = require("../models");

const validateCategoryRequest = (req, res, next) => {
     //validate the request
     
     if(!req.body.name){
         res.status(400).send({
             message: "Name of the category cannot be empty"
         })
         return;
     }
     next();
}
const validateProductRequest = (req, res, next) => {
    //validate the request
    
    if(!req.body.name || !req.body.price){
        res.status(400).send({
            message: "Name and price of the product cannot be empty"
        })
        return;
    }
    else{
        if(req.body.categoryId){//if category id previous
            //validate if that is a valid categoryId
            category.findByPk(req.body.categoryId).then(response =>{
                if(!response){
                    console.log("***we are here in request validator for product request for case*****",Product);
                    res.status(400).send({
                        message: `CategoryId passed is not valid :${req.body.categoryId}`
                    })
                    return;
                }
                else{
                    if(!req.body.price || req.body.price <= 0){
                        res.status(400).send({
                            message: "Price does't seem to be placed"
                        })
                        return;
                    }else{
                        next();
                    }
                }
            })
        }else{//if category id is not provided
            res.status(400).send({
                message: "categoryId of a product can't be empty"
            })
        }
    }
    
    
    next();
}

const validateCategoryInRequestParams= (req, res, next) => {
    const categoryId = req.params.categoryId;

    if(categoryId){//user have provided some category id
        //validae category id
        category.findByPk(categoryId).then(response =>{
            if(!response){
                res.status(400).send({
                    message: `categoryId passed is not valid: ${categoryId}`
                })
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message: 'Some internal error occurred'
            })
        })
    }
}

module.exports = {validateCategoryRequest, validateProductRequest};



