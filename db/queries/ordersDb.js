//db query that will return all orders
const db = require('../connection');
//
//CRUD
//

//*********************CREATE*********************





//*********************READ*********************
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
  const queryString = "SELECT * FROM orders WHERE status IN ($1, $2, $3, $4, $5);";
  const queryParams = ["Waiting for pickup", "Preparing", "Ready for pickup", "Preparing", "Accepted"];

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


//*********************UPDATE*********************
const acceptOrder = (order_id, eta) => {
  const queryString = "UPDATE orders SET status = 'Preparing', eta_minutes = $1 WHERE id = $2 RETURNING *;";
  const queryParam = [eta, order_id];
  // await db.query(queryString, queryParam);
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};


//*********************DELETE*********************


module.exports = {
  getOrders,
  getOrdersByStatus,
  getAcceptedOrders,
  getCompletedOrders,
  acceptOrder
};
