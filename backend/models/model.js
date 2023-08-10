import mongoose from "mongoose";


//User Model Schema

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    height: Number
})

const UserModel = mongoose.model("users",userSchema)
export default UserModel;