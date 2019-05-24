DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id BIGINT AUTO_INCREMENT,
product_name VARCHAR (250),
department_name VARCHAR (250),
price DECIMAL(13, 4),
stock_quantity INTEGER, 
PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slow cooker", "kitchen appliances", 199, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Magic Bullet Blender", "kitchen appliances", 25, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rice cooker", "kitchen appliances", 55, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("KitchenAid Mixer", "kitchen appliances", 300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "furniture", 3000, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed", "furniture", 800, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slow cooker", "kitchen appliances", 199, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("towel", "Bathroom", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shower curtain", "Bathroom", 10, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pillow", "Bedroom", 100, 150);

SELECT * FROM products;

UPDATE products
SET price = '3000' 
WHERE price = '3000.00';