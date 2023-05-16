const util = require('util');
const inquirer = require('inquirer');
const db = require('./db/connection');
db.query = util.promisify(db.query);

async function openingMenu() {
  console.table(
    "\nE-M-P-L-O-Y-E-E T-R-A-C-K-E-R\n"
  );

  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Please select a choice from the following list.',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;
          
        case 'View all employees':
          viewEmployees();
          break;
        
        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;
  
        case 'Add an employee':
          addEmployee();
          break;
            
        case 'Update an employee role':
          updateEmployeeRole();
          break;
          
        case 'Quit':
          db.end();
          return;  
      }
    });
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      openingMenu();
    }
  });
}

function viewRoles() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      openingMenu();
    }
  });
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      openingMenu();
    }
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      db.query(
        'INSERT INTO department (department_name) VALUES (?)',
        [answer.name],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Department added successfully!');
            openingMenu();
          }
        }
      );
    });
};

function addRole() {
  db.query('SELECT * FROM department', (err, department) => {
    if (err) {
      console.error(err);
    } else {
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the role name:',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter the role salary:',
          },
          {
            name: 'department',
            type: 'list',
            message: 'Choose the department for the role:',
            choices: department.map((department) => department.department_name),
          },
        ])
        .then((answers) => {
          const departmentId = department.find(
            (department) => department.department_name === answers.department
          ).id;

          db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.title, answers.salary, departmentId],
            (err, results) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Role added successfully!');
                openingMenu();
              }
            }
          );
        });
    }
  });
};

function addEmployee() {
  db.query('SELECT * FROM role', (err, role) => {
    if (err) {
      console.error(err);
      openingMenu();
    } else {
      db.query('SELECT * FROM employee', (err, managers) => {
        if (err) {
          console.error(err);
          openingMenu();
        } else {
          inquirer
            .prompt([
              {
                name: 'first_name',
                type: 'input',
                message: 'Enter the employee\'s first name:',
              },
              {
                name: 'last_name',
                type: 'input',
                message: 'Enter the employee\'s last name:',
              },
              {
                name: 'role',
                type: 'list',
                message: 'Select the employee\'s role:',
                choices: role.map((role) => role.title),
              },
              {
                name: 'manager',
                type: 'list',
                message: 'Select the employee\'s manager:',
                choices: managers.map((manager) => `${manager.first_name} ${manager.last_name}`),
              },
            ])
            .then((answer) => {
              const roleId = role.find((role) => role.title === answer.role).id;
              
              const managerId = managers.find((manager) => `${manager.first_name} ${manager.last_name}` === answer.manager).id;

              db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [answer.first_name, answer.last_name, roleId, managerId],
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee added successfully!');
                  }
                  openingMenu();
                }
              );
            });
        }
      });
    }
  });
};

function updateEmployeeRole() {
  
};

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  openingMenu();
});