import userServices from '../services/userService';
import CommonResponse from '../constants/commonResponsesConstants';
import express from "express"
class UserController {
    async registerUser(req:express.Request,res:express.Response) {
        try {
            let registerUser = await userServices.registerUser(req)
            if(registerUser === CommonResponse.USER_ALREADY_EXSIST)
            {
                res.status(200).json({ success: true, data: CommonResponse.USER_ALREADY_EXSIST })

            }else{
                res.status(200).json({ success: true, data: CommonResponse.DATA_INSERTED })

            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: true, data: CommonResponse.SOMETHING_WENT_WRONG })
        }
    }

    async insertUserRole(req:express.Request,res:express.Response){
        try {
            await userServices.insertUserRole(req);
            res.status(200).json({success:true,data:"insert successfully"})
        } catch (error) {
            res.status(400).json({success:false,data:error})
            
        }     
    }

    async addUserAddress(req:express.Request,res:express.Response){
        try {
            await userServices.addUserAddress(req);
            res.status(200).json({success:true,data:"insert successfully"})

            
        } catch (error) {
            res.status(200).json({success:true,data:error})
            
        }
    }

    logInUser(req:express.Request,res:express.Response){
        if(req.user == "incorrect password")
        {
            res.status(400).json({ success: false, data: "incorrect password" })

        }
        else if(req.user == "something wrong")
        {
            res.status(200).json({ success: true, data: "wrong email" })

        }
        else{
            console.log(req.user);
            res.status(200).json({ success: true, data: "loged in" })
        }
    }

    logOutUser(req:express.Request,res:express.Response){
        req.session.destroy((err)=>{
            res.status(500).json({ success: false, error: err })
        });
        res.redirect("/login")
    }
    
    async forgetPassword(req:express.Request,res:express.Response){
        try {
            await userServices.forgetPassword(req);
            res.status(200).json({ success: true, message:"check your mail"});
            
        } catch (error) {
            res.status(500).json({ success: false, error:error});
            
        }
    }
}

const userController = new UserController();
export default userController;
