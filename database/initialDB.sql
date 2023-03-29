USE mydb;

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `img_path` varchar(255),
  `description` varchar(255),
  `price` int,
  `category` ENUM ('gods', 'creatures', 'items', 'notebook', 'novel', 'key_chain', 'backpack_wallet', 'necklace'),
  `material` ENUM ('clay', 'metal', 'wood', 'glass', 'plastic')
  `co` ENUM ('vietnam', 'america', 'china', 'england', 'italy', 'france', 'japan', 'india', 'brazil', 'argentina', 'canada')
  `discount_id` int,
  `num_product` int DEFAULT 0,
  `num_buy` int DEFAULT 0,
  `like_count` int DEFAULT 0,
  `rating` int DEFAULT 0,
  `create_at` timestamp
);

CREATE TABLE `discount` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `rate` int DEFAULT 0,
  `create_at` timestamp
);

CREATE TABLE `product_category` (
  `id` int AUTO_INCREMENT,
  `name` varchar(255),
  `sub_category` ENUM ('gods', 'creatures', 'items', 'notebook', 'novel', 'key_chain', 'backpack_wallet', 'necklace'),
  PRIMARY KEY (`id`, `sub_category`)
);

-- ALTER TABLE `product` ADD FOREIGN KEY (`category`) REFERENCES `product_category` (`sub_category`);

CREATE TABLE `discount_product` (
  `discount_id` int,
  `product_discount_id` int,
  PRIMARY KEY (`discount_id`, `product_discount_id`)
);

ALTER TABLE `discount_product` ADD FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`);

-- ALTER TABLE `discount_product` ADD FOREIGN KEY (`product_discount_id`) REFERENCES `product` (`discount_id`);

-- HERE: PRODUCT
INSERT INTO product (name, img_path, description, price, category, material, co, discount_id, num_product, num_buy, like_count, rating, create_at)
VALUES


-- HERE: DISCOUNT
INSERT INTO discount (name, rate, create_at)
VALUES 
('Subsequently Cest', '26', NOW()), ('Shop Firefox', '59', NOW()), ('Cod Shortly', '47', NOW()), ('Funded Fitted', '49', NOW()), ('Humanities Rewards', '43', NOW()), ('Brook Powerful', '59', NOW()), ('Rangers Circumstances', '47', NOW()), ('Gt Both', '38', NOW()), ('Promotion Homepage', '39', NOW()), ('Camel Admit', '56', NOW()), ('Intent Manager', '36', NOW()), ('Pricing Ratio', '61', NOW()), ('Analyst Profile', '40', NOW()), ('Column Reflections', '50', NOW()), ('Ez Exercises', '67', NOW()), ('Trick Transmitted', '54', NOW()), ('Favourites Huntington', '61', NOW()), ('Jaguar Triumph', '52', NOW()), ('Conversations Vermont', '64', NOW()), ('Clinic App', '43', NOW());
-- HERE: CATEGORY
INSERT INTO product_category (name, sub_category) 
VALUES
('figurines', 'gods'), ('figurines', 'creatures'), ('figurines', 'items'), ('books', 'notebook'), ('books', 'novel'), ('accessories', 'key_chain'), ('accessories', 'necklace'), ('accessories', 'backpack_wallet');