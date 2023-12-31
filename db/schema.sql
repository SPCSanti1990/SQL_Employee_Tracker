DROP DATABASE IF EXISTS emplyeeTracker_db;
CREATE DATABASE emplyeeTracker_db;
USE emplyeeTracker_db;

--- Create table for departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCROMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);

--- Create table for roles
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCROMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

--- Create table for employees
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
role_id INT,
manager_id INT NOT NULL
);