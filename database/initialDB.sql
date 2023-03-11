USE mydb;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `gender` ENUM ('male', 'female', 'others'),
  `password` varchar(255),
  `created_at` timestamp,
  `email` varchar(255),
  `profile_path` varchar(255),
  `favorite_movies` int,
  `favorite_person` int
);

CREATE TABLE `movies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `logo_path` varchar(255),
  `overview` varchar(255),
  `budget` int,
  `revenue` int,
  `vote_average` float DEFAULT 0,
  `vote_count` int DEFAULT 0,
  `catagory` ENUM ('action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 'musical', 'mystery', 'romance', 'science_fiction', 'sports', 'thriller', 'western'),
  `crew` int,
  `cast` int
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `replied_id` int DEFAULT null,
  `user_id` int,
  `content` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `person` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `birthday` timestamp,
  `known_for_department` ENUM ('acting', 'writing', 'directing'),
  `gender` ENUM ('male', 'female', 'others'),
  `also_known_as` varchar(255),
  `place_of_birth` varchar(255),
  `profile_path` varchar(255),
  `deathday` timestamp DEFAULT null
);

CREATE TABLE `movies_users` (
  `movies_id` int,
  `users_favorite_movies` int,
  PRIMARY KEY (`movies_id`, `users_favorite_movies`)
);

ALTER TABLE `movies_users` ADD FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`);

ALTER TABLE `movies_users` ADD FOREIGN KEY (`users_favorite_movies`) REFERENCES `users` (`favorite_movies`);


CREATE TABLE `person_users` (
  `person_id` int,
  `users_favorite_person` int,
  PRIMARY KEY (`person_id`, `users_favorite_person`)
);

ALTER TABLE `person_users` ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `person_users` ADD FOREIGN KEY (`users_favorite_person`) REFERENCES `users` (`favorite_person`);


CREATE TABLE `crew_movies` (
  `crew_id` int,
  `movies_crew` int,
  PRIMARY KEY (`crew_id`, `movies_crew`)
);

ALTER TABLE `crew_movies` ADD FOREIGN KEY (`crew_id`) REFERENCES `person` (`id`);

ALTER TABLE `crew_movies` ADD FOREIGN KEY (`movies_crew`) REFERENCES `movies` (`crew`);


CREATE TABLE `cast_movies` (
  `cast_id` int,
  `movies_cast` int,
  PRIMARY KEY (`cast_id`, `movies_cast`)
);

ALTER TABLE `cast_movies` ADD FOREIGN KEY (`cast_id`) REFERENCES `person` (`id`);

ALTER TABLE `cast_movies` ADD FOREIGN KEY (`movies_cast`) REFERENCES `movies` (`cast`);


ALTER TABLE `comments` ADD FOREIGN KEY (`replied_id`) REFERENCES `comments` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
