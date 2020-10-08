const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const verifyToken = require('../auth/jwt_validation');

module.exports = {

    getAllArticles: (data, callback) => {
        mysqlConnection.query('SELECT * FROM articles', (err, rows, fields) => {
            if (!err) {
                return callback(null, rows);
            } else {
                console.log(err)
            }
        })
    },
getArticleById: (data, callback) => {
        let id = data;
        mysqlConnection.query('SELECT * FROM articles WHERE id = ?', [id], (err, rows, fields) => {
            if (!err) {
                return callback(null, rows);
            } else {
                callback(err)
            }
        })
    },

createArticle: (data, callback) => {
        const { name, description } = data;
        let newObject = {
            name: name,
            description: description
        }
        mysqlConnection.query('INSERT INTO articles SET ?', newObject, (err, rows, fields) => {
            if (!err) {
                return callback(null, rows);
            } else {
                callback(err);
            }
        })
    }
,

updateArticle: (data, callback) => {
        let id = data.id;
        const { name, description } = data;
        mysqlConnection.query('UPDATE articles SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, rows, fields) => {
            if (!err) {
                return callback(null, rows)
            } else {
                callback(err);
            }
        })
    },

deleteArticleById: (data, callback) => {
        let id = data;
        mysqlConnection.query('DELETE FROM articles WHERE id =?', [id], (err, rows, fields) => {
            if (!err) {
                callback(null, rows)
            } else {
                callback(err)
            }
        })
    }

}