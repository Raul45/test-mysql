const router = require("express").Router();
const {verifyToken} = require('../auth/jwt_validation');
const {userCreates, userLogin} = require('../controllers/users');

router.post("/signup", userCreates);
router.post("/login",userLogin)


module.exports=router;