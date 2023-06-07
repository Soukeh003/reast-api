const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path : "./config/.env"})

const Users = require("./models/user")
const router = express.Router()

const app = express()
app.use("/api",router)
router.use(express.json())

// Get all Users
// http://localhost:5000/api/user
router.get("/user", async (req, res) => {
    try{
        const users = await Users.find()
        res.status(200).json({message: "User find", data: user})
    }catch (error) {
        res.status(404).json({Error: error})
    }
})

// post all Users
// http://localhost:5000/api/user
router.post("/user/new", async (req, res) => {
    try{
        const {email, password} = req.body
        const newUser = new Users({email, password})
        const user  = await newUser.save()
        res.status(200).json({message: "User created", data: user})
    }catch (error) {
        res.status(404).json({Error: error})
    }
})

// update all Users
// http://localhost:5000/api/user/update/:id
router.put("/user/update/:id", async(req, res) => {
    const {id} = req.params
    const {email, password} = req.body
    try{
        await Users.findByIdAndUpdate({_id: id}, {$set:{email: email, password: password}})
        res.status(200).send({message: "user updated"})
    }catch (error) {
        res.status(404).send({message: "server error"})
        console.log(error)
    }
})

// delete all Users
// http://localhost:5000/api/user/update/:id
router.delete("/user/update/:id", async(req, res) => {
    const {id} = req.params
    try{
        await Users.findByIdAndDelete(id)
        res.status(200).send({message: "user deleted"})
    }catch (error) {
        res.status(404).send({message: "server error"})
        console.log(error)
    }
})


connectDB

const PORT = process.env.PORT

app.listen(PORT, (err) =>{
    err ? console.log(err)
        : console.log(`Server running on port ${PORT}`)
})
