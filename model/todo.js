const pool = require('./database');

const create = async (description) => {
  const result = await pool.query(
    'INSERT INTO todo (description) VALUES ($1) RETURNING *;',
    [description]
  );
  return result.rows[0];
};

const get = async () => {
  const result = await pool.query('SELECT * FROM todo');
  return result.rows;
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
  return result.rowCount;
};

module.exports = {
  create,
  get,
  remove,
};

