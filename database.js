const mongoose = require("mongoose")
require('dotenv').config()

// const main = async ()=>{
     const connection = mongoose.connect(process.env.mongoURL)
    //   console.log("connected to database")

// }


const userSchema = mongoose.Schema({
    first_name : {type:String,required:true},
    last_name : {type:String,required:true},
    mobile_number : {type:Number,required:true},
    address : {type:String,required:true},
})

const userModel = mongoose.model("user",userSchema)

module.exports={
    connection,
    userModel
}