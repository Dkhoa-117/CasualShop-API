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
  `rate` int DEFAULT 0
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
INSERT INTO product (name, img_path, description, price, category, discount_id, num_product, num_buy, like_count, rating, create_at)
VALUES 

-- HERE: DISCOUNT
INSERT INTO discount (name, rate)
VALUES 
('Winner Reduce', '59'), ('Irc Attendance', '35'), ('Amenities Duplicate', '27'), ('Ridge Fool', '48'), ('Wifi Deep', '37'), ('Publicity Fears', '69'), ('Scientist Nova', '52'), ('Colour Lid', '30'), ('Complement Eric', '39'), ('Brighton Mat', '57'), ('Dryer Trusts', '61'), ('Car Poet', '67'), ('Shaved Encryption', '34'), ('Cage Occurrence', '64'), ('Therapeutic Compressed', '36'), ('Reliable Sw', '26'), ('Departmental Open', '60'), ('Samba Partition', '34'), ('Effects Silent', '46'), ('Stylish Paragraphs', '61');
-- HERE: CATEGORY
INSERT INTO product_category (name, sub_category) 
VALUES
('figurines', 'gods'), ('figurines', 'creatures'), ('figurines', 'items'), ('books', 'notebook'), ('books', 'novel'), ('accessories', 'key_chain'), ('accessories', 'necklace'), ('accessories', 'backpack_wallet');