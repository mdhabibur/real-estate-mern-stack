import User from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcrypt from 'bcryptjs'


export const updateUserProfile = async (req, res, next) => {
	const { username, email, password, avatar } = req.body;

    console.log("req body:", req.body)
    console.log("req.user from client cookie: ", req.user)

    const userIdFromParams = req.params.id

	try {
		//check if the user already exists

        const user = await User.findById(userIdFromParams)

        if(req.user.userId !== userIdFromParams){
            //means user id of signed in user is not equal to the userId who requested
            return next(errorHandler(401, 'you are not allowed to update other profile'))
        }

        let userToUpdate = {}

        if(username) userToUpdate.username = username
        if(email) userToUpdate.email = email
        if(avatar) userToUpdate.avatar = avatar
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10)
            userToUpdate.password = hashedPassword
        }


        const updatedUser = await User.findByIdAndUpdate(userIdFromParams, {$set: userToUpdate}, {new: true, runValidators: true})


		if(!updatedUser){
            return next(errorHandler(400, 'User profile can not be found or updated'))

		}

        let updatedUserWithoutPassword
        if(updatedUser){
            const {password, ...rest} = updatedUser._doc
            updatedUserWithoutPassword = rest
        }


		return res.status(200).send({
			message: "user profile update successful",
			user: user,
            reqUser: req.user,
            userIdFromParams,
            singedInUserId:req.user.userId,
            updatedUser: updatedUserWithoutPassword
		});



	} catch (error) {
		console.log("error: ", error);
		return next(errorHandler(500, "profile update failed BE"));
	}
};

export const signOutUser = async (req, res, next) => {

    try {
        res.clearCookie("token", {
            httpOnly: true
        })

        return res.status(200).send({
			message: "user signed out successfully",
			user: {},

		});
        
    } catch (error) {
        console.log("sign out error: ", error)
        return next(errorHandler(500, "error in signing out BE"))
        
    }
}


export const deleteUserProfile = async (req, res, next) => {

    const userIdFromParams = req.params.id

    try {
        if(req.user.userId !== userIdFromParams){
            return next(errorHandler(401, "you are only allowed to delete your own account"))
        }

        const deletedUser = await User.findByIdAndDelete(userIdFromParams)

        if(!deletedUser){
            return next(errorHandler(500, "failed to found or delete the user"))
        }

        res.clearCookie('token', {
            httpOnly: true
        })

        return res.status(200).send({
			message: "user profile deleted successfully",
			user: deletedUser,

		});

        
    } catch (error) {
        console.log("profile delete error: ", error)
        return next(errorHandler(500, "error in deleting user profile BE"))
        
    }

}