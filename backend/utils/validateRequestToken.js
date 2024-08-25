import { errorHandler } from "./errorHandler.js"
import jwt from 'jsonwebtoken'


export const validateRequestToken = async(req, res, next) => {

    let token 
    try {

        token = req.cookies.token
        console.log("token", token)

        if(!token) {
            return next(errorHandler(401, "no token provided"))
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY)

        console.log('decoded token: ', decodedUser)

        //check if the token is expired
        const currentTimeInSec = Math.floor(Date.now() / 1000)
        if(decodedUser && decodedUser.exp < currentTimeInSec){
            return next(errorHandler(401, "token expired"))
        }


        req.user = decodedUser

        //proceed to next middleware
        next()

        
    } catch (error) {
        return next(errorHandler(401, "Token is not valid", token))
        
    }
}