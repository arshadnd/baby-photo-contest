const mysql = require('mysql2');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'context'


  


});

module.exports=con;