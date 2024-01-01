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
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start_app();
    });
}

// Function to view all roles
function viewAllRoles() {
    const query = 'SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start_app();
    });
}

// Function to view all employees
function viewAllEmployees() {
    const query = `SELECT e.id, e.first_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
                    FROM employee e
                    LEFT JOIN roles r ON e.role_id = r.id
                    LEFT JOIN departments d ON r.department_id = d.id
                    LEFT JOIN employee m ON e.manager_id = m.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start_app();
    });
}

// Function to add a department
function addDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
    })
    .then((answer) => {
        console.log(answer.name);
        const query = `INSERT INTO departments (department_name) VALUES ('${answer.name}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            start_app();
        });
    });
}

// Function to add a role
function addRole() {

}

// Function to add an employee
function addEmployee() {
    
}

// Function to add a manager


// Function to update an employee's role


// Function to view employees by manager


// Function to view employees by department


// Function to delete employee


// Function to delete role


// Function to delete department


// Function to delete employee, department, and role


// Function to view utilized budget of a department
function viewBudgetofDepartment(){
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if (err) throw err;
        const departmentChoices = res.map((department) => ({
            name: department.department_name,
            value: department.id,
        }));
        inquirer
        .prompt({
            type: 'list',
            name: 'department_id',
            message: 'Which department would you like to calculate the total salary for?',
            choices: departmentChoices,
        })
        .then ((answer) => {
            const query = `SELECT 
                                department.department_name AS department
                                SUM(roles.salary) AS total_salary
                            FROM 
                                departments 
                                INNER JOIN roles ON departments.id = roles.department_id
                                INNER JOIN employee ON roles.id = employee.role_id
                            WHERE
                                department.id = ?
                            GROUP BY
                                department.id;`;
            connection.query(query, [answer.department_id], (err, res) => {
                if (err) throw err;
                const total_salary = res[0].total_salary;
                console.log(`The total salary for employees in this department is $${total_salary}`);
                start_app();              
            })
        })
    })
}
// Close the connection when application exits
process.on('exit', () => {
    connection.end();
});