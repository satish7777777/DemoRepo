const Models = require('../../../../models');
const User = Models.user;
const Role = Models.role;
const authController = require('../../../../controller/auth.controller');
const {mockRequest, mockResponse} = require('../../interperter');
const newUser = require('../../mockData/newUser.json');
const newUserWithoutRole = require('../../mockData/newUserWithoutRole.json');
//const newUserWithInvalidRole = require('../../mockData/newUserWithInvalidRole.json');

/**
 * Test for signup method
 * 
 * 1.1 Successful signup when user provides the role
 * 1.2 Successful signup when user doesn't provide the role
 * 
 * 2 Failed signup when user provided the wrong role(i.e. the role dosn't exists)
 */

let req, res;
beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})

describe("Test for signup method of auth controller", () =>{

    it("Successful signup when user provides the role", async()=>{
        req.body = newUser;
        const resFromCreate = {
            setRoles:async() => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(() => Promise.resolve());

        await authController.signup(req, res);//we need to wait for signup function

        //validate if the test is passing successfully or not

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();
        console.log(res.status);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message: "user registered successfully!"});
    });

    it("Successful signup when user doesn't provide any role", async()=>{
        req.body = newUserWithoutRole;
        const resFromCreate = {
            setRoles:async() => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(() => Promise.resolve());

        await authController.signup(req, res);//we need to wait for signup function

        //validate if the test is passing successfully or not

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();
        console.log(res.status);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message: "user registered successfully!"});

    });

    // it("Failed signup when user provided the wrong role", async() =>{
    //     req.body = newUserWithInvalidRole;
    //     const resFromCreate = {
    //         setRoles:async() => Promise.resolve()
    //     }
    //     const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve(resFromCreate));
    //     const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(() => Promise.resolve());

    //     await authController.signup(req, res);//we need to wait for signup function

    //     //validate if the test is passing successfully or not

    //     await expect(spyOnCreate).toHaveBeenCalled();
    //     await expect(spyOnFindAll).toHaveBeenCalled();
    //     await expect(User.create).toHaveBeenCalled();
    //     await expect(Role.findAll).toHaveBeenCalled();
    //     console.log(res.status);
    //     expect(res.status).toHaveBeenCalled();
        
    //     expect(res.status).toHaveBeenCalledWith(201);
    //     expect(res.send).toHaveBeenCalledWith({message: "Role doesn't exists"});
    // })
})