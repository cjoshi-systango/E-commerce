import express from "express"
import userController from "../controllers/user";
import passport from "passport";
import validation from "../validation/validation";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/register",validation.userValidation,userController.registerUser)

router.post("/insert/userrole",auth,userController.insertUserRole);

router.post("/insert/useraddress",auth,validation.userAddressValidation,userController.addUserAddress);

router.post("/login", passport.authenticate("local", {failureMessage: true}), userController.logInUser)

router.get("/logout",auth,userController.logOutUser)

router.put("/forgetpassword",userController.forgetPassword)

router.put("/reserpassword",auth,userController.resetPassword)

export default router