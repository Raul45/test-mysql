const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

module.exports={
    findAllPayOrders:(data,callback) => {
    mysqlConnection.query('SELECT * FROM pay_order',(err,rows, fields)=>{
        if(!err){
            return callback(null,rows)
        }else{
            callback(err)
        }
    })
},
findOrdersById:(data,callback) => {
    let id = data;
    mysqlConnection.query('SELECT * FROM pay_order WHERE id = ?',[id],(err,rows, fields)=>{
        if(!err){
           return callback(null,rows)
        }else{
           callback(err)
        }
    })
},

createNewOrder:(data,callback)=>{
    const {name,description,date } = data;
    let newObject = {
        name:name,
        description: description,
        date:date
    }
    mysqlConnection.query('INSERT INTO pay_order SET ?',newObject,(err,rows,fields)=>{
        if(!err){
            callback(null,rows)
        }else{
            callback(err)
        }
    })
},


updateOrderById:(data,callback)=>{
    let id = data.id;
    const {name,description,date} = data;
    mysqlConnection.query('UPDATE pay_order SET name = ?, description = ?, date =? WHERE id = ?',[name,description,date,id],(err,rows,fields)=>{
        if(!err){
           return callback(null,rows)
        }else{
            callback(err)
        }
    })
},

deleter:(data,callback)=>{
    let id = data;
    mysqlConnection.query('DELETE FROM pay_order WHERE id =?',[id],(err,rows,fields)=>{
        if(!err){
           return callback(null, rows)
        }else{
            callback(err);
        }
    })
}

}