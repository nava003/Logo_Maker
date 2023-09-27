const inquirer = require('inquirer');
const { join } = require('path');
const { writeFile } = require('fs/promises');
const { Triangle, Square, Circle } = require('./shapes');

const questions = [
    {
        type: 'input',
        name: 'textLogo',
        message: 'Enter up to three characters for the text logo:',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color name or its hexadecimal number for the text logo:',
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
    },
];

class CLI {
    run() {
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
            `<svg width="300" height="200">${shape.render()}<text x="50%" y="50%" font-size="60" dominant-baseline="middle" text-anchor="middle" fill="${shape.textColor}">${shape.textLogo}</text></svg>`);
        })
        .then(() => console.log('Generated logo.svg'))
    }
}

module.exports = CLI;