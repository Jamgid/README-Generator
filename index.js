  
const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");

//array of input prompts that the user will answer, generating the content for the README.md 
inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is your github username?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your title for this Project?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'How would you describe this project?'
    },
    {
        type: 'input',
        name: 'license',
        message: 'What license does this use?',
        default: 'ISC',   
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do you install this application?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe the usage of this application'
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Who all contributed to this project?'
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Do you have any questions?'
    }

    
]).then(function(data) {
    axios
    .get(`https://api.github.com/users/${data.username}`)
    .then(function(res) {
        const readMe = `
## ${data.title}
## ${data.license}
## ${data.username} | ${data.email}
## ![img](${res.data.avatar_url})
## Table of Contents
1. Description
2. Installation
3. Usage
4. Contributors
5. Questions
# Description
${data.description}
# Installation
${data.installation}
# Usage
${data.usage}
# Contributors
${data.contributors}
# Questions
${data.questions}`
      fs.writeFile('README.md', readMe, (err) => {
        if (err) {
            throw err;
        }
    });
    });
});