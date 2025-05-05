const express = require('express');
const router = express.Router();
const usuariosModel = require('./../../models/usuariosModel');
const novedadesModel = require('../../models/novedadesModel');

const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// Listar las novedades
router.get('/', async function (req, res, next) {
  let novedades = await novedadesModel.getNovedades();

  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return {
        ...novedad, 
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: ''
      }
    }
  });

  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades
  });
});

// Para mostrar el formulario de agregar

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next) => {
  try {
    let img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;

      // Optimizacion para subida de imagenes
      img_id = (await uploader(imagen.tempFilePath, {
        folder: 'novedades',
        transformation: [{ quality: "auto", fetch_format: "auto" }]
      })).public_id;      
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedades({
        ...req.body,
        img_id
      });
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó la novedad'
    });
  }
});

// Eliminar novedades
router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  let novedad = await novedadesModel.getNovedadesById(id);
  if (novedad.img_id) {
    await (destroy(novedad.img_id));
  }

  console.log(id);
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades');
});

// Cargar el form de modificar con los datos de una novedad
router.get('/editar/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params.id);
  const novedad = await novedadesModel.getNovedadesById(id);

  res.render('admin/editar', {
    layout: 'admin/layout',
    novedad
  });
});

// Actualizar o modificar la novedad
router.post('/editar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        console.time('Subida imagen');
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        console.timeEnd('Subida imagen');
        borrar_img_vieja = true;
      }
    }

    console.time('Destrucción imagen');
    if (borrar_img_vieja && req.body.img_original && img_id !== req.body.img_original) {
      await destroy(req.body.img_original);
    }
    console.timeEnd('Destrucción imagen');

    const obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    };
    console.log(obj);

    await novedadesModel.modificarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error);
    res.render('admin/editar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    });
  }
});



module.exports = router;