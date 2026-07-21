/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.3.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: computer_shop
-- ------------------------------------------------------
-- Server version	12.3.2-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `computer_shop`
--

/*!40000 DROP DATABASE IF EXISTS `computer_shop`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `computer_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `computer_shop`;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES
(1,'Niš');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,1695246026046,'CreateRoleTable1695246026046'),
(2,1695246076066,'CreateCityTable1695246076066'),
(3,1695323792226,'CreateUserTable1695323792226'),
(4,1695324735090,'CreateUserContactInfoTable1695324735090'),
(5,1695324921405,'CreateFkUserAndUserContactInfo1695324921405'),
(6,1695471729313,'EnterDataForCity1695471729313'),
(7,1695488983589,'CreateProductTable1695488983589'),
(8,1695489003083,'CreateOrderTable1695489003083'),
(9,1695489214001,'CreateOrderProductTable1695489214001'),
(10,1695567391457,'CreateOrderDeliveryInfoTable1695567391457');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `total` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('IN_PREPARATION','SHIPPED','DELIVERED','CANCELLED') NOT NULL DEFAULT 'IN_PREPARATION',
  PRIMARY KEY (`id`),
  KEY `FK_199e32a02ddc0f47cd93181d8fd` (`user_id`),
  CONSTRAINT `FK_199e32a02ddc0f47cd93181d8fd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES
(1,'2026-07-15 00:00:00',1000,3,'IN_PREPARATION'),
(2,'2026-07-20 00:00:00',1000,2,'IN_PREPARATION'),
(3,'2026-07-20 00:00:00',2000,2,'IN_PREPARATION'),
(4,'2026-07-21 00:00:00',1200,2,'DELIVERED'),
(12,'2026-07-21 00:00:00',700,2,'IN_PREPARATION'),
(13,'2026-07-21 00:00:00',700,2,'IN_PREPARATION'),
(14,'2026-07-21 00:00:00',400,2,'IN_PREPARATION'),
(16,'2026-07-21 21:35:54',600,2,'IN_PREPARATION');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `order_delivery_info`
--

DROP TABLE IF EXISTS `order_delivery_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_delivery_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(128) NOT NULL,
  `zip` varchar(128) NOT NULL,
  `street` varchar(128) NOT NULL,
  `number` varchar(128) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ee5d54f0e2e5cbff45300b31cd1` (`order_id`),
  KEY `FK_bcc30f056face96aa2a7644b126` (`city_id`),
  CONSTRAINT `FK_bcc30f056face96aa2a7644b126` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ee5d54f0e2e5cbff45300b31cd1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_delivery_info`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `order_delivery_info` WRITE;
/*!40000 ALTER TABLE `order_delivery_info` DISABLE KEYS */;
INSERT INTO `order_delivery_info` VALUES
(1,1,'18106','prvoomajska','10',1),
(2,1,'18106','prvoomajska','10',2),
(3,1,'18106','prvoomajska','10',3),
(4,1,'18106','prvomajska','10',4),
(6,1,'18106','prvoomajska','10',12),
(7,1,'18106','prvoomajska','10',13),
(8,1,'18106','prvoomajska','10',14),
(10,1,'18106','Prvomajska','10',16);
/*!40000 ALTER TABLE `order_delivery_info` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_2d58e8bd11dc840b39f99824d84` (`product_id`),
  KEY `FK_f258ce2f670b34b38630914cf9e` (`order_id`),
  CONSTRAINT `FK_2d58e8bd11dc840b39f99824d84` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_f258ce2f670b34b38630914cf9e` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` VALUES
(1,1,1,1,400),
(2,1,2,1,400),
(3,1,3,2,400),
(4,1,4,1,400),
(5,2,4,1,700),
(7,2,12,1,700),
(8,2,13,1,700),
(9,1,14,1,400),
(11,1,16,1,400),
(12,6,16,1,200);
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `price` double NOT NULL,
  `quantity` double NOT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_22cc43e9a74d7498546e9a63e77` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES
(1,'Grafička kartica Gigabyte GeForce RTX 3060 12GB WINDFORCE OC rev 2.0',400,9,'https://www.gamecentar.rs/media/catalog/product/cache/fd56078e9d935ae1094b0948aee087e5/3/8/38663-graficka-karta-gigabyte-nvidia-geforce-rtx-3060-windforce-oc-cena-prodaja.webp'),
(2,'Grafička kartica Gigabyte GeForce RTX 3070 GAMING 8GB 256bit GV-N3070GAMING OC-8',700,0,'https://www.gamecentar.rs/media/catalog/product/cache/fd56078e9d935ae1094b0948aee087e5/3/2/32432-gigabyte-rtx-3070-gaming-8gb-256bit-gv-n3070gaming-oc-8gd-rev2-lhr-graficka.webp'),
(6,'H5 Elite (2023) Premium Compact Mid-tower Case',200,19,'https://nzxt.com/cdn/shop/files/h5-elite-hero-white.png?v=1762528056&width=1000');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('USER','ADMINISTRATOR','WAREHOUSE_ADMINISTRATOR') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES
(1,'USER'),
(2,'ADMINISTRATOR'),
(3,'WAREHOUSE_ADMINISTRATOR');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `activated` tinyint(1) NOT NULL,
  `user_contact_info_id` int(128) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_78a916df40e02a9deb1c4b75edb` (`username`),
  KEY `FK_fb2e442d14add3cefbdf33c4561` (`role_id`),
  KEY `FK_b2ce51248df19212e691a77d11d` (`user_contact_info_id`),
  CONSTRAINT `FK_b2ce51248df19212e691a77d11d` FOREIGN KEY (`user_contact_info_id`) REFERENCES `user_contact_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_fb2e442d14add3cefbdf33c4561` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'admin','$2b$10$qYOh/FacyAjlFRkir6khC.zrf9fd664gtO91DTpES7CW1eoFiWlkW','Sava','Petrovic',1,1,2),
(2,'sava02','$2b$10$GdAWD/3y31V5hMAF3n1.P.YPqzu.1Q38dH.QtWSFbp8LMooblaFTC','Sava','Petrovic',1,2,1),
(3,'saki02','$2b$10$mFhgWD4ZCobk0EdGPvR1t.YE0o.H.oip8Ry15w.exBunq0G8y47bC','sava','petrovic',1,3,1),
(5,'andrija02','$2b$10$Z1bmX/.jdRznXbdEXIO1.O81ZexLhrU4nJ1fMYJrgApTdrCatYhhq','Andrija','Simovic',1,6,3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user_contact_info`
--

DROP TABLE IF EXISTS `user_contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contact_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `contact_phone` varchar(128) NOT NULL,
  `street` varchar(128) DEFAULT NULL,
  `number` varchar(128) DEFAULT NULL,
  `zip` varchar(128) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_uci_city` (`city_id`),
  CONSTRAINT `fk_uci_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contact_info`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user_contact_info` WRITE;
/*!40000 ALTER TABLE `user_contact_info` DISABLE KEYS */;
INSERT INTO `user_contact_info` VALUES
(1,'mail@example.com','+38169432432',NULL,NULL,NULL,NULL),
(2,'petrovicsava3@gmail.com','+381604150420','Prvomajska','10','18106',1),
(3,'petrovicsava3@gmail.com','+381604150420',NULL,NULL,NULL,NULL),
(6,'andirja@gmail.com','+381604150420',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_contact_info` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping events for database 'computer_shop'
--

--
-- Dumping routines for database 'computer_shop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-07-21 21:38:43
