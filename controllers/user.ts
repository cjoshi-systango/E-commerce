import userServices from '../services/userService';
import CommonResponse from '../constants/commonResponsesConstants';
class UserController {
    async registerUser(req: any, res: any) {
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

    async insertUserRole(req:any,res:any){
        try {
            await userServices.insertUserRole(req);
            res.status(200).json({success:true,data:"insert successfully"})
        } catch (error) {
            res.status(400).json({success:false,data:error})
            
        }     
    }

    async addUserAddress(req:any,res:any){
        try {
            await userServices.addUserAddress(req);
            res.status(200).json({success:true,data:"insert successfully"})

            
        } catch (error) {
            res.status(200).json({success:true,data:error})
            
        }
    }

    logInUser(req:any,res:any){
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

    logOutUser(req:any,res:any){
        req.session.destroy();
        res.redirect("/login")
    }
    
}

const userController = new UserController();
export default userController;
