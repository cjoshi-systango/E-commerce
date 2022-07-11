import cartServices from "../services/cart";

class CartController{
    async addToCart(req:any,res:any){
        try {
            let result =  await cartServices.addToCart(req);
            if(result === "out of stock"){
                res.status(400).json({success:false,data:"Can't add in Cart Out of stock"})
            }
            else if(result === "quantity error")
            {
                res.status(400).json({success:false,data:"Can't add more than Stock"})
            }
            else{
                res.status(200).json({success:false,data:"added succesfully"});
            }
        } catch (error) {
            res.status(500).json({success:false,data:error});
            
        }
    }
}

let cartController = new CartController();
export default cartController;