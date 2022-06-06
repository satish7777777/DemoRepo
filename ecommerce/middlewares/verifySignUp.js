const db = require("../models")



const checkDuplicateUsernameorEmail = (req, res, next) =>{
    db.user.findOne({
        where:{
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Username already exist"
            })
            return;
        }
        //if user not present already, then validate for email
        db.user.findOne({
            where:{
                email: req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message: "email already exist"
                })
                return;
            }
            next();
        })
    })
}

const checkRolesExists = async (req, res,next) =>{
    if(req.body.roles){
        //iteraate through role provided
        
        for(let i=0; i< req.body.roles.length; i++){
            let roleIncluded = await db.ROLES.includes(req.body.roles[i]);
            if(!roleIncluded){
                res.status(400).send({
                    message: "Roles doesnot exists" + req.body.roles[i]
                })
                return;
                
            }
        }
    }
    next();
}
const verifySignUp = {checkDuplicateUsernameorEmail, checkRolesExists};
module.exports = verifySignUp;