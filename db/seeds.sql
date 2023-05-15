INSERT INTO department
    (department_name)
VALUES
    ('Logistics'),
    ('Sales'),
    ('Finance'),
    ('Human Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Import Manager', 75000, 1),
    ('Senior Account Manager', 60000, 2),
    ('Junior Accountant', 55000, 3),
    ('HR Manager', 65000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Paul', 'Koehler', 1, 1),
    ('Sydney', 'Frasure', 2, 2),
    ('Lucy', 'Schroeder', 3, 3),
    ('Bob', 'Hoskins', 4, 4),