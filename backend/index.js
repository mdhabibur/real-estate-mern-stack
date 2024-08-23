import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import userProfileRouter from './routes/userProfileRouter.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config() //load environment variables

//connect to mongo db
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to mongo db successfully")
})
.catch((error) => {
    console.log("error connecting to mongo db", error)
})


//some middlewares
app.use(cors()) //to enable cross origin request
app.use(express.json()) //to parse json data request

//for parsing cookie
app.use(cookieParser())




//define a test route
app.get("/", (req, res) => {
    res.send("server running...")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})


//api
app.use('/api/user/auth', authRouter)
app.use('/api/user/profile', userProfileRouter)


app.use((err, req, res, next) => {

    const status = err?.status || 500
    const errorMsg = err?.error?.errorResponse?.errmsg || "error msg"
    const error = err?.error || "something went wrong"
    const otherInfo = err?.otherInfo || "other info"

    return res.status(status).send({
        success: false,
        status,
        errorMsg,
        error,
        otherInfo

    })

})