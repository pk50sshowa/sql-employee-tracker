const util = require('util');
const inquirer = require('inquirer');
const db = require('./db/connection');
db.query = util.promisify(db.query);

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  employee_track_main();
});

async function queryMyDatabase() {
    let result = await db.query("Select * from  mytable")
    console.log(result)
  }

let rolesArr = await db.query("select id as value, title as name from role");

const answers = await inquirer.prompt([
{
    "type": "list",
    "name": "roleId",
    "message": "what is the new role?",
    "choices": rolesArr
 }])
 ;