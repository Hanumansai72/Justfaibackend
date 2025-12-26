const jwt=require("jsonwebtoken")

function verifytoken(req,res,next)
{
    const authheader=req.header.authorization;

    if(!authheader||!authheader.startwith("Bearer")){
        return res.status(401).json({
            message:"Token not found"
        })

    }
    const token=authheader.split("")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()


    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }


}
module.exports=verifytoken;