CREATE SCHEMA `productdb` ;
use productdb;
create table `productlist`(
 `productID` int(11) not null auto_increment,
 `product` varchar(45) default null,
 primary key(`productID`)
) engine= InnoDB auto_increment =0 default charset =utf8mb4 collate =utf8mb4_0900_ai_ci;

create table `categorylist`(
 `categoryID` int(11) not null auto_increment,
 `category` varchar(45) default null,
  primary key(`categoryID`)
) engine= InnoDB auto_increment =0 default charset =utf8mb4 collate =utf8mb4_0900_ai_ci;

create table `product_category`(
 `productID` int(11) not null,
 `categoryID` int(11) not null,
 FOREIGN KEY (productID) REFERENCES productlist(productID) ON DELETE CASCADE,
 FOREIGN KEY (categoryID) REFERENCES categorylist(categoryID) ON DELETE CASCADE
) engine= InnoDB auto_increment =0 default charset =utf8mb4 collate =utf8mb4_0900_ai_ci;

SET SQL_SAFE_UPDATES = 0;

insert into `productlist` (product) 
values ('Samsung Galaxy S10'),('Iphone 11'),('Huawei P40'),("LG 4K TV"),("PS4"),("XBOX"),("Nintendo Switch");

insert into `categorylist` (category) 
values ('smartphone'),('tv'),('home entertainment'),("gaming console"),("home audio");

insert into `product_category`
values (1,1),(2,1),(3,1),(4,2),(4,5),(5,5),(5,3),(5,4),(6,3),(6,4),(7,3),(7,4);

