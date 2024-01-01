const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create MYSQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3001,
    user: 'root',
    password: '',
    database: 'employeeTracker_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully conected to the database');
    start_app();
});

// Function to start application
function start_app() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Add a Manager",
                "Update an employee role",
                "View employees by manager",
                "View employees by department",
                "Delete departments | roles | employees",
                "View the total utilized budget of a department",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a manager":
                    addManager();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "View employees by manager":
                    viewEmployeesByManager();
                    break;
                case "View employees by department":
                    viewEmployeesByDepartment();
                    break;
                case "Delete departments | roles | employees":
                    deleteDepartmentsRolesEmployees();
                    break;
                case "View the total utilized budget of a department":
                    viewTotalUtilizedBudgetOfDepartment();
                    break;
                case "Exit":
                    connection.end();
                    console.log("Goodbye!");
                    break;
            }
        });
}

// Function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// Function to view all roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}

// Function to view all employees


// Function to add a department


// Function to add a role


// Function to add an employee

// Function to add a manager

// Function to update an employee's role

// Function to view employees by manager

// Function to view employees by department

// Function to delete employee

// Function to delete role

// Function to delete department

// Function to delete employee, department, and role

// Function to view utilized budget of a department

// Close the connection when application exits