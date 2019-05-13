var express = require('express');
var router = express.Router();

var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'db4free.net',  
  user     : 'fgutierrezv1',  
  password : 'fgutierrezv1',  
  database : 'basedatosweb',
  port:'3306'
});


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*RETORN JSON CON DATOSn */
router.get('/', function(req, res, next) {
  //
  connection.connect();  
  connection.query('SELECT * FROM Usuario', function(err, rows, fields)   
  {  
      connection.end();
      if (err) throw err;  
      res.json(rows); 
  });
});


/*RETORN JSON CON DATOSn */
router.get('/validarUsuario', function(req, res, next) {
  var _strError = "";
  req.query.usuario = req.query.usuario == null?"":req.query.usuario;
  req.query.clave = req.query.clave == null?"":req.query.clave;
  if(req.query.usuario.trim() == "" ){
    _strError = "Debe ingresar un usuario";
  }
  if(req.query.clave.trim() == ""){
    _strError = "Debe ingresar una clave";
  }
  if(_strError == ""){
    
    res.header('content-type', 'application/json; charset=utf-8');
    connection.connect();  
    connection.query("SELECT * FROM Usuario WHERE Usuario='" + req.query.usuario + "' AND Clave='" + req.query.clave + "'", 
    function(err, rows, fields)   
    {
        connection.end();
        if(rows.length == 0){
          res.json({Proceso:false});
        }else{
          res.json({Proceso:true});
        }
    }
    );
  }else{
    res.json({Proceso:false});
  }
});


/*RETORN JSON CON DATOSn */
router.get('/insertaNuevoUsuario', function(req, res, next) {
  connection.connect();  
  connection.query("SELECT * FROM Usuario WHERE Usuario='" + req.query.usuario + "'", 
  function(err, rows, fields)   
  {  
      if(rows.length == 0){
        var _sqlInserta = "INSERT INTO Usuario('Usuario', 'Clave', 'NombresApellidos', 'Aceptaterminos', 'FechaCreacion')";
        _sqlInserta += "VALUES('"+req.query.usuario+"', '"+req.query.clave+"', '"+req.query.nombreapellidos+"', '"+req.query.Aceptaterminos + "', now())";
        connection.query(_sqlInserta, 
          function(err, rows, fields)   
          {  
            res.json({Proceso:true});
          }
        );
      }else{
        res.json({Proceso:false});
      }
  }
  );
  connection.end();

});

module.exports = router;