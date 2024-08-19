import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

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




//define a test route
app.get("/", (req, res) => {
    res.send("server running...")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})