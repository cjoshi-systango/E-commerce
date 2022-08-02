const isLogedIn = async(req:any,res:any,next:any)=>{
    console.log(req.user);
    if(req.user){
        next()
    }else{
        res.send("something wrong");
    }
}

export default isLogedIn