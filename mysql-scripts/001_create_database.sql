CREATE DATABASE RelaxPoint;
USE RelaxPoint;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('client', 'employee', 'admin')
);

CREATE TABLE Services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  duration INT
);

CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  service_id INT,
  date DATETIME,
  status ENUM('pending', 'confirmed', 'canceled'),
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(service_id) REFERENCES Services(id)
);
