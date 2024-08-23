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
        req.user = decodedUser

        //proceed to next middleware
        next()

        
    } catch (error) {
        return next(errorHandler(401, "Token is not valid", token))
        
    }
}