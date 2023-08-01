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

//readNewOrders
const getOrdersByStatus = async () => {
  const queryString = "SELECT * FROM orders WHERE status IN ($1);";
  const queryParam = ["Pending acceptance"];

  const data = await db.query(queryString, queryParam);
  return data.rows;
};

//readAcceptedOrders
const getAcceptedOrders = async () => {
  const queryString = "SELECT * FROM orders WHERE status IN ($1, $2, $3, $4);";
  const queryParams = ["Preparing", "Ready for pickup", "Preparing", "Accepted"];

  const data = await db.query(queryString, queryParams);
  return data.rows;
};

//readCompletedOrders
const getCompletedOrders = async () => {
  const queryString = "SELECT * FROM orders WHERE status IN ($1, $2);";
  const queryParams = ["Cancelled", "Picked up"];

  const data = await db.query(queryString, queryParams);
  return data.rows;
};

//update

//delete


module.exports = { getOrders, getOrdersByStatus, getAcceptedOrders, getCompletedOrders };
