CREATE TABLE users (userId INT NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, password varchar(255) NOT NULL,PRIMARY KEY(userId));

CREATE TABLE blogs (userId INT NOT NULL, blogNum INT NOT NULL AUTO_INCREMENT, blog varchar(255), FOREIGN KEY(userId) REFERENCES users(userId), PRIMARY KEY(blogNum));

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
