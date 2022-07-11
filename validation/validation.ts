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
});

const validationForAddProduct = joi.object({
    name: joi.string().min(3).max(25).trim(true).required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    details: joi.string().min(3).max(50).trim(true).required()
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
		};
	
		const { error } = validationForUserAddress.validate(userAddress);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};

	async addProductValidation (req:any, res:any, next:any){
		const productData = {
			name: req.body.name,
			details: req.body.details,
			quantity: req.body.quantity,
			price: req.body.price,
		};
	
		const { error } = validationForAddProduct.validate(productData);
		if (error) {
			return res.status(400).json({success:false,data:error});
		} else {
			next();
		}
	};
}

let validation = new Validation

export default validation;