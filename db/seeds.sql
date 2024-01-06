
INSERT INTO departments (department_name)
VALUES 
("Customer Relations"),
("Engineering"),
("Executive Board"),
("Finance"),
("Human Resources"),
("Information Technology"),
("Marketing"),
("Maintenance"),
("Manufacturing"),
("Research and Development");


INSERT INTO roles (title, salary, department_id)
VALUES 
("Customer Relations Manager", 60000.00, 1),
("Senior Engineer", 190000.00, 2),
("Chief Executive Officer", 600000.00, 3),
("Finance Head", 145000.00, 4),
("HR Director", 175000.00, 5),
("IT Manager", 125000.00, 6),
("Marketing Manager", 125000.00, 7),
("Maintenance Manager", 135000.00, 8),
("Manufacturing Manager", 145000.00, 9),
("Research and Development Manager ", 185000.00, 10);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Thomas", "The Tank Engine", 1, 1),
("Bill", "Nye", 2, 2),
("Henry", "Ford", 3, 3),
("Bill", "Gates", 4, 4),
("Jill", "Waters", 5, 5),
("Carroll", "Shelby", 6, 6),
("Kim", "Un", 7, 7),
("Wendy", "Burgers", 8, 8),
("Ronnald", "McDonald", 9, 9),
("Elon", "Musk", 10, 10);
