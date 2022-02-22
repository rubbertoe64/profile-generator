const inquirer = require('inquirer')
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const fs = require('fs')

// stores employee object with their given roles in the array as well as the team name
const profile = {
    teamName: '',
    employees: [],
}

// list of all employees
const listofEmployees = [];

// init function, starts by asking for Team Name, which is also the HTML File name. Also calls the addEmployee function which asks the rest of the questions
function init() {
    inquirer.prompt([
        {
            type: "input",
            name: "team",
            message: "Enter Team Name"  
        }, 
    ])
    .then((data) => {
        profile.teamName = data.team
    })
    .then(() => {
        addEmployee();
    })
    
}
// asks for name, id, and email and deponding on choices, will ask for different infor according to the role chose
function addEmployee(){
    inquirer.prompt([
    
    {
        type: "list",
        name: "role",
        message: "Emter Role",
        choices: ['Employee', 'Intern', 'Engineer', 'Manager']
    },
    {
        type: "input",
        name: "name",
        message: "Enter employee name",
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID Number",
    },
    {
        type: "input",
        name: "email",
        message: "Enter email",
    },
    {
        type: "input",
        name: "school",
        message: "Enter School",
        when: (answer) => answer.role === "Intern"
    },
    {
        type: "input",
        name: "github",
        message: "Enter Github username",
        when: (answer) => answer.role === "Engineer"
    },
    {
        type: "input",
        name: "officenumber",
        message: "Enter office number",
        when: (answer) => answer.role === "Manager"
    }
    
    
])
// has newGuy become whichever role is chosen
 .then((data) => {
     let newGuy;
    switch (data.role) {
        case "Employee":
            newGuy = new Employee(data.name, data.id, data.email)
            break;
        case "Intern":
            newGuy = new Intern(data.name, data.id, data.email, data.school)
            break;
        case "Engineer":
            newGuy = new Engineer(data.name, data.id, data.email, data.github)
            break;
        case "Manager":
            newGuy = new Manager(data.name, data.id, data.email, data.officenumber)
            break;

        default:
            break;
    }

    // newGuy gets put int he listofEmployees array
    listofEmployees.push(newGuy)
     
 })
//  starts the loop of asking if you wanna add more people or stop and then generate the HTML file
 .then(()=>{
     inquirer.prompt([
         {
             type: "list",
             name: "continue",
             message: "Add another person?",
             choices: ['Yes', "No"],
         },
     ])
     .then((data) => {
         if (data.continue === 'Yes') {
             addEmployee();
         } else {
             profile.employees = listofEmployees;
             writeToFile(profile);
             
         }
     })
 })
}
// this will generate the actual content for the HTML
function generateHTML(prof){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <title> ${prof.teamName} </title>
    </head>
    <body>
        <div>
            <header class=" d-flex justify-content-center display-4 bg-primary text-light p-5">${prof.teamName}</header>
        </div>
        <div style="margin: 0 15rem;">
    
            <div class="card-columns" style="display: grid; grid-template-columns:  repeat( auto-fit , minmax(350px, 1fr) );">
                ${prof.employees.map(employee => getEmployeeCard(employee)).join('')}
        
            </div>
        </div>
    </body>
    </html>`
}
// adds the individual cards for the employees
function getEmployeeCard(employee) {
    return `
        <section class="card m-3 col-sm p-3 shadow-lg rounded">
            <h5 class="card-title">${employee.getName()}</h5>
            <h5 class="card-title">${employee.getRole()}</h5>
            <hr>
            <div class="card-text">ID: ${employee.getId()}</div>
            <div class="card-text">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></div>
            ${getRoleProperty(employee)}
        </section>
    `;

}
// gets the Role property  to input in the getEmployeeCard function
function getRoleProperty(employee){
    switch (employee.getRole()) {
        case "Employee":
            return ``
        case "Intern":
            return `<div class="card-text">School: ${employee.getSchool()}</div>`
        case "Engineer":
            return `<div class="card-text">Github: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a></div>`
        case "Manager":
            return `<div class="card-text">Office Number: ${employee.getOfficeNumber()}</div>`
    }
}
// creates the file in the dist folder
function writeToFile(prof){
    fs.writeFileSync(`dist/${prof.teamName}.html`, generateHTML(prof))
}



init();


