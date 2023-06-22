
CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL
);
INSERT INTO `role` (`id`, `name`)
VALUES
  ('0', 'user'),
  ('55', 'admin'),
  ('88', 'superAdmin');



CREATE TABLE `agency` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
);
INSERT INTO `agency` (`name`, `city`, `country`)
VALUES
  ('Wildforge', 'Bordeaux', 'France'),
  ('SalesIt', 'Paris', 'France'),
  ('Manafo', 'Madrid', 'Espagne'),
  ('Eurosys', 'Rome', 'Italie'),
  ('TechVista', 'Londres', 'Royaume-Uni'),
  ('GloboTech', 'Berlin', 'Allemagne'),
  ('EuroTech', 'Amsterdam', 'Pays-Bas'),
  ('PowerTech', 'Athènes', 'Grèce'),
  ('PrimeTech', 'Lisbonne', 'Portugal'),
  ('InnovaCorp', 'Dublin', 'Irlande'),
  ('SkySoft', 'Stockholm', 'Suède'),
  ('EuroWeb', 'Copenhague', 'Danemark'),
  ('NordicTech', 'Oslo', 'Norvège'),
  ('MaxTech', 'Varsovie', 'Pologne'),
  ('AlphaTech', 'Budapest', 'Hongrie'),
  ('PrimeTech', 'Prague', 'République tchèque');



CREATE TABLE `position` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);
INSERT INTO `position` (`name`)
VALUES
  ('Director'),
  ('Department Manager'),
  ('Sales Manager'),
  ('Accountant'),
  ('Human Resources Manager'),
  ('Marketing Manager'),
  ('IT Manager'),
  ('Project Manager'),
  ('Financial Analyst'),
  ('Administrative Assistant'),
  ('Operations Manager'),
  ('Customer Service Manager'),
  ('Product Manager'),
  ('Purchasing Manager'),
  ('Research and Development Manager'),
  ('Quality Assurance Manager'),
  ('Supply Chain Manager'),
  ('Business Development Manager'),
  ('Training and Development Manager'),
  ('Legal Counsel'),
  ('Public Relations Manager'),
  ('Operations Supervisor'),
  ('Inventory Manager'),
  ('Logistics Manager'),
  ('Technical Support Specialist'),
  ('Data Analyst'),
  ('Sales Representative'),
  ('Customer Support Representative'),
  ('Marketing Coordinator'),
  ('Systems Administrator'),
  ('Web Developer'),
  ('Graphic Designer');



