## Create mysql user
1) Open the mysql folder and login
```
C:\Users\Name>cd C:\Program Files\MySQL\MySQL Server 8.0\bin
C:\Program Files\mysql\bin>mysql -u root -p
```

2) Let’s start by making a new user within the MySQL shell:
```
mysql> CREATE USER 'newuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Secret123';
```
3) Provide the user with access to the information they will need.
```
mysql> GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```

4) Reload all the privileges.
```
mysql> FLUSH PRIVILEGES;
```

5) Run dbinti.sql script to initialize database.

6) (Optional) Change .env config.
```
By default:
DB_USERNAME="newuser1"
DB_PASSWORD ="Secret321"
DB_HOST= "localhost"
DB_PORT="3306"
DB_DBNAME="productdb"
```

## Run node.js
```
C:\Users\Your Name>npm run dev
```

## Load package for mysql
> You can delete "node_modules" folder. Then, install with this code.
```
C:\Users\Your Name>npm run install
```

