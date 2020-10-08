const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'testRaulHerrera',
    password:'1997raul'
});


mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return
    }else{
        console.log('DB is online');
    }
});

module.exports = mysqlConnection;