import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config() //load environment variables


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