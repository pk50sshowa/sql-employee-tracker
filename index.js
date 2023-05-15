const util = require('util');
const inquirer = require('inquirer');
const db = require('./db/connection');
db.query = util.promisify(db.query);

async function openingMenu() {
  console.table(
    "\nE-M-P-L-O-Y-E-E T-R-A-C-K-E-R\n"
  );

  inquirer
    .createPromptModule({
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

};

function viewRoles() {
  
};

function viewEmployees() {
  
};

function addDepartment() {
  
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