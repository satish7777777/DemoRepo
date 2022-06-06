const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const db = require("../models");

//virify the token
verifyToken =(req,res,next) =>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(400).send({
            messsage: "No token provided"
        });
    }
    jwt.verify(token, config.secret,(err, decoded) =>{
        if(err){
            return res.status(401).send({
                messsage: 'Unauthorized'
            });
        }


        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req,res, next) =>{
    db.user.findByPk(req.userId).then(user => {
        user.getRoles().then(roles =>{
            for(let i = 0; i<roles.length; i++){
                if(roles[i]==="admin"){
                    next();
                    return;
                }
            }
            res.status(400).send({
                message: "requireadmin role"
            });
            return;
        });
    });
}

const authJwt = {verifyToken, isAdmin};
module.exports = authJwt;