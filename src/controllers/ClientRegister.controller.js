const clientModel=require("../models/Client/login.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function clientSignup(req,res){
    try{
        const {email,password,fullName}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const newClient=await clientModel.create({
            email,
            password:hashedPassword,
            fullName
        })
        const token=jwt.sign({id:newClient._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(201).json({message:"Client registered successfully",token})
    }catch(err){
        console.error("CLIENT SIGNUP ERROR:",err)
        res.status(500).json({message:err.message})
    }}
async function clientLogin(req,res){
    try{
        const {email,password}=req.body
        const client=await clientModel.findOne({email})
        if(!client){
            return res.status(404).json({message:"Client not found"})
        }  
        const isMatch=await bcrypt.compare(password,client.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:client._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.json({message:"Login successful",token})
        
     }catch(err){
        console.error("CLIENT LOGIN ERROR:",err)
        res.status(500).json({message:err.message})
    } }  

async function getprofile(req,res) {
        try {
            const clientId = req.user.id;
            const client = await clientModel.findById(clientId).select("-password");
            if (!client) {
                return res.status(404).json({ message: "Client not found" });
            }
            res.status(200).json({ client });
        }   
        catch (err) {
            console.error("GET PROFILE ERROR:", err);
            res.status(500).json({ message: err.message });
        }
    
}

module.exports={clientSignup,clientLogin,getprofile}