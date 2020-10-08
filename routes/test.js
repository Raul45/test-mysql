const router = require("express").Router();
const {verifyToken} = require('../auth/jwt_validation');
const {
    addNewArticleToPayOrders,
    getRepeatest,
    getBetweenDates
} = require('../controllers/test');

router.post("/add-new-article-to-pay-order", verifyToken, addNewArticleToPayOrders);
router.get("/repeat", verifyToken, getRepeatest);
router.post("/between-dates", verifyToken, getBetweenDates);


module.exports=router;