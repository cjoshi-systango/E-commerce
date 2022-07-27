import express from "express"
import userController from "../controllers/user";
import passport from "passport";
import validation from "../validation/validation";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/register",userController.registerUser)

router.post("/insert/userrole",auth,validation.userRoleValidation,userController.insertUserRole);

router.post("/insert/useraddress",auth,validation.userAddressValidation,userController.addUserAddress);

router.post("/login",validation.loginValidation,userController.authenticate)

router.post("/login",validation.loginValidation,userController.logInUser)

router.get("/logout",auth,userController.logOutUser)

router.put("/forgetpassword",validation.forgetPasswordValidation,userController.forgetPassword)

router.put("/resetpassword",auth,validation.resetPasswordValidation,userController.resetPassword)

router.patch("/update/userdetails",auth,userController.updateUserDetails)

export default router