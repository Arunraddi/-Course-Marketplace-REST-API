const jwt=require("jsonwebtoken");
function auth(req,res,next){
    const token=req.headers.token;
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_USER_SECRET || "arun123445");
        if(decoded){
            req.userId=decoded.id;
            next();
        }else{
            res.status(403).json({
                message:"invalid token"
            })
        }
    } catch (error) {
        res.status(403).json({
            message:"invalid token"
        })
    }
}
module.exports={
    auth:auth
    
}
