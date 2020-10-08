const {
    addArticle,
    getTwoMostRepeat,
    getDateInverval
} = require('../queries/test-queries');


module.exports={
    addNewArticleToPayOrders:(req,res)=>{
        const{article_id, order_id} = req.body;
        let data = {
            order_id,
            article_id
        }
        console.log("controlelr")
        console.log(data)
        addArticle(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    ...results
                })
            }else{
                return res.status(400).json({
                   message:"The id of the order not exist's or something goes wrong, please try again"
                })
            }
        })
    },
    getRepeatest:(req,res)=>{
      
        getTwoMostRepeat(null,(err,results)=>{
            if(!err){
                res.status(200).json({
                    data:"2 most repeat articles ID",
                    ...results
                })
            }else{
                res.status(400).json({
                    err
                })
            }
        })
    },
    getBetweenDates:(req,res)=>{
        let {date1,date2} = req.body;
        let data ={
            date1,date2
        }
        getDateInverval(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    ...results
                })
            }else{
                res.status(400).json({
                    err
                })
            }
        })
    }   
}