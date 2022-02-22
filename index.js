const inquirer = require('inquirer')
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const profile = {
    teamName: '',
    employees: [],
}
const listofEmployees = [];

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

    console.log(newGuy)
    listofEmployees.push(newGuy)
     
 })
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
             console.log(profile)
         }
     })
 })
}

init();



