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
  const queryString = "SELECT * FROM orders WHERE status IN ($1) ORDER BY status, eta_minutes DESC;";
  const queryParams = ["Preparing"];

  const data = await db.query(queryString, queryParams);
  return data.rows;
};

//readWaitingToPickupOrders
const getWaitingToPickupOrders = async () => {
  const queryString = "SELECT * FROM orders WHERE status IN ($1)";
  const queryParams = ["Waiting to pickup"];

  const data = await db.query(queryString, queryParams);
  return data.rows;
};


//readCompletedOrders
const getCompletedOrders = async () => {
  const queryString = "SELECT * FROM orders WHERE status IN ($1, $2, $3);";
  const queryParams = ["Cancelled", "Picked up", "Declined"];

  const data = await db.query(queryString, queryParams);
  return data.rows;
};


//*********************UPDATE*********************
const acceptOrder = (order_id, eta) => {
  const queryString = "UPDATE orders SET status = 'Preparing', eta_minutes = $1 WHERE id = $2 RETURNING *;";
  const queryParam = [eta, order_id];
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};

const declineOrder = (order_id) => {
  const queryString = "UPDATE orders SET status = 'Declined' WHERE id = $1 RETURNING *;";
  const queryParam = [order_id];
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};


const udpdateEta = (eta_minutes, order_id) => {
  const queryString = "UPDATE orders SET eta_minutes = $1 WHERE id = $2 RETURNING *;";
  const queryParam = [eta_minutes, order_id];
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};


const updateStatusWaitingForPickup = (order_id) => {
  const queryString = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *;";
  const queryParam = ["Waiting to pickup", order_id];
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};


const cancelOrder = (order_id) => {
  const queryString = "UPDATE orders SET status = 'Cancelled' WHERE id = $1 RETURNING *;";
  const queryParam = [order_id];
  return db
    .query(queryString, queryParam)
    .then((data) => data.rows[0]);
};


const orderPickedUp = (order_id) => {
  const queryString = "UPDATE orders SET status = 'Picked up' WHERE id = $1 RETURNING *;";
  const queryParam = [order_id];
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
  getWaitingToPickupOrders,
  acceptOrder,
  declineOrder,
  cancelOrder,
  udpdateEta,
  updateStatusWaitingForPickup,
  orderPickedUp
};
