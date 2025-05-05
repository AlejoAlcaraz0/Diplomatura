const express = require('express');
const router = express.Router();
const usuariosModel = require('./../../models/usuariosModel');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

// Cerrar LOGOUT
router.get('/logout', function (req, res, next) {
  req.session.destroy(); // Destruir las variables de sesion (id y usuario)
  res.render('admin/login', {
    layout: 'admin/layout'
  });
}); 

router.post('/', async (req, res, next) => {
  try {
    const usuario = req.body.usuario; // Captura el usuario
    const password = req.body.password; // Captura la contraseña

    console.log('Credenciales recibidas:', usuario, password);

    const data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    console.log('Resultado de la BD:', data);

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;