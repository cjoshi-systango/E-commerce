import user from "../models/user";
import bcrypt from "bcrypt"
import userAddress from '../models/userAddress'
import userRole from '../models/userRole'
import express from "express"
import mailSender from "../utils/mail";
import CommonResponse from "../constants/commonResponsesConstants";
import cart from "../models/cart";
import { where } from "sequelize/types";

const UNAUTHORIZED = "Unauthorized activity"
const ALREADY_EXIST = "User already exist"
class UserServices {

    async registerUser(req: express.Request) {
        try {
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
            console.log(userTitle.title);
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
            let isUserAddressExist: any = await userAddress.findAll({ where: { userId: req.user.id } });
            console.log(isUserAddressExist.length);

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
            let password: string = ""
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let character = 0; character < 8; character++) {
                password += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let encryptedPassword = bcrypt.hashSync(password, 10);
            console.log(password);

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
            if (req.body.name) {
                await user.update({ name: req.body.name }, { where: { id: req.user.id } })
            } else if (req.body.email) {
                await user.update({ email: req.body.email }, { where: { id: req.user.id } })
            } else if (req.body.mobile_no) {
                await user.update({ mobile_no: req.body.mobile_no }, { where: { id: req.user.id } })
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
}

const userServices = new UserServices();
export default userServices;