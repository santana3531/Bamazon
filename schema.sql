CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Madden 18", "Video Games", 59.99, 300),
  ("BIG", "Movies", 19.99, 300),
  ("Banana Bread Muffins", "Food", 4.50, 100),
  ("Nike Janowski's", "Shoes", 85.00, 50),
  ("Vans", "Shoes", 45.00, 50),
  ("Dunkin K-Cups", "Food", 9.99, 100),
  ("How to not kill yourself learning to code", "Movies", 15.00, 25),
  ("NBA2k18", "Video Games", 59.99, 300),
  ("Truth or Dare: Adult Version", "Board Games", 29.99, 40),
  ("Yahtzee", "Board Games", 19.95, 40);