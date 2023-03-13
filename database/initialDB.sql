CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `img_path` varchar(255),
  `description` varchar(255),
  `price` int,
  `category` varchar(255),
  `discount_id` int,
  `num_product` int DEFAULT 0,
  `num_buy` int DEFAULT 0,
  `like` int DEFAULT 0,
  `rating` float DEFAULT 0
);

CREATE TABLE `discount` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `rate` int DEFAULT 0
);

CREATE TABLE `product_category` (
  `id` int AUTO_INCREMENT,
  `name` varchar(255),
  `sub_category` ENUM ('gods', 'creatures', 'items', 'notebook', 'novel', 'key_chain', 'backpack_wallet', 'necklace'),
  PRIMARY KEY (`id`, `sub_category`)
);

ALTER TABLE `product` ADD FOREIGN KEY (`category`) REFERENCES `product_category` (`sub_category`);

CREATE TABLE `discount_product` (
  `discount_id` int,
  `product_discount_id` int,
  PRIMARY KEY (`discount_id`, `product_discount_id`)
);

ALTER TABLE `discount_product` ADD FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`);

ALTER TABLE `discount_product` ADD FOREIGN KEY (`product_discount_id`) REFERENCES `product` (`discount_id`);

