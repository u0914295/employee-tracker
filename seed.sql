INSERT INTO department (name)
VALUES ("Marketing"),
       ("Development"),
       ("Accounting"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 90000, 1),
       ("Marketing Specialist", 60000, 1),
       ("Software Engineer", 120000, 2),
       ("Web Developer", 80000, 2),
       ("Accountant", 70000, 3),
       ("HR Specialist", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Smith", 2, 1),
       ("Mike", "Johnson", 3, NULL),
       ("Sara", "Williams", 4, 3),
       ("James", "Brown", 5, NULL),
       ("Linda", "Davis", 6, NULL);