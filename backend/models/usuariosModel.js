const pool = require('./bd');
const md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
  try {
    const query = 'select * from usuarios where usuario = ? and password = ? limit 1';
    const rows = await pool.query(query, [user, md5(password)]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserByUsernameAndPassword }