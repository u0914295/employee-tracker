var mysql = require("mysql2");
var inquirer = require("inquirer");
var cTable = require('console.table');
var figlet = require('figlet');

var connection = mysql.createConnection({
    host: "34.174.92.52", 
    port: 3306, 
    user: "uk4jscjwizkqa", 
    password: "3~$b%3f5PJ(t", 
    database: "dbhk9a74xpp03u"
});

connection.connect(err => {
    if(err) throw err;
    startApp();
});

function startApp() {
    figlet.text('Employee\nManager', {font: 'Slant'}, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log('-------------------------------------------------\n\n' 
        + data + 
        '\n\n-------------------------------------------------\n\n')
        start();
    });
}

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Update employee managers",
            "View employees by manager",
            "View employees by department",
            "Delete departments, roles, and employees",
            "View the total utilized budget of a department",
            "Exit"
        ]
    })
    .then(({ action }) => {
        switch (action) {
            case "View all departments":
                return viewAllDepartments();
            case "View all roles":
                return viewAllRoles();
            case "View all employees":
                return viewAllEmployees();
            case "Add a department":
                return addDepartment();
            case "Add a role":
                return addRole();
            case "Add an employee":
                return addEmployee();
            case "Update an employee role":
                return updateEmployeeRole();
            case "Update employee managers":
                return updateEmployeeManager();
            case "View employees by manager":
                return viewEmployeesByManager();
            case "View employees by department":
                return viewEmployeesByDept();
            case "Delete departments, roles, and employees":
                return deleteFromDatabase();
            case "View the total utilized budget of a department":
                return viewTotalUtilizedBudget();
            default:
                connection.end();
        }
    });
}

function viewAllDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt({
            name: "department",
            type: "input",
            message: "What is the department name that you want to add?",
            validate: function(value) {
                var pass = value.match(
                  /^[A-Za-z\s]+$/gi
                );
                if (pass) {
                  return true;
                }

                return 'Please enter a valid department name';
            }
    })
    .then(answer => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department,
            },
            (err) => {
                if (err) throw err;
                console.log(`The department ${answer.department} has been created`);
                start();
            }
        )
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title that you want to add?",
            validate: function(value) {
                var pass = value.match(
                  /^[A-Za-z\s]+$/gi
                );
                if (pass) {
                  return true;
                }

                return 'Please enter a valid role title';
            }
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?",
            validate: function(value) {
                var pass = value.match(
                  /^\d+$/gi
                );
                if (pass) {
                  return true;
                }

                return 'Please enter a valid number for salary';
            }
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id for this role?",
            validate: function(value) {
                var pass = value.match(
                  /^\d+$/gi
                );
                if (pass) {
                  return true;
                }

                return 'Please enter a valid number for department id';
            }
        },
    ])
    .then(answer => {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            (err) => {
                if (err) throw err;
                console.log(`The role ${answer.title} has been created`);
                start();

              }
              )
          });
      }
      
      function addEmployee() {
          inquirer.prompt([
              {
                  name: "first_name",
                  type: "input",
                  message: "What is the employee's first name you want to add?",
                  validate: function(value) {
                      var pass = value.match(
                        /^[A-Za-z\s]+$/gi
                      );
                      if (pass) {
                        return true;
                      }
      
                      return 'Please enter a valid first name';
                  }
              },
              {
                  name: "last_name",
                  type: "input",
                  message: "What is the employee's last name?",
                  validate: function(value) {
                      var pass = value.match(
                        /^[A-Za-z\s]+$/gi
                      );
                      if (pass) {
                        return true;
                      }
      
                      return 'Please enter a valid last name';
                  }
              },
              {
                  name: "role_id",
                  type: "input",
                  message: "What is the role id for this employee?",
                  validate: function(value) {
                      var pass = value.match(
                        /^\d+$/gi
                      );
                      if (pass) {
                        return true;
                      }
      
                      return 'Please enter a valid number for role id';
                  }
              },
              {
                  name: "manager_id",
                  type: "input",
                  message: "What is the manager id for this employee?",
                  validate: function(value) {
                      var pass = value.match(
                        /^\d+$/gi
                      );
                      if (pass) {
                        return true;
                      }
      
                      return 'Please enter a valid number for manager id';
                  }
              },
          ])
          .then(answer => {
              connection.query(
                  "INSERT INTO employee SET ?",
                  {
                      first_name: answer.first_name,
                      last_name: answer.last_name,
                      role_id: answer.role_id,
                      manager_id: answer.manager_id
                  },
                  (err) => {
                      if (err) throw err;
                      console.log(`The employee ${answer.first_name} ${answer.last_name} has been created`);
                      start();

                    }
                    )
                });
            }
            
            function updateEmployeeRole() {
                inquirer.prompt([
                    {
                        name: "employee_id",
                        type: "input",
                        message: "For which employee (enter employee id) do you want to update the role?",
                        validate: function(value) {
                            var pass = value.match(
                              /^\d+$/gi
                            );
                            if (pass) {
                              return true;
                            }
            
                            return 'Please enter a valid number for employee id';
                        }
                    },
                    {
                        name: "new_role_id",
                        type: "input",
                        message: "What is the new role id for this employee?",
                        validate: function(value) {
                            var pass = value.match(
                              /^\d+$/gi
                            );
                            if (pass) {
                              return true;
                            }
            
                            return 'Please enter a valid number for new role id';
                        }
                    }
                ])
                .then(answer => {
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                        {
                            role_id: answer.new_role_id
                        },
                        {
                            id: answer.employee_id
                        }
                        ],
                        (err) => {
                            if (err) throw err;
                            console.log(`The employee's role has been updated`);
                            start();

                          }
                          )
                      });
                  }
                  
                  function updateEmployeeManager() {
                      inquirer.prompt([
                          {
                              name: "employee_id",
                              type: "input",
                              message: "For which employee (enter employee id) do you want to update the manager?",
                              validate: function(value) {
                                  var pass = value.match(
                                    /^\d+$/gi
                                  );
                                  if (pass) {
                                    return true;
                                  }
                  
                                  return 'Please enter a valid number for employee id';
                              }
                          },
                          {
                              name: "new_manager_id",
                              type: "input",
                              message: "What is the new manager id for this employee?",
                              validate: function(value) {
                                  var pass = value.match(
                                    /^\d+$/gi
                                  );
                                  if (pass) {
                                    return true;
                                  }
                  
                                  return 'Please enter a valid number for new manager id';
                              }
                          }
                      ])
                      .then(answer => {
                          connection.query(
                              "UPDATE employee SET ? WHERE ?",
                              [
                                  {
                                      manager_id: answer.new_manager_id
                                  },
                                  {
                                      id: answer.employee_id
                                  }
                              ],
                              (err) => {
                                  if (err) throw err;
                                  console.log(`The employee's manager has been updated`);
                                  start();
                              }
                          )
                      });
                  }
                  
                  function viewEmployeesByManager() {
                      inquirer.prompt({
                              name: "manager_id",
                              type: "input",
                              message: "Enter the manager id to see his/her employees",
                              validate: function(value) {
                                  var pass = value.match(
                                    /^\d+$/gi
                                  );
                                  if (pass) {
                                    return true;
                                  }
                  
                                  return 'Please enter a valid number for manager id';
                              }
                      })
                      .then(answer => {
                          connection.query(
                              "SELECT * FROM employee WHERE ?",
                              {
                                  manager_id: answer.manager_id
                              },
                              (err, res) => {
                                  if (err) throw err;
                                  console.table(res);
                                  start();

                                }
                                )
                            });
                        }
                        
                        function viewEmployeesByDept() {
                            inquirer.prompt({
                                    name: "department_id",
                                    type: "input",
                                    message: "Enter the department id to see its employees",
                                    validate: function(value) {
                                        var pass = value.match(
                                          /^\d+$/gi
                                        );
                                        if (pass) {
                                          return true;
                                        }
                        
                                        return 'Please enter a valid number for department id';
                                    }
                            })
                            .then(answer => {
                                connection.query(
                                    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE ?",
                                    {
                                        'role.department_id': answer.department_id
                                    },
                                    (err, res) => {
                                        if (err) throw err;
                                        console.table(res);
                                        start();
                                    }
                                )
                            });
                        }
                        
                        function deleteFromDatabase() {
                            inquirer.prompt({
                                name: "choice",
                                type: "list",
                                message: "Which one would you like to delete?",
                                choices: ["Department", "Role", "Employee"]
                            })
                            .then(response => {
                                switch (response.choice) {
                                    case "Department":
                                        deleteDepart();
                                        break;
                                    case "Role":
                                        deleteRole();
                                        break;
                                    case "Employee":
                                        deleteEmployee();
                                        break;
                                    default:
                                        start();
                                }
                            })
                        };
                        
                        function deleteDepart() {
                            inquirer.prompt({
                                name: "id",
                                type: "input",
                                message: "Enter id of the department you want to delete",
                                validate: function(value) {
                                    var pass = value.match(
                                      /^\d+$/gi
                                    );
                                    if (pass) {
                                      return true;
                                    }
                        
                                    return 'Please enter a valid number for department id';
                                }
                            })
                            .then(answer => {
                                connection.query(
                                    "DELETE FROM department WHERE id = ?",
                                    [answer.id],
                                    function(err, res) {
                                        if (err) throw err;
                                        console.log("Department deleted!");
                                        start();
                                    }
                                );
                            })
                        };
                        
                        function deleteRole() {
                            inquirer.prompt({
                                name: "id",
                                type: "input",
                                message: "Enter id of the role you want to delete",
                                validate: function(value) {
                                    var pass = value.match(
                                      /^\d+$/gi
                                    );
                                    if (pass) {
                                      return true;
                                    }
                        
                                    return 'Please enter a valid number for role id';
                                }
                            })
                            .then(answer => {
                                connection.query(
                                    "DELETE FROM role WHERE id = ?",
                                    [answer.id],
                                    function(err, res) {
                                        if (err) throw err;
                                        console.log("Role deleted!");
                                        start();
                                    }
                                );
                            })
                        };
                        
                        function deleteEmployee() {
                            inquirer.prompt({
                                name: "id",
                                type: "input",
                                message: "Enter id of the employee you want to delete",
                                validate: function(value) {
                                    var pass = value.match(
                                      /^\d+$/gi
                                    );
                                    if (pass) {
                                      return true;
                                    }
                        
                                    return 'Please enter a valid number for employee id';
                                }
                            })
                            .then(answer => {
                                connection.query(
                                    "DELETE FROM employee WHERE id = ?",
                                    [answer.id],
                                    function(err, res) {
                                        if (err) throw err;
                                        console.log("Employee deleted!");
                                        start();
                                    }
                                );
                            })
                        };
                        
                        function viewTotalUtilizedBudget() {
                            inquirer.prompt({
                                    name: "department_id",
                                    type: "input",
                                    message: "Enter the department id to see its utilized budget",
                                    validate: function(value) {
                                        var pass = value.match(
                                          /^\d+$/gi
                                        );
                                        if (pass) {
                                          return true;
                                        }
                        
                                        return 'Please enter a valid number for department id';
                                    }
                            })
                            .then(answer => {
                                connection.query(
                                    "SELECT SUM(salary) as utilized_budget FROM role WHERE ?",
                                    {
                                        department_id: answer.department_id
                                    },
                                    (err, res) => {
                                        if (err) throw err;
                                        console.table(res);
                                        start();
                                    }
                                )
                            });
                        }