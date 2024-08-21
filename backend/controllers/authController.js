import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt  from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
	const { username, email, password } = req.body;


    console.log("req body:", req.body)

	try {
		//check if the user already exists
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return  next(errorHandler(400, "user already exists", existingUser)) 
		}

		//hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		//create a new user
		const newUser = new User({ username, email, password: hashedPassword });
		const newSavedUser = await newUser.save();
		return res.status(201).send({
			newSavedUser,
			message: "user registration successful",
		});
	} catch (error) {
		console.log("error: ", error);
		return next(errorHandler(500, "user registration failed BE"));
	}
};


export const signIn = async (req, res, next) => {
	const {  email, password } = req.body;


    console.log("req body:", req.body)

	try {
		//check if the user already exists
		const user = await User.findOne({ email: email });
		if (!user) {
			return  next(errorHandler(400, "Invalid email or password")) 
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if(!isMatch){
			return next(errorHandler(400, "Invalid email or password"))
		}


		//jwt payload
		const payload = {
			userId: user._id,
			email: user.email
		}


	
		let currentUser

		if(user){
			const {password, ...rest} = user._doc
			console.log("without password: ", rest)
			currentUser = rest
		}


		//sign the token
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})

		//set the token in a http only cookie
		res.cookie('token', token, {httpOnly: true})

		return res.status(200).send({
			message: "user login successful",
			user: currentUser,
		});



	} catch (error) {
		console.log("error: ", error);
		return next(errorHandler(500, "login failed BE"));
	}
};


