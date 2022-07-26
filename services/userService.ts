import user from "../models/user";
import bcrypt from "bcrypt"
import userAddress from '../models/userAddress'
import userRole from '../models/userRole'
import express from "express"
import mailSender from "../utils/mail";
import CommonResponse from "../constants/commonResponsesConstants";
class UserServices {
    async registerUser(req: express.Request) {
        let userExist = await user.findOne({ where: { email: req.body.email } })
        if (userExist === null) {
            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
            let userRoleId: number = 0
            await userRole.findOne({ where: { title: req.body.title } })
                .then(async (userRole: any) => {
                    console.log(userRole.id);
                    userRoleId = userRole.id
                })
            console.log(userRoleId);

            let insertData: any = await user.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: encryptedPassword,
                mobile_no: req.body.mobile_no,
                userRoleId: userRoleId
            })
            console.log(insertData.id);
            return insertData;
        }
        else{
            return "User already exist";
        }


    }

    async insertUserRole(req:any){
        let userTitle:any = await userRole.findOne({attributes:["title"],where:{id:req.user.userRoleId}})
        console.log(userTitle.title);
        if(userTitle.title == "Admin"){
            await userRole.create({title:req.body.title,
                read:req.body.read,
                write:req.body.write,
                delete:req.body.delete
            });
        }
        else{
            return "Only admin can create userrole";
        }
        
    }
    

    async addUserAddress(req:any){
        
        
        await userAddress.create({
            userId:req.user.id,
            address_line1:req.body.addressLine1,
            address_line2:req.body.addressLine2,
            city:req.body.city,
            country:req.body.country,
            pincode:req.body.pincode // primary or secondary and work or home 
        })
        
        
    }

    async findUserAddress(req:any){        
        let addressOfUser = await userAddress.findOne({where:{userId:req.user.id}});

        return addressOfUser;
    
    }

    async forgetPassword(req:express.Request){
        let password:string=""
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let character = 0; character < 8; character++ ) {
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        let encryptedPassword = bcrypt.hashSync(password, 10);
        console.log(password);
        
        await user.update({password:encryptedPassword},{where:{email:req.body.email}})
        .then(()=>{
            mailSender.sendMail("chetanjoshi7568@gmail.com",password);
        })
    }

    async resetPassword(req:any){

        let userpassword:any = await user.findOne({attributes:['password'],where:{id:req.user.id}})

        let passwordcheck = bcrypt.compareSync(req.body.oldpassword,userpassword.password);

        if(passwordcheck){
            let encryptedPassword = bcrypt.hashSync(req.body.newpassword, 10);
            await user.update({password:encryptedPassword},{where:{id:req.user.id}})
        }
        else{
            return "Invalid user password"
        }
        
    }

    async updateUserDetails(req:any){
        try {
            if(req.body.name){
                await user.update({name:req.body.name},{where:{id:req.user.id}})
            }else if(req.body.email){
                await user.update({email:req.body.email},{where:{id:req.user.id}})
            }else if(req.body.mobile_no){
                await user.update({mobile_no:req.body.mobile_no},{where:{id:req.user.id}})
            }
        } catch (error) {
            return CommonResponse.SOMETHING_WENT_WRONG
        }
    }
}

const userServices = new UserServices();
export default userServices;