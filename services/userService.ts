import user from "../models/user";
import bcrypt from "bcrypt"
import userAddress from '../models/userAddress'
import userRole from '../models/userRole'
import express from "express"
import mailSender from "../utils/mail";
import CommonResponse from "../constants/commonResponsesConstants";
import cart from "../models/cart";

const UNAUTHORIZED = "Unauthorized activity"
const ALREADY_EXIST = "User already exist"
const USER_NOT_FOUND = "User not found"

class UserServices {

    async registerUser(req: express.Request) {
        try {
            // register user if not already exist
            let userExist = await user.findOne({ where: { email: req.body.email } })
            if (userExist === null) {
                let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
                let userRoleId: number = 0
                await userRole.findOne({ where: { title: req.body.title } })
                    .then(async (userRole: any) => {
                        console.log(userRole.id);
                        userRoleId = userRole.id
                    })
                let insertData: any = await user.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: encryptedPassword,
                    mobile_no: req.body.mobile_no,
                    userRoleId: userRoleId
                })
                return insertData;
            }
            else {
                return ALREADY_EXIST;
            }

        } catch (error) {
            throw error
        }
    }

    async insertUserRole(req: any) {
        try {
            let userTitle: any = await userRole.findOne({ attributes: ["title"], where: { id: req.user.userRoleId } })
            if (userTitle.title == "Admin") {
                await userRole.create({
                    title: req.body.title,
                    read: req.body.read,
                    write: req.body.write,
                    delete: req.body.delete
                });
            }
            else {
                return UNAUTHORIZED;
            }
        } catch (error) {
            throw error
        }
    }


    async addUserAddress(req: any) {
        try {
            // insert user address if that type of address does not exist
            let isUserAddressExist: any = await userAddress.findAll({ where: { userId: req.user.id } });
    
            if (isUserAddressExist.length > 0) {
                for (let index = 0; index < isUserAddressExist.length; index++) {
                    if (isUserAddressExist[index].address_type === req.body.address_type) {
                        return `${isUserAddressExist[index].address_type} Address Already Exist`;
                    }
                    else {
                        await userAddress.create({
                            userId: req.user.id,
                            address_line1: req.body.addressLine1,
                            address_line2: req.body.addressLine2,
                            city: req.body.city,
                            country: req.body.country,
                            pincode: req.body.pincode,
                            address_type: req.body.address_type
                        })
                    }
                }

            }
            else {
                await userAddress.create({
                    userId: req.user.id,
                    address_line1: req.body.addressLine1,
                    address_line2: req.body.addressLine2,
                    city: req.body.city,
                    country: req.body.country,
                    pincode: req.body.pincode,
                    address_type: req.body.address_type
                })
            }


        } catch (error) {
            throw error
        }
    }

    async findUserAddress(req: any) {
        try {
            let addressOfUser = await userAddress.findOne({ where: { userId: req.user.id } });

            return addressOfUser;

        } catch (error) {
            throw error
        }
    }

    async forgetPassword(req: express.Request) {
        try {
            // set new random password and then send it in mail if user forget password
            let password: string = ""
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let character = 0; character < 8; character++) {
                password += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let encryptedPassword = bcrypt.hashSync(password, 10);
            await user.update({ password: encryptedPassword }, { where: { email: req.body.email } })
                .then(() => {
                    mailSender.sendMail("chetanjoshi7568@gmail.com", password);
                })
        } catch (error) {
            throw error
        }

    }

    async resetPassword(req: any) {
        try {
            // reset user password to new
            let userpassword: any = await user.findOne({ attributes: ['password'], where: { id: req.user.id } })

            let passwordcheck = bcrypt.compareSync(req.body.oldpassword, userpassword.password);

            if (passwordcheck) {
                let encryptedPassword = bcrypt.hashSync(req.body.newpassword, 10);
                await user.update({ password: encryptedPassword }, { where: { id: req.user.id } })
            }
            else {
                return CommonResponse.INCORRECT_PASSWORD
            }

        } catch (error) {
            throw error
        }
    }

    async updateUserDetails(req: any) {
        try {
            // update user details
            let isUserExist:any = await user.findOne({where:{id:req.user.id}})
            let isUserAdderessExist:any = await userAddress.findOne({where:{userId:req.user.id}})
            console.log(req.body);
            
            if(isUserExist){
                if (req.body.name) {
                    await user.update({ name: req.body.name }, { where: { id: req.user.id } })
                } else if (req.body.email) {
                    await user.update({ email: req.body.email }, { where: { id: req.user.id } })
                } else if (req.body.mobile_no) {
                    await user.update({ mobile_no: req.body.mobile_no }, { where: { id: req.user.id } })
                } 
                if(isUserAdderessExist){
                    if (req.body.addressLine1) {
                        await userAddress.update({ address_line1: req.body.addressLine1 }, {where:{userId:req.user.id}})
                    } else if (req.body.addressLine2) {
                        await userAddress.update({ address_line2: req.body.addressLine2 }, {where:{userId:req.user.id}})
                    } else if (req.body.city) {
                        await userAddress.update({ city: req.body.city }, {where:{userId:req.user.id}})
                    } else if (req.body.country) {
                        await userAddress.update({ country: req.body.country }, {where:{userId:req.user.id}})
                    } else if (req.body.pincode) {
                        await userAddress.update({ pincode: req.body.pincode }, {where:{userId:req.user.id}})
                    } else if (req.body.addressType) {
                        await userAddress.update({ address_type: req.body.addressType }, {where:{userId:req.user.id}})
                    }
                }
                else{
                    return USER_NOT_FOUND
                }
            }
            else{
                return USER_NOT_FOUND
            }
        } catch (error) {
            throw error
        }
    }

    async deleteUser(req: any) {
        try {
            let deleteTime = new Date();
            await user.update({ deletedAt: deleteTime }, { where: { id: 1 } })
            await userAddress.destroy({ where: { userId: req.user.id } })
            await cart.destroy({ where: { userId: req.user.id } })

        } catch (error) {
            throw error
        }
    }

    async getUserDetails(req: any) {
        try {
            let userData = await user.findOne({ where: { id: req.user.id },include: userAddress})
            return userData
        } catch (error) {
            throw error
        }
    }
}

const userServices = new UserServices();
export default userServices;