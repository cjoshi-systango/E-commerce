import * as jwt from "jsonwebtoken"
import Credentials from "../constants/credentialsConstant";
import user from "../models/user";
import { HttpConstant } from '../constants/httpStatusConstant'
import axios from "axios";
import CommonResponse from "../constants/commonResponsesConstants";
const auth = async (req: any, res: any, next: any) => {

    const accessToken = req.header("AccessToken")
    if (accessToken) {
        let url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        let response = await axios({
            url: url,
            method:"get"
        })
        let googleId = response.data.user_id;
        req.user = await user.findOne({where:{google_id:googleId,deletedAt: null}});
        return req.user ? next() : res.status(HttpConstant.HTTP_NOT_FOUND).json({ success: false, message:"Account deleted"})
    }
    else {
        console.log(req.session);
        const token = req.header('Authorization');
        let decoded: any
        if (!token) {
            res.status(HttpConstant.HTTP_NOT_FOUND).json({ success: false, message: " NO Token is provided " })
            return
        }

        try {
            decoded = jwt.verify(token, process.env.TOKEN_KEY || Credentials.TOKEN_KEY)
            console.log(decoded);

            req.user = await user.findOne({ where: { id: decoded.userId, deletedAt: null } });
            console.log(req.user);

            return req.user ? next() : res.status(HttpConstant.HTTP_NOT_FOUND).json({ success: false, message: "Account deleted" })
            
        }
        catch (error) {
            return res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, message: CommonResponse.SOMETHING_WENT_WRONG })
        }
    }


}

export default auth;