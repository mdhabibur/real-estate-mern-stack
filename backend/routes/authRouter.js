import express from 'express'
import { signUp, signIn, googleAuthSign} from '../controllers/authController.js'


const router = express.Router()


router.post('/signup', signUp)
router.post('/signin', signIn)

router.post('/google-auth-sign', googleAuthSign)



export default router

