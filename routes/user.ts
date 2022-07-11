import express from "express"
import userController from "../controllers/user";
import passport from "passport";
import validation from "../validation/validation";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/register",validation.userValidation,userController.registerUser)

router.post("/insert/userrole",userController.insertUserRole);

router.post("/insert/useraddress",auth,validation.userAddressValidation,userController.addUserAddress);

router.post("/login", passport.authenticate("local", {failureMessage: true}), userController.logInUser)

router.get("/logout",userController.logOutUser)

export default router