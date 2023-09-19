//db query that will return all orders
const db = require('../connection');
var format = require('pg-format');


const getDishes = async () => {
  const data = await db.query('SELECT * FROM dishes;');
  return data.rows;
};



//insert a new order into orders table. i am hardcoding customer id to 11
const addNewOrder = (total_amount, order_date) => {

  const queryString = `INSERT INTO orders (customer_id, status, total_amount, order_date) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const queryParams = ["1", "Pending acceptance", total_amount, order_date];
  return db.query(queryString, queryParams)
};

//Insert into orders and then orders_dishes

'INSERT INTO orders_dishes'

module.exports = {
  getDishes,
  addNewOrder
};
