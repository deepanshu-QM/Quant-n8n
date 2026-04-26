

import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware";
import "dotenv/config";
import {SigninSchema, SignupSchema, CreateWorkFlowSchema } from "common/types"
import { UserModel, workflowModel } from "db/frontend"

/*import dotenv from "dotenv";
dotenv.config(); */
mongoose.connect(process.env.MONGO_URL !)
const JWT_SECRET = process.env.JWT_SECRET !
const app = express()
app.use(express.json())

//SignUp End Points : 
app.post("/Signup",async (req,res) => {
    const parsed = SignupSchema.safeParse(req.body);
    if(!parsed.success){
        res.status(403).json({
            message : "Incorrect Inputs"
        })
        return 
    }
    const data = parsed.data
    try {
        const user = await UserModel.create({
            username :data.username,
            password : data.password
        })

        res.json({
            id :user._id,
        })  

    }catch(e){
        res.status(411).json({                                
            message : "Username Already Exists"
        })
    }
   
})


//Signin End Point :
app.post("/Login" ,async (req,res) => {
    const parsed =  SigninSchema.safeParse(req.body);
    if(!parsed.success){
        res.status(403).json({
            message : "Incorrect Input"
        })
        return
    }
    const data = parsed.data
    try {
        const user = await UserModel.findOne({
            username : data.username,
            password : data.password
        })
        if(user){
            const token = jwt.sign({
                id : user._id
             },JWT_SECRET)

             res.json({
                id : user._id,
                token
             })
            }else {
            res.status(403).json({
                message : "Your Credentials are Incorrect"
            })
        }
    }catch(e){
        res.status(411).json({
            message : "User Already Exists"
        })
    }
})


app.post("/workflow",authMiddleware,async (req,res) => {
    const userId = req.userId;
    const parsed = CreateWorkFlowSchema.safeParse(req.body)
    if(!parsed.success){
        res.status(403).json({
            message : "Incorrect Input"
        })
        return
    }
    const data = parsed.data
    try {
        const workflow = await workflowModel.create({
            userId,
            nodes:data.nodes,
            edges :data.edges
        })
        res.json({
            id : workflow._id
        })

    }catch(e){
        res.status(411).json({
            message : "Failed to Create WorkFlow"
        })
    }
})

app.put("/workflow" , (req,res) => {

})

app.get("/workflow/:workflowId", (req,res)=> {

})

app.get("/workflow/executions/:workflowId",(req,res) => {

})

app.post("/credentials", (req,res)=> {

})

app.get("/credentials",(req,res) => {
    
})
app.listen(process.env.PORT || 3001)



















  