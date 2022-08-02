import * as jwt from "jsonwebtoken"
import Credentials from "../constants/credentialsConstant";
import user from "../models/user";
import {Request,Response} from "express"
import { errorMonitor } from "events";
import {HttpConstant} from '../constants/httpStatusConstant'

const auth = async(req:any,res:any,next:any)=>{
    
    console.log(req.session);
    const token=req.header('Authorization');
    let decoded:any
    
    
    if(!token){ 
        res.status(HttpConstant.HTTP_NOT_FOUND).json({success:false, message:" NO Token is provided "})
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
    catch(error){
        console.log(error);
        
        return res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false, message:"Invalid Token"})
    }
}

export default auth;