import * as jwt from "jsonwebtoken"
import Credentials from "../constants/credentialsConstant";
import user from "../models/user";

const auth = async(req:any,res:any,next:any)=>{

    const token=req.session.passport.user
    let decoded:any

    if(!token) return res.sendStatus(400).json({success:false, data:" NO Token is provided "})
    
    try
    {
        decoded = jwt.verify(token, process.env.TOKEN_KEY||Credentials.TOKEN_KEY)
        console.log(decoded);
        
        req.user = await user.findOne({where:{id:decoded.userId}});
        console.log(req.user);
        
        next()
    }
    catch{
        return res.sendStatus(400).json({success:false, data:"Invalid Token"})
    }
}

export default auth;