CREATE TABLE `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
);
INSERT INTO `category` (`label`, `color`)
VALUES
  ('Technology', 'rgba(0, 123, 255, 0.87)'),
  ('Art and Design', 'rgba(255, 45, 85, 0.87)'),
  ('Science', 'rgba(100, 210, 30, 0.87)'),
  ('Health and Wellness', 'rgba(175, 82, 222, 0.87)'),
  ('Education', 'rgba(255, 149, 0, 0.87)'),
  ('Environment', 'rgba(0, 200, 83, 0.87)'),
  ('Business and Finance', 'rgba(52, 199, 89, 0.87)'),
  ('Entertainment', 'rgba(255, 59, 48, 0.87)'),
  ('Social Impact', 'rgba(90, 200, 250, 0.87)'),
  ('Sports and Recreation', 'rgba(88, 86, 214, 0.87)');



CREATE TABLE `idea` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `context` text NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `archived_at` datetime DEFAULT null,
  `deleted_at` datetime DEFAULT null,
  `goal` text DEFAULT null,
  `profits` text DEFAULT null,
  `risks` text DEFAULT null,
  `cloudshare` varchar(255) DEFAULT null,
  `primary_img` varchar(255),
  `views` integer NOT NULL DEFAULT 0
);
INSERT INTO `idea` (`title`, `context`, `user_id`, `created_at`, `archived_at`, `deleted_at`, `goal`, `profits`, `risks`, `cloudshare`, `primary_img`, `views`)
VALUES
  ('Idea 1', 'Lorem ipsum dolor sit amet.', 1, '2022-11-23T12:33:11.230Z', NULL, NULL, 'Achieve a sustainable future.', 'Increase revenue and market share.', 'Mitigate potential risks.', NULL, 'https://picsum.photos/500/500', 200),
  ('Idea 2', 'Consectetur adipiscing elit.', 2, '2023-05-20T12:33:11.230Z', NULL, NULL, 'Improve user experience.', 'Expand into new markets.', 'Manage competitive challenges.', NULL, 'https://picsum.photos/500/500', 50);



CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `mail` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `role_id` integer NOT NULL,
  `avatar_url` varchar(255) DEFAULT null,
  `banner_url` varchar(255) DEFAULT null,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` datetime DEFAULT null,
  `share_birthdate` boolean DEFAULT false,
  `phone` varchar(255) DEFAULT null,
  `share_phone` boolean DEFAULT false,
  `biography` varchar(255) DEFAULT null,
  `agency_id` integer,
  `joined_at` varchar(255) DEFAULT null,
  `position_id` integer,
  `score_comment` integer NOT NULL DEFAULT 0,
  `score_idea` integer NOT NULL DEFAULT 0,
  `score_like` integer NOT NULL DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `is_active` boolean DEFAULT false,
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  FOREIGN KEY (`agency_id`) REFERENCES `agency` (`id`),
  FOREIGN KEY (`position_id`) REFERENCES `position` (`id`)
);
INSERT INTO `user` (`mail`, `hashed_password`, `role_id`, `avatar_url`, `banner_url`, `firstname`, `lastname`, `birthdate`, `share_birthdate`, `phone`, `share_phone`, `biography`, `agency_id`, `joined_at`, `position_id`, `score_comment`, `score_idea`, `score_like`, `is_active`)
VALUES
  ('super.admin@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ', 88, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Sarah', 'Conor', '1972-11-12T12:33:11.230Z', false, '+33655758466', false, 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', 1, '2017-06-13T12:33:11.230Z', 1, 999, 999, 999, true),
  ('admin@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ', 55, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Nelson', 'Monfort', '1955-04-22T12:33:11.230Z', true, '+33659862414', true, 'This is a vrai plaisir to colaborate with vous.', 2, '2017-06-13T12:33:11.230Z', 1, 200, 500, 800, true),
  ('user1@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'John', 'Doe', '1988-01-23T12:33:11.230Z', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 3, '2017-06-13T12:33:11.230Z', 1, 0, 0, 0, true),
  ('user1@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ', 0, 'https://picsum.photos/200', 'https://picsum.photos/1000/300', 'Florent', 'Panini', '1981-03-05T12:33:11.230Z', true, '+33659862414', true, 'Lorem ipsum dolor sit amet.', 2, '2017-06-13T12:33:11.230Z', 1, 0, 0, 0, false);



CREATE TABLE `idea_like` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `idea_id` integer,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);
INSERT INTO `idea_like` (`user_id`, `idea_id`)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 2);



CREATE TABLE `favorit` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `idea_id` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);
INSERT INTO `favorit` (`user_id`, `idea_id`)
VALUES
  (1, 1),
  (2, 1),
  (2, 2);



CREATE TABLE `attachment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `content_type` varchar(255) NOT NULL,
  `content_url` varchar(255) NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);



CREATE TABLE `comment` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
);
INSERT INTO `comment` (`idea_id`, `user_id`, `body`, `created_at`)
VALUES
  (1, 1, 'Great idea!', '2023-05-23 12:33:11'),
  (1, 2, 'I really like this concept.', '2023-05-24 09:15:30'),
  (2, 3, 'Interesting approach.', '2023-05-25 16:45:22'),
  (2, 1, 'Well thought out!', '2023-05-26 14:20:18');



CREATE TABLE `comment_like` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `comment_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `comment_like` (`comment_id`, `user_id`)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4);



CREATE TABLE `idea_teams` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
INSERT INTO `idea_teams` (`idea_id`, `user_id`)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4);



CREATE TABLE `idea_category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `idea_id` integer NOT NULL,
  `category_id` integer NOT NULL,
  FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);
INSERT INTO `idea_category` (`idea_id`, `category_id`)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4);

