// Import requirements
const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const { Triangle, Square, Circle } = require('./shapes');

// Arrow-Function to validate logo text is not empty or not longer than 3 characters.
const logoValidation = input => {
    if (input.length == 0 || input.length > 3) {
        return 'Invalid. Try again.';
    }

    return true;
}

// Arrow-Function to validate user input of hex color, otherwise return true if user entered a color string.
// ** Note **
// There is no proper validation check for string-based colors, nor is there a proper color string conversion to a hex color.
// This version is heavily reliant on the user entering a valid color string, otherwise will default to 'black' as the preferred color choice.
const colorHexValidation = input => {
    if (input.startsWith('#')) {
        const regHexColorExp = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
        
        if (!regHexColorExp.test(input)) {
            return "Invalid Hex Color. Try again."
        }
    }

    return true;
}

// Un-manipulated array set of questions for Inquirer prompt()
const questions = [
    {
        type: 'input',
        name: 'textLogo',
        message: 'Enter up to three characters for the text logo:',
        validate: logoValidation
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color name or its hexadecimal number for the text logo:',
        validate: colorHexValidation
    },
    {
        type: 'list',
        name: 'logoShape',
        message: 'Choose one of the following logo shapes:',
        choices: ['Circle', 'Triangle', 'Square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color name or its hexadecimal number for the logo shape:',
        validate: colorHexValidation
    },
];

// Command-Line-Interface class that will handle all logic that will appear in the terminal
class CLI {
    run() {
        // Within the run() function, proceed with the following chain of actions
        return inquirer.prompt(questions)
        .then((data) => {
            let shape;
            if (data.logoShape === 'Circle') {
                shape = new Circle(data.textLogo, data.textColor, data.shapeColor);
            } else if (data.logoShape === 'Triangle') {
                shape = new Triangle(data.textLogo, data.textColor, data.shapeColor);
            } else if (data.logoShape === 'Square') {
                shape = new Square(data.textLogo, data.textColor, data.shapeColor);
            }

            return shape;
        })
        .then((shape) => {
            return writeFile(join(__dirname, '..', 'examples', 'logo.svg'), 
            `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shape.render()}<text x="50%" y="50%" font-size="60" dominant-baseline="middle" text-anchor="middle" fill="${shape.textColor}">${shape.textLogo}</text></svg>`);
        })
        .then(() => console.log('Generated logo.svg'))
        .catch((err) => console.log('Error!', err));
        // If promise chain fails, catch() will inform the user of the error
    }
}

// Exporting CLI class to index.js
module.exports = CLI;