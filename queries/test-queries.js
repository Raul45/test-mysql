const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

module.exports={
    addArticle:(data,callback)=>{
        const {order_id,article_id} = data;
        let newObject = {
            order_id,
            article_id
        }
        mysqlConnection.query('INSERT INTO pay_article_relation SET ?',newObject,(err,rows,fields)=>{
            if(!err){
                callback(null,rows)
            }else{
                callback(err)
            }
        })
    },
    getTwoMostRepeat:(data,callback)=>{
        mysqlConnection.query('select article_id, COUNT(article_id) AS MOST_FREQUENT from pay_article_relation GROUP BY article_id ORDER BY COUNT(article_id) DESC LIMIT 2',(err,rows,fields)=>{
            if(!err){
                callback(null,rows);
            }else{
                callback(err);
            }
        })
    },
    getDateInverval:(data,callback)=>{
        let date1 = data.date1;
        let date2 = data.date2;
        mysqlConnection.query('select * from pay_order where date>= ? and date<=?',[date1,date2],(err,rows,fields)=>{
            if(!err){
                return callback(null,rows);
            }else{
                callback(err)
            }
        })
    }
}