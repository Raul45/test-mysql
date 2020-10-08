const router = require("express").Router();
const {verifyToken} = require('../auth/jwt_validation');
const {
    getAllArticles,
    getOrdersById,
    createPayOrder,
    updateOrder,
    deletePayOrder

} = require('../controllers/pay-orders');

router.get("/", verifyToken, getAllArticles);
router.get("/:id", verifyToken, getOrdersById);
router.post("/", verifyToken, createPayOrder);
router.post("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deletePayOrder);


module.exports=router;