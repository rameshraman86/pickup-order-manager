//db query that will return all orders
const db = require('../connection');

const getDishes = async () => {
  const data = await db.query('SELECT * FROM dishes;');
  return data.rows;
};

module.exports = { getDishes };
