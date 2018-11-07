
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
    employees.forEach((employee) => {
      let employeeData = {
        name: employee.name,
        department: departments.find((dept) => dept.id === employee.dept).name,
        computer: computers.find((comp) => comp.id === employee.computer).model
      }
      let card = employeeCard(employeeData)
      div.innerHTML += card

    })
  })