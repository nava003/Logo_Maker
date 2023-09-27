const { Triangle, Square, Circle } = require('./shapes');

describe('Triangle', () => {
    it('should create a triangle', () => {
        const shape = new Triangle();
        shape.setColor("blue");
        expect(shape.render()).toEqual('<polygon points="150,0 250,200 50,200" fill="blue"/>');
    })
})

describe('Square', () => {
    it('should create a square', () => {
        const shape = new Square("TES", "Yellow", "Blue");
        shape.setColor("green");
        expect(shape.render()).toEqual('<rect x="50" width="200" height="200" fill="green"/>')
    })
})

describe('Circle', () => {
    it('should create a circle', () => {
        const shape = new Circle("LOK", "Purple");
        shape.setColor("#FFF000000");
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="100" fill="#FFF000000"/>')
    })
})