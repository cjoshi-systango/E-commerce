import user from "../models/user";
import bcrypt from "bcrypt"
import userAddress from '../models/userAddress'
import userRole from '../models/userRole'



class UserServices {
    async registerUser(req: any) {
        let userExist = await user.findOne({ where: { email: req.body.email } })

        if (userExist === null) {
            let password = Math.floor(100000 + Math.random() * 900000)
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
        await userRole.create({title:req.body.title,
            read:req.body.read,
            write:req.body.write,
            delete:req.body.delete
        });
    }

    async addUserAddress(req:any){
        await userAddress.create({
            userId:req.user.id,
            address_line1:req.body.addressLine1,
            address_line2:req.body.addressLine2,
            city:req.body.city,
            country:req.body.country,
            pincode:req.body.pincode
        })
    }

}

const userServices = new UserServices();
export default userServices;