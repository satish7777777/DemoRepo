//const { response } = require('express');
//const { category } = require('../models');

const db = require('../models');
const Category = db.category;
//create and save new file
exports.create = (req, res) => {
   

    const category = {
        name: req.body.name,
        description: req.body.description
    }

    //storing the category object in db

    //promise.then(resolved).catch(err)

    Category.create(category).then(response =>{
        console.log(`category: [${response} got inserted in db]`);
        res.status(201).send(response);
    }).catch(err =>{
        console.log(`category: [${err} not inserted in db]`);
        res.status(500).send({
            message: "some internal error occured while storing data"
        })
    })
}
//update an existing category

exports.update = (req, res) =>{
    
    //creting the category object to be update in db
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const categoryId =req.params.id;
    Category.update(category,{
        where:{id:categoryId}
    }).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occured whle updating the category data"
        })
    });
};

exports.delete = (req, res) =>{
    const categoryId = req.params.id;
    Category.destroy({
        where:{
            id:categoryId
        },
    }).then(response =>{
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.sendStatus(500).send({
            message:"some internal error occuerd while deleting the category"
        })
    });
}

//find a category based upo the categoey id
exports.findOne = (req,res) =>{
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message:"some internal error occur while fetching category based upon category"
        })
    })
}
exports.findAll = (req, res) =>{
    let categoryName = req.params.name;
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where:{
                name: categoryName
            }
        })
    }
    else{
        promise = Category.findAll();
    }
    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send({
            message: "some internal error occur while fetching all caegories"
        })
    })
}