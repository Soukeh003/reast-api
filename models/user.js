const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: String,
    pasword: String,
})

const Users = mongoose.model("User", UserSchema)

module.exports = Users