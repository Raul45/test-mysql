const router = require("express").Router();
const {verifyToken} = require('../auth/jwt_validation');
const {
    findAllArticles,
    findArticleById,
    createNewArticle,
    updaterArticle,
    deleteArticle
} = require('../controllers/articles');

router.get("/", verifyToken, findAllArticles);
router.get("/:id", verifyToken,findArticleById);
router.post("/", verifyToken, createNewArticle);
router.post("/:id", verifyToken, updaterArticle);
router.delete("/:id", verifyToken, deleteArticle);


module.exports=router;