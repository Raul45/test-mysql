const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticleById
} = require('../queries/articles');

module.exports={
    findAllArticles:(req,res) =>{
        getAllArticles(null,(err,results)=>{
            if(!err){
                return res.status(200).json({
                    ...results
                })
            }else{
                return res.status(400).json({
                    reason:"Bad request",
                    data: err
                })
            }
        })
    },
    findArticleById:(req,res)=>{
        let data= req.params.id;
        getArticleById(data,(err,results)=>{
            if(!err){
                return res.status(200).json({
                    results
                })
            }else{
                return res.json({
                    err
                })
            }
        })
    },
    createNewArticle:(req,res)=>{
        let data = req.body;
        createArticle(data, (err,results)=>{
            if(!err){
                res.status(200).json({
                    data:"article created successfully",
                    results
                })
            }else{
                res.json({
                    err
                })
            }
        })
    },
    updaterArticle:(req,res)=>{
        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let dataToSend = {
            id:id,
            name:name,
            description:description
        }
        updateArticle(dataToSend, (err,results)=>{
            if(!err){
                res.json({
                    data:"article updated successfully"
                })
            }else{
                res.json({
                    err
                })
            }
        })
    },
    deleteArticle:(req,res)=>{
        let data = req.params.id;
        deleteArticleById(data, (err,results)=>{
            if(!err){
                res.status(200).json({
                    data:"article removed successfully"
                })
            }else{
                res.json({
                    err
                })
            }
        })
    }
}

