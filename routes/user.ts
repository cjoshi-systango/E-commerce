import express from "express"
import userController from "../controllers/user";
import passport from "passport";
import validation from "../validation/validation";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/",validation.userValidation,userController.registerUser)

router.post("/userrole",auth,validation.userRoleValidation,userController.insertUserRole);

router.post("/useraddress",auth,validation.userAddressValidation,userController.addUserAddress);

router.post("/login",validation.loginValidation,userController.logInUser)

router.get("/logout",auth,userController.logOutUser)

router.put("/forgetpassword",validation.forgetPasswordValidation,userController.forgetPassword)

router.put("/resetpassword",auth,validation.resetPasswordValidation,userController.resetPassword)

router.patch("/",auth,userController.updateUserDetails)

router.get("/auth/google",passport.authenticate("google", {scope: ["profile","email",],prompt: "consent"}));

router.get("/auth/google/callback",userController.googleLogin);

router.delete("/",auth,userController.deleteUser)

router.get("/",auth,userController.getUserDetails)

export default router
