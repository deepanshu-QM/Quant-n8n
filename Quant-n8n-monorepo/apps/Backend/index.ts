

import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware";
import "dotenv/config";
import {SigninSchema, SignupSchema, CreateWorkFlowSchema ,UpdateWorkflowSchema} from "common/types"
import { ExecutionModel, NodesModel, UserModel, workflowModel } from "db/frontend"

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

/* WorkFlow End Poin  */
app.post("/create-workflow",authMiddleware,async (req,res) => {
    const userId = req.userId;
    console.log(userId)
    const parsed = CreateWorkFlowSchema.safeParse(req.body)
    if(!parsed.success){
        res.status(403).json({
            message : "Incorrect Input"
        })
        return
    }
    const {nodes,edges} = parsed.data        /* First Bug Resolve Here */
    try {
        const workflow = await workflowModel.create({
            userId,
            nodes,
            edges,
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

//Update End Points are here : 

app.put("/create-workflow/:workflowId" , authMiddleware,async(req,res) => {
    const userId = req.userId;
    const {workflowId} = req.params
    const parsed = UpdateWorkflowSchema.safeParse(req.body)
    if(!parsed.success){
        res.status(403).json({
            message : "Incorrect Inputs"
        })
        return
    }
    const {nodes, edges} = parsed.data

    try {
        const workflow = await workflowModel.findOneAndUpdate(
            {_id :workflowId , userId},              /* First it Filter (find) /first argument */
            {nodes , edges},     /* here it updates */
            {new : true}          /* return true after update */
        )
        if (!workflow) {
            res.status(404).json({ message: "Workflow not found" })
            return
        }

        res.json({
            id: workflow._id,
        })
    }catch(e){
        res.status(500).json({ message: "Failed to Update Workflow" })
    }
 })


//getting the data of Nodes and Edges :
app.get("/create-workflow/:workflowId", authMiddleware,async(req,res)=> {
    const workflow = await workflowModel.findById(
        req.params.workflowId
    )                                                                   /*  { _id: req.params.workflowId, userId: req.userId  }*/
    if(!workflow || workflow.userId.toString() !== req.userId){
        res.status(404).json({
            message : "WorkFlow not Found"
        })
        return
    }
    res.json(workflow)
})

//Finding all WorkFlow by Get request 
app.get("/workflow" , authMiddleware, async(req,res) => {
    const workflow = await workflowModel.find({
        userId : req.userId
    })
    res.json(workflow)
})

app.get("/create-workflow/executions/:workflowId",authMiddleware,async(req,res) => {
    const executions = await ExecutionModel.find({
        workflowId : req.params.workflowId
    })
    res.json({
        executions
    })
})

app.get("/nodes", async(req,res) => {
    const nodes = await NodesModel.find();
    res.json(nodes)
})

app.listen(process.env.PORT || 3001)



















  