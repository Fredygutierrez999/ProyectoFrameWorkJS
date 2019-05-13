var express = require('express');
var app = express();
var router = express.Router();


var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'usuario',  
  password : 'password',  
  database : 'midb'  
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond asasd with a resource');
});

/* GET users listing. */
router.get('/pruebas', function(req, res, next) {
  res.send('respond with a resource');
});

/*RETORN JSON CON DATOSn */
app.get('/json', function (req, res) {
  connection.connect();  
  connection.query('SELECT * FROM postres', function(err, rows, fields)   
  {  
      connection.end();
      if (err) throw err;  
      res.json(rows); 
  });
});

module.exports = router;
