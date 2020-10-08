const {
    userCreate, getUserByUsername
}  = require('../queries/users');
const { sign } = require("jsonwebtoken");
const {hashSync, genSaltSync, compareSync} = require('bcrypt');

module.exports={
    userCreates:(req,res) =>{
        if (!req.body.username || !req.body.password) {
            res.json({
                "message": "All fields are required"
            })
            return;
        }
        if(req.body.password.length > 8){
            res.json({
                "alert":"Password length can't be more than 8 caracters"
            })
            return;
        }
        const { username, password } = req.body;
        const salt = genSaltSync(10);
        const newPassword = hashSync(password, salt);
        const newObject = {
            username: username,
            password: newPassword
        }
        userCreate(newObject,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    reason: "Bad request"
                })
            }else{
                return res.status(200).json({
                    data: "User created successfully"
                })
            }
        })        
    },
    userLogin:(req,res) =>{
        if (!req.body.username || !req.body.password) {
            res.json({
                "message": "All fields are required"
            })
            return;
        }
        const {username,password} = req.body;
        console.log(req.body)
        getUserByUsername(username,(err,results)=>{
            if(err){
                return res.status(400).json({
                    reason: "Bad request"
                })
            }
            console.log("--------")
            console.log(results)
            const result = compareSync(password, results[0].password)
            if(result){
                const jsontoken = sign({result:results},"100kpasos",{
                    expiresIn:'1h'
                });
                return res.status(200).json(
                    {
                        message: "login successfully",
                        token: jsontoken
                    }
                );
            }else{
                return res.status(403).json({
                    message:"Invalid credentials"
                })
            }
            
        })        
    }
}