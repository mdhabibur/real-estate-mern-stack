import User from "../models/User.js"
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {

    const {username, email, password} = req.body

    try {

        //check if the user already exists
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            return res.status(400).send({
                message: "user already exists",
                existingUser: existingUser
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create a new user
        const newUser = new User({username, email, password: hashedPassword})
        const newSavedUser = await newUser.save()
        return res.status(201).send({
            newSavedUser,
            message: 'user registration successful'
        })
        
    } catch (error) {

        console.log("error: ", error)
        return res.status(500).send({
            message: "user registration failed",
            error: error
        })
        
    }



}
