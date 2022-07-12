import * as jwt from "jsonwebtoken"
import Credentials from "../constants/credentialsConstant";
import user from "../models/user";

const auth = async(req:any,res:any,next:any)=>{
    
    if(req.session.passport == undefined){
        res.status(400).json({success:false, message:" please login first "}); 
        return
    } 
    const token=req.session.passport.user
    let decoded:any

    if(!token){ 
        res.status(400).json({success:false, message:" NO Token is provided "})
        return
    } 
    
    try
    {
        decoded = jwt.verify(token, process.env.TOKEN_KEY||Credentials.TOKEN_KEY)
        console.log(decoded);
        
        req.user = await user.findOne({where:{id:decoded.userId}});
        console.log(req.user);
        
        next()
    }
    catch{
        return res.status(400).json({success:false, message:"Invalid Token"})
    }
}

export default auth;