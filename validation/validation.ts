import joi from "joi";

const validationForUser = joi.object({
    fullname: joi.string().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    mobile_no: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    title: joi.string().valid("Admin","User","Seller").required()
.default([]),
   isActive: joi.boolean().default(true)
});

const validationForUserAddress = joi.object({
    addressLine1: joi.string().min(3).max(50).trim(true).required(),
    addressLine2: joi.string().min(3).max(50).trim(true),
    city: joi.string().min(3).max(25).trim(true).required(),
    country: joi.string().min(3).max(25).trim(true).required(),
    pincode: joi.number().required(),
    address_type: joi.string().trim(true).valid("Primary","Secondry").required(),

});

const validationForAddProduct = joi.object({
    name: joi.string().min(3).max(25).trim(true).required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    details: joi.string().min(3).max(50).trim(true).required(),
	image: joi.string().pattern(/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif)$/)
});

const validationForAddToCart = joi.object({
    quantity: joi.number().required(),
});

const validationForOrder = joi.object({
    quantity: joi.number().required(),
});

const validationForUserRole = joi.object({
    title: joi.string().trim(true).required().valid("Admin","User","Seller"),
	read: joi.boolean().required(),
	write: joi.boolean().required(),
	delete: joi.boolean().required()
});

const validationForForgetPassword = joi.object({
    email: joi.string().trim(true).required(),
});

const validationForResetPassword = joi.object({
    oldPassword: joi.string().trim(true).required(),
    newPassword: joi.string().trim(true).required(),
});

const validationForLogin = joi.object({
    email: joi.string().trim(true).required(),
    password: joi.string().trim(true).required(),
});

class Validation{
	async userValidation (req:any, res:any, next:any){
		
		const userData = {
			fullname: req.body.fullname,
			email: req.body.email,
			password: req.body.password,
			mobile_no: req.body.mobile_no,
			title:req.body.title,
		};
	
		const { error } = validationForUser.validate(userData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async userAddressValidation (req:any, res:any, next:any){
		const userAddress = {
			addressLine1: req.body.addressLine1,
			addressLine2: req.body.addressLine2,
			city: req.body.city,
			country: req.body.country,
			pincode: req.body.pincode,
			address_type: req.body.address_type,
		};
	
		const { error } = validationForUserAddress.validate(userAddress);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async addProductValidation (req:any, res:any, next:any){
		let images = req.files
		let nunberOfImages = images.length
		let productData
		for (let index = 0; index < nunberOfImages; index++) {
			productData = {
				name: req.body.name,
				details: req.body.details,
				quantity: req.body.quantity,
				price: req.body.price,
				image: images[index].originalname
			};	
		}
		
		console.log(req.files);
		
		const { error } = validationForAddProduct.validate(productData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};
	async addToCartValidation (req:any, res:any, next:any){
		const cartData = {
			quantity: req.body.quantity,
		};
	
		const { error } = validationForAddToCart.validate(cartData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async orderValidation (req:any, res:any, next:any){
		const orderData = {
			quantity: req.body.quantity,
		};
	
		const { error } = validationForOrder.validate(orderData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async userRoleValidation (req:any, res:any, next:any){
		const userRoleData = {
			title:req.body.title,
			read: req.body.read,
			write: req.body.write,
			delete: req.body.delete
		};
	
		const { error } = validationForUserRole.validate(userRoleData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async loginValidation (req:any, res:any, next:any){

		const loginData = {
			email: req.body.email,
			password: req.body.password
		};
	
		const { error } = validationForLogin.validate(loginData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};
	async forgetPasswordValidation (req:any, res:any, next:any){
		const forgetPasswordData = {
			email: req.body.email,
		};
	
		const { error } = validationForForgetPassword.validate(forgetPasswordData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async resetPasswordValidation (req:any, res:any, next:any){
		const resetPasswordData = {
			oldPassword: req.body.oldPassword,
			newPassword: req.body.newPassword,
		};
	
		const { error } = validationForResetPassword.validate(resetPasswordData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};
}

let validation = new Validation

export default validation;