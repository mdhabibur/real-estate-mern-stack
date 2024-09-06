import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import userProfileRouter from './routes/userProfileRouter.js'
import userListingRouter from './routes/userListingRouter.js'
import cookieParser from 'cookie-parser'
import path from 'path'

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
// app.get("/", (req, res) => {
//     res.send("server running...")
// })



//api
app.use('/api/user/auth', authRouter)
app.use('/api/user/profile', userProfileRouter)
app.use('/api/user/listing', userListingRouter)

//for production 
if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve() //get current directory location
    app.use(express.static(path.join(__dirname, '/client/dist'))) //serving static production build 'dist' folder for frontend

    //for any route other that /api route, serve the static files from frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist','index.html'))

    })



}

//so that means the backend index.js is mainly doing everything as server. on render it will have a domain name. and when the domain's normal routes other than api routes are hit, it will serve the 'static' frontend files.and when the '/api/...' routes are hit, it will handle the endpoint api call by controllers.



//error handling middleware
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

//start the server
const port = process.env.PORT || 5000
 //render will automatically put a port in the PORT env variable 
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
