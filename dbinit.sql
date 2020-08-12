CREATE SCHEMA `productdb` ;
use productdb;
create table `productlist`(
 `productID` int(11) not null auto_increment,
 `product` varchar(45) default null,
 `category` varchar(45) default null,
 primary key(`productID`)
) engine= InnoDB auto_increment =0 default charset =utf8mb4 collate =utf8mb4_0900_ai_ci;


insert into `productlist` (product,category) 
values ('Samsung Galaxy S10','smartphone'),('Iphone 11','smartphone'),('Huawei P40','smartphone'),
("LG 4K TV",'tv'),("PS4","gaming console"),("PS4",'home entertainment'),("XBOX",'home entertainment'),
("XBOX","gaming console"),("Nintendo Switch",'home entertainment'),("Nintendo Switch","gaming console");


