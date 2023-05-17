const express = require("express")
const {connection,userModel} = require("./database")
require('dotenv').config()

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.get("/users",async(req,res)=>{
    const query = req.query
    console.log(query) // this is an object like { city : 'pune' }
    try{
        const users = await userModel.find(query)
        res.send(users)
    }
    catch(err){
        res.send({"msg":"cannot get the users","error":err})
    }
})

app.post("/register",async(req,res)=>{
    try{
        console.log(req.body)
        const user_object = new userModel(req.body)
        await user_object.save()
        res.send({"msg":"users will be registered"})
    }
    catch(err){
        res.send({"msg":"cannot register","error":err})
    }
})

app.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
        await userModel.findByIdAndUpdate({_id:ID},payload)
        res.send("user is updated")
    }
    catch(err){
        res.send(err)
    }
})


app.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    
    try{
        await userModel.findByIdAndDelete({_id:ID})
        res.send("user is deleted")
    }
    catch(err){
        res.send(err)
    }
})



//when I should connect my database to server
//at the time when server is running
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")  
    }
    catch(error){
        console.log("can not connected to db")
        console.log("error is:",error)
    }
   console.log(` server is running at port ${process.env.port}`)
})