

import express from "express"
import mongoose from "mongoose"
import {SignupSchema} from "common/types"
import { UserModel } from "db/frontend"
mongoose.connect(process.env.MONGO_URL !)
const app = express()
app.use(express.json())

app.post("/Signup", async (req,res) => {
    const {sucess, data} = SignupSchema.safeParse(req.body);
    if(!sucess){
        res.status(403).json({
            message : "Incorrect Inputs"
        })
        return 
    }
    try {
        await UserModel.create({
            username :data.username,
            password : data.password
        })
    }catch(e){
        res.status(411).json({
            message : "Username Already Exists"
        })
    }
   
})

app.post("/Login", (req,res) => {

})
app.post("/workflow", (req,res) => {

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



















  