INSERT INTO orders (customer_id, status, eta_minutes, total_amount, is_picked_up, order_date, cancel_reason)
VALUES
  (1, 'Pending acceptance', NULL, 25.99, FALSE, '2023-07-31 10:00:00', NULL),
  (2, 'Preparing', 30, 19.50, FALSE, '2023-07-31 10:15:00', NULL),
  (3, 'Ready for pickup', 15, 12.75, FALSE, '2023-07-31 10:30:00', NULL),
  (4, 'Cancelled', NULL, 0, FALSE, '2023-07-31 10:45:00', 'Out of stock'),
  (5, 'Preparing', 25, 32.20, FALSE, '2023-07-31 11:00:00', NULL),
  (6, 'Ready for pickup', 20, 7.99, FALSE, '2023-07-31 11:15:00', NULL),
  (7, 'Picked up', NULL, 19.50, TRUE, '2023-07-31 11:30:00', NULL),
  (8, 'Waiting for pickup', 35, 15.75, FALSE, '2023-07-31 11:45:00', NULL),
  (9, 'Ready for pickup', 10, 9.00, FALSE, '2023-07-31 12:00:00', NULL),
  (10, 'Pending acceptance', NULL, 28.50, FALSE, '2023-07-31 12:15:00', NULL),
  (11, 'Waiting for pickup', 20, 40.50, FALSE, '2023-07-31 12:15:00', NULL);
