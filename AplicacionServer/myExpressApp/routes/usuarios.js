var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/**
 * Creación de la conexión
 */
var connection = mysql.createConnection({
  connectionLimit: 10,
  acquireTimeout: 30000, //30 secs
  host: 'db4free.net',
  user: 'fgutierrezv1',
  password: 'fgutierrezv1',
  database: 'basedatosweb',
  port: '3306'
});

/**
 * Adiciona permisos a la cabecera de la respuesta de la peticón
 */
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Función utilziada para validar la existencia del usuario
 * @param {Usuario a validar} Usuario 
 * @param {Funcion llamada al ejecutar el proceso} callback 
 */
function validarExistencia(req, res, callback) {
  connection.query('SELECT * FROM Usuario WHERE Usuario = ?', [req.query.Usuario], function (err, result) {
    if (err)
      callback(err, res, req, null);
    else
      callback(null, res, req, result);
  });
}

/**
 * Función utilziada para validar la existencia del usuario
 * @param {Usuario a validar} Usuario 
 * @param {Funcion llamada al ejecutar el proceso} callback 
 */
function insertaUsuario(req, res, callback) {
  connection.query("INSERT INTO Usuario(Usuario,Clave,NombresApellidos,Aceptaterminos,FechaCreacion) VALUES(?,?,?,?,NOW())",
    [req.query.Usuario, req.query.Clave, req.query.NombresApellidos, (req.query.AceptaTerminos == "true" ? 1 : 0)],
    function (err, result) {
      if (err)
        callback(err, res, req, null);
      else
        callback(null, res, req, result);
    });
}

/**
 * Función utilziada para validar la existencia del usuario
 * @param {Usuario a validar} Usuario 
 * @param {Funcion llamada al ejecutar el proceso} callback 
 */
function validarInicioSesion(req, res, callback) {
  connection.query('SELECT * FROM Usuario WHERE Usuario = ? AND Clave = ?', [req.query.usuario, req.query.clave],
    function (err, result) {
      if (err)
        callback(err, res, req, null);
      else
        callback(null, res, req, result);
    });
}

/*RETORN JSON CON DATOSn */
router.get('/validarUsuario', function (req, res, next) {

  var _strError = "";
  req.query.usuario = req.query.usuario == null ? "" : req.query.usuario;
  req.query.clave = req.query.clave == null ? "" : req.query.clave;
  if (req.query.usuario.trim() == "") {
    _strError = "Debe ingresar un usuario";
  }
  if (req.query.clave.trim() == "") {
    _strError = "Debe ingresar una clave";
  }

  if (_strError == "") {

    /*
    * Llama datos BD
    */
    validarInicioSesion(req, res, function (_error, res, req, _resultadoBD) {
      if (_error) {
        res.json({ Proceso: false, mensajeErro: _error });
      } else {
        if (_resultadoBD.length == 0) {
          res.json({ Proceso: false, mensajeErro: "El usuario no existe." });
        } else {
          res.json({ Proceso: true, Nombre: _resultadoBD[0].NombresApellidos });
        }
      }
    });


  } else {
    res.json({ Proceso: false, mensajeErro: _strError });
  }

});


/*RETORN JSON CON DATOSn */
router.post('/insertaNuevoUsuario', function (req, res, next) {
  var strValidaciones = "";
  if (req.query.Clave == "") {
    strValidaciones = "Debe asignar una clave";
  }
  if (req.query.NombresApellidos == "") {
    strValidaciones = "Debe asignar un nombre";
  }
  if (req.query.AceptaTerminos != "true") {
    strValidaciones = "Debe aceptar los términos y condiciones";
  }
  if (req.query.Usuario == "") {
    strValidaciones = "Debe indicar un usuario";
  }
  if (strValidaciones == "") {
    validarExistencia(req, res, function (_error, res, req, _resultadoBD) {
      if (_error) {
        res.json({ Proceso: false, mensajeErro: _error });
      } else {
        if (_resultadoBD.length == 0) {

          /**
           * Inserta nuevo usuario
           */
          insertaUsuario(req, res, function (_error, res, req, _resultadoBD) {
            if (_error) {
              res.json({ Proceso: false, mensajeErro: _error.message });
            } else {
              res.json({ Proceso: false, mensajeErro: "Usted ha sido creado exitosamente." });
            }
          });

        } else {
          res.json({ Proceso: false, mensajeErro: "El usuario ya existe." });
        }
      }
    });
  } else {
    res.json({ Proceso: false, mensajeErro: strValidaciones });
  }
});

module.exports = router;