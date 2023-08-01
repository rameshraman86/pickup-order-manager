//db query that will return all orders
const db = require('../connection');
//
//CRUD
//create

//readall
const getOrders = async () => {

  const data = await db.query('SELECT * FROM orders;');
  return data.rows;
};

//readone

//update

//delete


module.exports = { getOrders };
