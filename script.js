const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeesArray = [];

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
    let addAnother;

  do {
    let employeeFirstName = prompt("Enter first name:");
    let employeeLastName = prompt("Enter last name:");
    let salary = prompt("Enter salary");
    if (isNaN(salary) || salary === '') {
        salary = 0;
    } else {
      salary = parseFloat(salary);
    } 
    let newEmployee = {
        firstName: employeeFirstName,
        lastName: employeeLastName,
        salary: salary,
      }
      employeesArray.push(newEmployee);
      addAnother = confirm("Would you like to add another employee?");
  } while (addAnother);

  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  if (employeesArray.length === 0) {
    console.log("No employees to calculate average salary.");
    return;
  }

  let totalSalary = employeesArray.reduce((acc, employee) => acc + employee.salary, 0);
  let averageSalary = totalSalary / employeesArray.length;

  let averageSalaryNoDecimals = Math.round(averageSalary);
  let averageSalaryWithTwoDecimals = averageSalary.toFixed(2);

  let numberOfEmployees = employeesArray.length;

  console.log(`The average employee salary between our ${numberOfEmployees} employee(s) is $${averageSalaryNoDecimals}.`);
  console.log(`The average employee salary between our ${numberOfEmployees} employee(s) is $${averageSalaryWithTwoDecimals}.`);

  return averageSalary;
}
// Get a reference to the #add-employees-btn element

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  if (employeesArray.length === 0) {
    console.log("No employees to select.");
    return;
  }

  let randomIndex = Math.floor(Math.random() * employeesArray.length);

  // Get the random employee
  let randomEmployee = employeesArray[randomIndex];

  // Display the random employee
  console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
