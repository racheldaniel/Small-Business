
// A small business wants to keep track of its employees and the computers that they use. Each employee is assigned to a department, and they each get assigned a computer when they join the company.

// Build arrays of objects that represent Employees, Departments, and Computers.
// Assign every resource a unique id property.
// Assign each employee to a department using a foreign key.
// Assign each employee a computer using a foreign key.
// Once your data is normalized, use your DOM skills to display a card for each employee. It should display the employee name, the name of their department, and which computer they are using

//end goal for DOM, will need to loop through employees, depts and comps
const employeeCard = (object) => {
  let html = 
  `<article class="employee">
    <header class="employee__name">
        <h1>${object.name} </h1>
    </header>
    <section class="employee__department">
        Works in the ${object.dept} department
    </section>
    <section class="employee__computer">
        Currently using a(n) ${object.computer}
    </section>
</article>`
return html
}




//do three fetches to get all API data, then use promises.all() and loop through-- create a new, local object with values needed for employee card
let div = document.querySelector("#employees")

let employeeQuery = fetch(`http://localhost:8088/employees`).then((employeeData) => employeeData.json())
let departmentQuery = fetch(`http://localhost:8088/departments`).then((deptData) => deptData.json())
let computerQuery = fetch(`http://localhost:8088/computers`).then((computerData) => computerData.json())

Promise.all([employeeQuery, departmentQuery, computerQuery])
.then((employeeDetails) => {
  let employees = employeeDetails[0]
  let departments = employeeDetails[1]
  let computers = employeeDetails[2]
  employees.forEach((employee) => {    //TODO: change all to .find()
    departments.forEach((department) => {
      if (employee.dept === department.id) {
        employee.dept = department.name
      }
    })
    computers.forEach((computer) => {
      if (employee.computer === computer.id) {
        employee.computer = computer.model
      }
    })
    return employees
  }) 
    employees.forEach((employee) => {
     let card =  employeeCard(employee)
     div.innerHTML += card
    })
})
