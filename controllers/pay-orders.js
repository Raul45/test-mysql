const {
    findAllPayOrders,
    findOrdersById,
    createNewOrder,
    updateOrderById,
    deleter
} = require('../queries/pay-orders');


module.exports={
    getAllArticles:(req,res)=>{
        findAllPayOrders(null,(err,results)=>{
            if(!err){
                return res.status(200).json({
                    ...results
                })
            }else{
                return res.status(400).json({
                    data:"bad request"
                })
            }
        })
    },
    getOrdersById:(req,res)=>{
        let data = req.params.id;
        console.log(data)
        findOrdersById(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    results
                });
            }else{
                res.status(400).json({
                    message:"Bad request"
                })
            }
        })

    },
    createPayOrder:(req,res)=>{
        const {name,description,date} = req.body;
        const data ={
            name:name,
            description: description,
            date:date
        }
        createNewOrder(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    data:"Order created successfully",
                    results
                })
            }else{
                res.status(400).json({
                    err
                })
            }
    })
},
    updateOrder:(req,res)=>{
        let id = req.params.id;
        let {name,description,date} = req.body;
        let data ={
            id:id,
            name:name,
            description:description,
            date:date
        }
        updateOrderById(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    message:"order updated successfully",
                    results
                })
            }else{
                res.status(400).json({
                    err
                })
            }
    })
},
    deletePayOrder:(req,res)=>{
        let data = req.params.id;
        deleter(data,(err,results)=>{
            if(!err){
                res.status(200).json({
                    message:"order deleted successfully"
                })
            }else{
                res.status(400).json({
                    err
                })
            }
    })
    } 
}