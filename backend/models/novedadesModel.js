const pool = require('./bd');

async function getNovedades() {
  const query = 'select * from novedades';
  const rows = await pool.query(query);
  return rows;
}

async function insertNovedades(obj) {
  try {
    const query = 'insert into novedades set ?';
    const rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function deleteNovedadesById(id) {
  const query = 'delete from novedades where id = ?';
  const rows = await pool.query(query, [id]);
  return rows;
}

// Modificar y traer los datos de una sola
async function getNovedadesById(id) {
  const query = 'select * from novedades where id = ?';
  const rows = await pool.query(query, [id]);
  return rows[0];
}

//Modificar UPDATE de los datos
async function modificarNovedadesById(obj, id) {
  try {
    const query = 'update novedades set ? where id = ?';
    const rows = await pool.query(query, [obj, id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getNovedades, insertNovedades, deleteNovedadesById, getNovedadesById, modificarNovedadesById }