import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

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
		return next(errorHandler(500, error));
	}
};

