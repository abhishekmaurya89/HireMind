import jwt from 'jsonwebtoken'

const authMiddleware=(req,res)=>{
    const token=req.header.authorization;
    if(!token){
        res.status(404).json("Login Required");
    }
    try {
        const check=jwt.verify(token,process.env.JWT_SECRET);
        if(check)
            next();
    } catch (error) {
        res.status(404).json("Could not verify user")
    }
}