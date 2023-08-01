-- -- Drop the foreign key constraint in the customers table
-- ALTER TABLE customers
-- DROP CONSTRAINT fk_customer_order;

-- -- Drop the order_id column from the customers table
-- ALTER TABLE customers
-- DROP COLUMN order_id;


DROP TABLE IF EXISTS orders_dishes;

DROP TABLE IF EXISTS orders_queue;

DROP TABLE IF EXISTS customers;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS restaurants;

DROP TABLE IF EXISTS dishes;


-- Create the restaurants table
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(255) NOT NULL,
  street VARCHAR(255),
  city VARCHAR(255),
  country VARCHAR(255),
  post_code VARCHAR(255)
);

-- Create the customers table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(255) NOT NULL
);

-- Create the orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  status VARCHAR(255),
  eta_minutes INTEGER,
  total_amount NUMERIC,
  is_picked_up BOOLEAN DEFAULT FALSE,
  order_date TIMESTAMP,
  cancel_reason VARCHAR(255)
);

-- Create the dishes table
CREATE TABLE dishes(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  dish_type VARCHAR(255),
  price NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 0
);

-- Create the orders_dishes table
CREATE TABLE orders_dishes (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  dish_id INTEGER REFERENCES dishes(id) ON DELETE CASCADE,
  quantity_per_dish INTEGER NOT NULL,
  total_amount_per_dish NUMERIC NOT NULL
);

-- Create the orders_queue table
CREATE TABLE orders_queue(
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  queue_position INTEGER
);
