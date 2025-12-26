const ratelimiter=require("express-rate-limit")

module.exports=ratelimiter({
    windowMs:15*60*1000,
    max:100,
    message:{
        message:"Maximum limit completed"
    }
})