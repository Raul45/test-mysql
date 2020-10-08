const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

module.exports={
    userCreate: (data,callback) =>{
        mysqlConnection.query('INSERT INTO users SET?', data, (err, rows, fields) => {
            if (!err) {
              return callback(null,rows);
            } else {
                callback(err);
                }
        })
    },

getUserByUsername:(data,callback) => {
   
    mysqlConnection.query('SELECT * FROM users WHERE username=?', [data], (err, rows, fields) => {
        if (!err) {
            return callback(null,rows);

        }else{
            callback(err)
        }
    })
}}