import userServices from '../services/userService';
import CommonResponse from '../constants/commonResponsesConstants';
import express from "express"
import passport from 'passport';
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
            let roleInserted =  await userServices.insertUserRole(req);
            if(typeof roleInserted == "string"){
                res.status(200).json({success:true,message:roleInserted})
            }
            else{
                res.status(200).json({success:true,data:"insert successfully"})
            }
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

    async logInUser(req:express.Request,res:express.Response,next:express.NextFunction){
        try {
            console.log(req.user)
            
            if(typeof req.user == "string")
            {
                res.status(200).json({ success: true, message: req.user })
            }
            else{
                console.log(req.user);
                res.status(200).json({ success: true, data: "loged in" })
            }
        } catch (error) {
            res.status(500).json({ success: false, error:error});
            
        }

       
    }

    async authenticate(req:express.Request,res:express.Response,next:express.NextFunction){
        await passport.authenticate("local", {failureMessage: true})(req,res,next);
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

    async resetPassword(req:express.Request,res:express.Response){
        try {
            let isResetDone = await userServices.resetPassword(req);
            if(typeof isResetDone == 'string'){
                res.status(200).json({ success: true, message:isResetDone});

            }
            else{
                res.status(200).json({ success: true, message:"check your mail"});
            }
            
        } catch (error) {
            res.status(500).json({ success: false, error:error});
            
        }
    }

    async updateUserDetails(req:express.Request,res:express.Response){
        try {
            await userServices.updateUserDetails(req);
            res.status(200).json({ success: true, message:"updated successfully"});
        } catch (error) {
            res.status(500).json({ success: false, error:error});
        }
    }
}

const userController = new UserController();
export default userController;
