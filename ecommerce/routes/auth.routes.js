const controller = require('../controller/auth.controller');
const {verifySignUp} = require('../middlewares');


module.exports = function(app){
    // app.use(function(res, res, next){
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Orignal,Content-Type, Accept"
    //     )
    //     next();
    // })
    app.post("/ecomm/api/v1/auth/signup",[verifySignUp.checkDuplicateUsernameorEmail, verifySignUp.checkRolesExists], controller.signup);
    app.post("/ecomm/api/v1/auth/signin", controller.signin);
}