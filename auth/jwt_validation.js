const {verify} = require('jsonwebtoken');

module.exports={
    verifyToken:(req,res,next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7)
            verify(token, "100kpasos",(err,decoded)=>{
                if(err){
                    res.json({
                        message:"invalid Token"
                    })
                    return;
                }else{
                    next();
                }
            })
        }else{
            res.json({
                message:"Unauthorized token"
            })
        }
    }
}