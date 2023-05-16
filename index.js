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
  
};

function addEmployee() {
  
};

function updateEmployeeRole() {
  
};

// async function queryMyDatabase() {
//     let result = await db.query("SELECT * FROM DEPARTMENT")
//     console.log(result)
//   }

// let rolesArr = await db.query("select id as value, title as name from role");

// const answers = await inquirer.prompt([
// {
//     "type": "list",
//     "name": "roleId",
//     "message": "what is the new role?",
//     "choices": rolesArr
//  }])
//  ;

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  openingMenu();
});