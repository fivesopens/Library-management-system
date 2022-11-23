/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.5.40 : Database - library
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`library` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `library`;

/*Table structure for table `admintable` */

DROP TABLE IF EXISTS `admintable`;

CREATE TABLE `admintable` (
  `workerId` int(11) NOT NULL,
  `workerPwd` varchar(20) NOT NULL,
  `workerName` varchar(15) NOT NULL,
  `workerIdcard` varchar(40) NOT NULL,
  `adminSex` varchar(5) NOT NULL,
  `adminPhone` varchar(50) NOT NULL,
  `Post` varchar(10) DEFAULT NULL,
  `Permissions` varchar(5) DEFAULT NULL,
  `Sate` varchar(10) NOT NULL,
  PRIMARY KEY (`workerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admintable` */

insert  into `admintable`(`workerId`,`workerPwd`,`workerName`,`workerIdcard`,`adminSex`,`adminPhone`,`Post`,`Permissions`,`Sate`) values (1,'123','张三','350902211007220021','男','13524578452','店长','管理员','在岗'),(2,'456','李四','350902200006220034','男','13514578965','副店长','管理员','在岗'),(3,'111','五五','357212200007221132','男','13514578541','职工','职工','在岗'),(4,'111','小红','352020111021775523','女','13547854213','职工','职工','退休'),(5,'111','小白','254657885220445530','女','13545478545','职工','职工','离职');

/*Table structure for table `bookstable` */

DROP TABLE IF EXISTS `bookstable`;

CREATE TABLE `bookstable` (
  `booksId` int(11) NOT NULL,
  `booksName` varchar(15) NOT NULL,
  `booksAuthor` varchar(15) NOT NULL,
  `ISBN` int(11) NOT NULL,
  `booksState` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`booksId`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `bookstable_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `ordertable` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `bookstable` */

insert  into `bookstable`(`booksId`,`booksName`,`booksAuthor`,`ISBN`,`booksState`) values (1,'数据库','李四',1,NULL),(2,'软件工程','李白',2,NULL);

/*Table structure for table `borrowingtable` */

DROP TABLE IF EXISTS `borrowingtable`;

CREATE TABLE `borrowingtable` (
  `userId` int(11) NOT NULL,
  `booksId` int(11) NOT NULL,
  `borrowingTime` datetime NOT NULL,
  `returnTime` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`,`booksId`),
  KEY `booksId` (`booksId`),
  CONSTRAINT `borrowingtable_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usertable` (`userId`),
  CONSTRAINT `borrowingtable_ibfk_2` FOREIGN KEY (`booksId`) REFERENCES `bookstable` (`booksId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `borrowingtable` */

insert  into `borrowingtable`(`userId`,`booksId`,`borrowingTime`,`returnTime`) values (1,2,'2022-05-04 16:11:00','2022-05-27 16:11:04'),(2,1,'2022-05-03 16:14:14','2022-05-27 16:14:18');

/*Table structure for table `ordertable` */

DROP TABLE IF EXISTS `ordertable`;

CREATE TABLE `ordertable` (
  `ISBN` int(11) NOT NULL,
  `suppliersId` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `suppliersId` (`suppliersId`),
  CONSTRAINT `ordertable_ibfk_1` FOREIGN KEY (`suppliersId`) REFERENCES `supplierstable` (`suppliersId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ordertable` */

insert  into `ordertable`(`ISBN`,`suppliersId`,`Number`) values (1,1,100),(2,2,200);

/*Table structure for table `supplierstable` */

DROP TABLE IF EXISTS `supplierstable`;

CREATE TABLE `supplierstable` (
  `suppliersId` int(11) NOT NULL,
  `suppliersName` varchar(15) NOT NULL,
  `suppliersPhone` varchar(50) NOT NULL,
  `suppliersAddress` varchar(50) NOT NULL,
  PRIMARY KEY (`suppliersId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `supplierstable` */

insert  into `supplierstable`(`suppliersId`,`suppliersName`,`suppliersPhone`,`suppliersAddress`) values (1,'新华书店','13515755247','福建省福州市'),(2,'搜索书店','13515478542','福建省厦门市');

/*Table structure for table `usertable` */

DROP TABLE IF EXISTS `usertable`;

CREATE TABLE `usertable` (
  `userId` int(11) NOT NULL,
  `userName` varchar(15) NOT NULL,
  `userIdcard` varchar(40) NOT NULL,
  `userSex` varchar(5) NOT NULL,
  `userPhone` varchar(50) NOT NULL,
  `Penalty` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usertable` */

insert  into `usertable`(`userId`,`userName`,`userIdcard`,`userSex`,`userPhone`,`Penalty`) values (1,'小小','350902200007880023','女','13515785452',0),(2,'笑笑','350882200007220034','女','13515024852',100);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
