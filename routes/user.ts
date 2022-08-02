import express from "express"
import userController from "../controllers/user";
import passport from "passport";
import validation from "../validation/validation";
import auth from "../middleware/auth";
import isLogedIn from "../middleware/googleAuth";
const router = express.Router();

router.post("/",validation.userValidation,userController.registerUser)

router.post("/userrole",auth,validation.userRoleValidation,userController.insertUserRole);

router.post("/useraddress",auth,validation.userAddressValidation,userController.addUserAddress);

router.post("/login",validation.loginValidation,userController.logInUser)

router.get("/logout",auth,userController.logOutUser)

router.put("/forgetpassword",validation.forgetPasswordValidation,userController.forgetPassword)

router.put("/resetpassword",auth,validation.resetPasswordValidation,userController.resetPassword)

router.patch("/",auth,userController.updateUserDetails)

router.get("/auth/google",passport.authenticate("google",{scope:['email','profile']}));

router.get("/auth/google/callback",passport.authenticate("google"),userController.googleLogin);

// router.de
export default router