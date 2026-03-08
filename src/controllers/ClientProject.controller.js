const Project = require("../models/Client/Projects.model")
const Milestone = require("../models/Client/Milestone.model")


async function getallproject(req,res){
    try{
        const projects=await Project.find({client:req.user.id}).populate("milestones")
        res.status(200).json({projects})

    }
    catch(err){ 
        console.error("GET ALL PROJECTS ERROR:",err)
        res.status(500).json({message:err.message})
    }}
async function getprojectbyid(req,res){
    try{
        const {projectId}=req.params
        const project=await Project.findOne({_id:projectId,client:req.user.id}).populate("milestones")
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }   
        res.status(200).json({project})
    }   catch(err){
        console.error("GET PROJECT BY ID ERROR:",err)
        res.status(500).json({message:err.message})
    }}
async function createProject(req,res){
    try{
        const {title,category,description,scope,budget}=req.body
        const clientId=req.user.id
        const newProject=await Project.create({
            client:clientId,
            title,
            category,
            description,
            scope,
            budget
        })
        res.status(201).json({message:"Project created successfully",project:newProject})
    }catch(err){
        console.error("CREATE PROJECT ERROR:",err)
        res.status(500).json({message:err.message})                                                 
}}
async function addMilestone(req,res){
    try{
        const {projectId}=req.params
        const {title,description,amount,dueDate}=req.body
        const newMilestone=await Milestone.create({
            project:projectId,
            title,
            description,
            amount,
            dueDate
        })
        res.status(201).json({message:"Milestone added successfully",milestone:newMilestone})
    }catch(err){
        console.error("ADD MILESTONE ERROR:",err)
        res.status(500).json({message:err.message})
    }
}
module.exports={createProject,addMilestone,getallproject,getprojectbyid}