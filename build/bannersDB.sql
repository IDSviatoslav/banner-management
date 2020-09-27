-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: banners_web_repo
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqwrk4tb97mv7xd06renu2jaup` (`category_id`),
  CONSTRAINT `FKqwrk4tb97mv7xd06renu2jaup` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Ala turca',_binary '\0','Mozart',1000,1),(2,'Can\'t stop',_binary '\0','RHCP',50,1),(3,'3-е сентября',_binary '\0','Shafutinsky',10,1),(4,'das Auto',_binary '\0','Volkswagen',100,2),(5,'Ultimate Driving Machine',_binary '\0','BMW',100,2),(6,'Let\'s go places',_binary '\0','Toyota',100,2),(7,'Dostoevsky',_binary '\0','Igrok',300,3),(8,'Csikszentmihalyi',_binary '\0','Flow',300,3),(9,'Amidi',_binary '\0','Art of Robots',50,3),(10,'deletedBanner',_binary '','testBannerForDelete',0,NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `req_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,_binary '\0','Music','mus'),(2,_binary '\0','Cars','car'),(3,_binary '\0','Books','book'),(4,_binary '\0','People','ppl'),(5,_binary '','testCategotyForDelete','deletedCategory');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_banners`
--

DROP TABLE IF EXISTS `category_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_banners` (
  `category_id` int NOT NULL,
  `banner_id` int NOT NULL,
  UNIQUE KEY `UK_jvxg0kqqyba9seppmks325d5n` (`banner_id`),
  KEY `FKme2o80ndig2iffo9uh61gsgvd` (`category_id`),
  CONSTRAINT `FKdkbgupp4kjjnpq8nqttm4vjte` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`id`),
  CONSTRAINT `FKme2o80ndig2iffo9uh61gsgvd` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_banners`
--

LOCK TABLES `category_banners` WRITE;
/*!40000 ALTER TABLE `category_banners` DISABLE KEYS */;
INSERT INTO `category_banners` VALUES (1,1),(1,2),(1,3),(2,4),(2,5),(2,6),(3,7),(3,8),(3,9);
/*!40000 ALTER TABLE `category_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_banners`
--

DROP TABLE IF EXISTS `request_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_banners` (
  `banner_id` int NOT NULL,
  `requests_id` int NOT NULL,
  PRIMARY KEY (`banner_id`,`requests_id`),
  UNIQUE KEY `UK_a9nu9ylm5fwmyowp4apqgkcv8` (`requests_id`),
  CONSTRAINT `FK7cylh05m2mggme76ye1w31o5r` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`id`),
  CONSTRAINT `FKecxhlrvutqocofm7y3k6qgsyo` FOREIGN KEY (`requests_id`) REFERENCES `requests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_banners`
--

LOCK TABLES `request_banners` WRITE;
/*!40000 ALTER TABLE `request_banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent_text` varchar(255) DEFAULT NULL,
  `banner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5akwwq6v8jphufk2k4kitw6ie` (`banner_id`),
  CONSTRAINT `FK5akwwq6v8jphufk2k4kitw6ie` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-27 16:34:19
