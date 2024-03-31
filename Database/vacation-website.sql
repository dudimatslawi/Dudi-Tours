-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final-project
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `vacationRelation_idx` (`vacationId`),
  CONSTRAINT `userRelation` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacationRelation` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(55) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_idx` (`roleId`),
  CONSTRAINT `role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `imageName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Mikonos','Vacationing in Mykonos during August promises an unforgettable experience filled with sun-soaked days and vibrant nights. Renowned for its stunning beaches, azure waters, and iconic windmills, Mykonos is a quintessential Greek island paradise. In August, the island is at its peak, bustling with energy as travelers from around the globe flock to its shores. With temperatures averaging around 30°C (86°F), it\'s the perfect time to indulge in leisurely beach days, where the gentle sea breeze provides relief from the summer heat. Whether lounging on the golden sands of Paradise Beach or exploring the picturesque streets of Mykonos Town, there\'s no shortage of activities to enjoy. As the sun sets, the island transforms into a lively hotspot, with beach clubs and waterfront bars coming to life with music and revelry. From savoring fresh seafood at seaside tavernas to dancing under the stars at open-air clubs, Mykonos offers a dynamic nightlife scene that caters to every taste. With its captivating beauty and vibrant atmosphere, a vacation in Mykonos during August is sure to create lasting memories of endless summer bliss.','2024-08-07','2024-08-12',800.00,NULL),(2,'Amsterdam','Vacationing in Amsterdam during November offers a unique and enchanting experience, characterized by its charming canals, historic architecture, and cultural richness. As the autumnal hues begin to paint the city, Amsterdam exudes a cozy and romantic ambiance, perfect for leisurely exploration. November brings cooler temperatures, encouraging visitors to stroll along the picturesque canal pathways adorned with fallen leaves, or to cozy up in one of the city\'s quaint cafes with a warm cup of Dutch coffee. While November marks the beginning of the quieter tourist season, Amsterdam\'s cultural scene remains vibrant, with an array of museums, galleries, and theaters to explore. From the iconic Van Gogh Museum to the historic Anne Frank House, there\'s no shortage of cultural landmarks to discover. Additionally, November heralds the arrival of festive markets and events, such as the Dutch Sinterklaas celebrations, offering visitors a glimpse into local traditions and customs. With fewer crowds and a tranquil atmosphere, November provides the perfect opportunity to immerse oneself in the authentic charm and allure of Amsterdam.','2023-11-17','2023-11-25',650.00,NULL),(3,'Rome','Vacationing in Rome is a journey through time, where ancient history intertwines with modern life to create a captivating and unforgettable experience. As the capital city of Italy, Rome is a treasure trove of architectural wonders, iconic landmarks, and culinary delights. From the majestic Colosseum to the awe-inspiring Vatican City, every corner of Rome tells a story of its rich and illustrious past. Visitors can wander through the cobblestone streets of the historic center, marvel at the intricate details of Renaissance art in the Vatican Museums, or toss a coin into the Trevi Fountain to ensure a return visit. Beyond its historical significance, Rome offers a vibrant and dynamic atmosphere, with bustling piazzas, lively markets, and charming cafes at every turn. Indulge in traditional Roman cuisine, savoring mouthwatering pasta dishes and gelato under the Mediterranean sun. Whether exploring ancient ruins, admiring world-renowned art, or simply soaking in the city\'s timeless charm, a vacation in Rome promises an enriching and enchanting experience that will linger in the heart and mind forever.','2024-05-20','2024-06-01',670.00,NULL),(4,'Limasol (cruise)','Embarking on a two-day cruise to Limassol promises a brief yet enriching escape filled with relaxation, exploration, and discovery. As the ship glides through the cerulean waters of the Mediterranean Sea, passengers are treated to panoramic views of the coastline, with the shimmering waves providing a soothing backdrop to the journey. Limassol, Cyprus\'s vibrant coastal city, awaits with its blend of ancient history, modern amenities, and Mediterranean charm. With limited time, travelers can make the most of their visit by immersing themselves in the city\'s cultural treasures, such as exploring the medieval Limassol Castle or strolling through the lively Old Town filled with charming cafes and boutique shops. Alternatively, a leisurely day can be spent lounging on Limassol\'s pristine beaches, basking in the warm Mediterranean sun and enjoying refreshing dips in the azure waters. As the sun sets on the second day, passengers bid farewell to Limassol, carrying with them memories of a brief but unforgettable cruise experience filled with relaxation, exploration, and the allure of the Mediterranean coast.','2024-07-03','2024-07-05',400.00,NULL),(5,'Bogota','Embarking on a two-week trip to Bogotá promises a diverse and captivating exploration of Colombia\'s vibrant capital city. Nestled high in the Andes Mountains, Bogotá offers a rich tapestry of culture, history, and natural beauty waiting to be discovered. Over the course of two weeks, travelers can immerse themselves in the city\'s bustling streets, vibrant neighborhoods, and thriving arts scene. From the historic La Candelaria district with its colonial architecture and colorful street art to the bustling markets of Usaquén, there\'s no shortage of sights to explore. Visitors can delve into Colombia\'s rich history and culture with visits to world-class museums like the Gold Museum and the Botero Museum, or take in panoramic views of the city from the summit of Monserrate. Beyond the city limits, day trips to nearby attractions such as the Salt Cathedral of Zipaquirá or the lush landscapes of the Cocora Valley offer a glimpse into Colombia\'s natural wonders. Throughout the trip, indulging in Colombia\'s famed culinary delights, from hearty Colombian stews to fresh tropical fruits, is a must. With two weeks to explore Bogotá and its surroundings, travelers are sure to uncover the many layers of this dynamic and captivating city, leaving with memories to last a lifetime.','2023-03-11','2023-03-25',1000.00,NULL),(6,'Tulum','A vacation in Tulum during the Zamna Festival offers a unique and immersive experience that blends music, culture, and natural beauty. Set against the backdrop of Tulum\'s stunning coastline and ancient Mayan ruins, the Zamna Festival brings together renowned electronic music artists from around the world for an unforgettable celebration of sound and spirit. As the rhythms pulse through the air, festival-goers can dance beneath the stars, surrounded by the lush jungle and crystal-clear waters of the Caribbean Sea. Beyond the music, the Zamna Festival also offers a chance to connect with local traditions and rituals, with opportunities to participate in ceremonies led by indigenous Mayan elders. During the day, attendees can explore the enchanting cenotes, relax on pristine white-sand beaches, or embark on eco-adventures through the jungle. Whether dancing until dawn, immersing oneself in ancient wisdom, or simply basking in the beauty of Tulum\'s natural surroundings, a vacation during the Zamna Festival promises an unforgettable blend of music, culture, and enchantment.','2024-01-10','2024-01-17',1200.00,NULL),(7,'Istanbul','A trip to Istanbul in August offers a mesmerizing fusion of history, culture, and modernity against the backdrop of the vibrant cityscape and the shimmering waters of the Bosphorus. As one of the world\'s most iconic cities, Istanbul beckons travelers with its rich tapestry of ancient landmarks, bustling bazaars, and lively street scenes. In August, the city is alive with energy as locals and tourists alike flock to its historic sites, such as the awe-inspiring Hagia Sophia, the majestic Blue Mosque, and the sprawling Topkapi Palace. Amidst the summer heat, visitors can seek refuge in the cool, dimly lit interiors of the city\'s centuries-old mosques, where intricate tile work and soaring domes offer respite from the sun. Meanwhile, the bustling markets of the Grand Bazaar and the Spice Bazaar tempt with their colorful displays of textiles, spices, and handicrafts, providing a sensory feast for the senses. In the evenings, the city comes alive with the sounds of traditional music and the aromas of Turkish cuisine wafting through the air, inviting travelers to savor the delights of meze, kebabs, and baklava in atmospheric rooftop restaurants overlooking the illuminated skyline. With its blend of ancient allure and contemporary charm, a trip to Istanbul in August promises an unforgettable journey through time and culture.','2024-08-09','2024-08-14',500.00,NULL),(8,'Bansco','Embarking on a six-day ski trip to Bansko, Bulgaria, offers an immersive experience in one of Eastern Europe\'s most captivating winter destinations. Nestled amidst the majestic Pirin Mountains, Bansko boasts a ski resort renowned for its pristine slopes, modern facilities, and vibrant après-ski scene. Over the course of six days, enthusiasts can explore the vast expanse of Bansko\'s ski area, featuring trails suitable for all skill levels, from gentle beginner slopes to challenging black diamond runs. State-of-the-art lifts ensure swift access to the mountain, allowing ample time for exhilarating descents and breathtaking mountain vistas. Away from the slopes, Bansko\'s charming old town beckons with its cobblestone streets, historic architecture, and cozy taverns serving up hearty Bulgarian cuisine and warming mulled wine. Visitors can also indulge in après-ski relaxation at the resort\'s spas or explore the region\'s cultural heritage through visits to nearby historical sites and museums. With its blend of thrilling outdoor adventures and cultural immersion, a six-day ski trip to Bansko promises an unforgettable winter escape in the heart of Bulgaria\'s alpine paradise','2024-12-12','2024-12-18',550.00,NULL),(9,'Eilat','For Israeli families seeking a summer vacation without leaving the country, Eilat stands out as an ideal destination. Nestled at the southern tip of Israel, Eilat boasts a unique blend of sun, sea, and desert landscapes, offering an array of attractions and activities suitable for all ages. Families can spend their days soaking up the sun on Eilat\'s pristine beaches, where crystal-clear waters teeming with colorful marine life beckon for snorkeling and diving adventures. For those seeking a break from the heat, the city offers a wealth of indoor attractions, including the Underwater Observatory Marine Park and the Coral World Underwater Observatory, where kids can marvel at exotic sea creatures up close. Adventure enthusiasts can explore the surrounding desert terrain on jeep tours or camel rides, while thrill-seekers can get their adrenaline pumping at the nearby water parks and amusement parks. In the evenings, families can enjoy leisurely strolls along Eilat\'s bustling promenade, indulging in delicious local cuisine and soaking in the vibrant atmosphere. With its year-round sunshine, diverse activities, and family-friendly amenities, Eilat provides the perfect summer getaway for Israeli families looking to create lasting memories without venturing far from home.','2024-08-02','2024-08-06',300.00,NULL),(10,'Madrid','A vacation to Madrid offers an exciting blend of cultural exploration and thrilling sports experiences, with the added excitement of catching a game played by one of the world\'s most renowned football clubs, Real Madrid. Nestled in the heart of Spain, Madrid boasts a rich tapestry of history, art, and gastronomy, making it a captivating destination for travelers of all interests. Visitors can spend their days exploring the city\'s iconic landmarks, such as the Royal Palace, Prado Museum, and Retiro Park, immersing themselves in the vibrant atmosphere of Madrid\'s bustling streets and lively plazas. However, the highlight of the trip for many sports enthusiasts is attending a match at the legendary Santiago Bernabéu Stadium, home to Real Madrid. The stadium\'s electrifying atmosphere and passionate fans create an unforgettable experience as spectators cheer on their favorite players amidst the excitement of a live football match. Whether exploring Madrid\'s cultural treasures or cheering on Real Madrid from the stands, a vacation to Madrid promises an unforgettable blend of sports and culture that will leave travelers with cherished memories for years to come.','2024-10-25','2024-11-02',900.00,NULL),(12,'Rhodes','A vacation to Rhodes in August offers an enchanting journey through history and natural beauty on the largest of Greece\'s Dodecanese islands. Nestled in the Aegean Sea, Rhodes boasts a rich tapestry of ancient ruins, medieval architecture, and stunning beaches, making it a captivating destination for travelers seeking a blend of culture and relaxation. Visitors can spend their days exploring the island\'s UNESCO World Heritage-listed Old Town, where narrow cobblestone streets lead to historic landmarks such as the Palace of the Grand Master and the ancient Acropolis of Rhodes. Meanwhile, sun-seekers can bask in the Mediterranean sun on the island\'s golden shores, from the bustling beaches of Faliraki to the secluded coves of Anthony Quinn Bay. In the evenings, the island comes alive with the sounds of traditional Greek music and the aromas of local cuisine, inviting travelers to indulge in authentic dishes at waterfront tavernas or sip cocktails at chic beach bars. With its rich history, stunning landscapes, and warm hospitality, a vacation to Rhodes in August promises an unforgettable island escape filled with adventure and relaxation.','2024-08-01','2024-08-07',450.00,NULL),(13,'Maldives','A honeymoon in the Maldives promises an idyllic escape into paradise, where crystal-clear waters, powder-white beaches, and luxurious accommodations create the perfect setting for romance and relaxation. Nestled in the heart of the Indian Ocean, the Maldives is renowned for its secluded island resorts, offering couples a private sanctuary amidst breathtaking natural beauty. From the moment of arrival, honeymooners are greeted with warm hospitality and personalized service, ensuring that every moment of their stay is nothing short of magical. Days can be spent lounging on pristine beaches, indulging in couples\' spa treatments, or embarking on underwater adventures amidst vibrant coral reefs teeming with marine life. As the sun sets, couples can enjoy candlelit dinners under the stars, savoring gourmet cuisine and fine wines against a backdrop of panoramic ocean views. Whether strolling hand in hand along the water\'s edge, watching the sunset from a private overwater villa, or simply enjoying each other\'s company in a hammock suspended over the turquoise lagoon, a honeymoon in the Maldives promises a romantic getaway that will be cherished for a lifetime.','2024-07-06','2024-07-20',1500.00,NULL);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-22 10:11:55
