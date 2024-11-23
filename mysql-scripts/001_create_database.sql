CREATE DATABASE RelaxPoint CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE RelaxPoint;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('client', 'employee', 'admin')
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

CREATE TABLE Services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2),
  duration INT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  service_id INT,
  date DATETIME,
  status ENUM('pending', 'confirmed', 'canceled'),
  FOREIGN KEY(user_id) REFERENCES Users(id),
  FOREIGN KEY(service_id) REFERENCES Services(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO Services (name, price, duration) VALUES 
('Masaż relaksacyjny', 150.00, 60),
('Masaż gorącymi kamieniami', 200.00, 90),
('Masaż sportowy', 180.00, 75),
('Zabieg nawilżający na twarz', 120.00, 45),
('Peeling ciała', 100.00, 30),
('Aromaterapia', 160.00, 50),
('Maska na ciało z algami', 220.00, 70),
('Sauna - seans indywidualny', 80.00, 60),
('Pakiet regeneracyjny (masaż + sauna)', 200.00, 120),
('Zabieg odmładzający dłonie', 70.00, 30);