import { json } from 'express';
import jwt from 'jsonwebtoken';


export   function verifytoken  (req,res,next){


    try{

const auth  = req.headers.authorization;
if(!auth){
    return res.send(json({message:"accepted"}));
    
}
const token  = auth.split(" ")[1];

jwt.verify(token,(err,user)=>{
    if(err) return res.status(403).json({msg:"invalid token"});
    req.user = user;
    next();

})
}

catch(err)
    {
res.send(json({message:"error"}));

    }
}