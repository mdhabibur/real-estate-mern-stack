import jwt from 'jsonwebtoken'

export const generateToken = async (payload) => {

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY)

    return token

}