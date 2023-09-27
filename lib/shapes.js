class Shapes {
    constructor(textLogo = "SVG", textColor = "white", shapeColor = "green") {
        this.textLogo = textLogo;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
    }

    setColor(color) {
        this.shapeColor = color;
    }
}

class Triangle extends Shapes {
    constructor(textLogo = "SVG", textColor = "white", shapeColor = "green") {
        super(textLogo, textColor, shapeColor);
    }

    render() {
        return `<polygon points="150,0 250,200 50,200" fill="${this.shapeColor}"/>`;
    }
}

class Square extends Shapes {
    constructor(textLogo = "SVG", textColor = "white", shapeColor = "green") {
        super(textLogo, textColor, shapeColor);
    }

    render() {
        return `<rect x="50" width="200" height="200" fill="${this.shapeColor}"/>`;
    }
}

class Circle extends Shapes {
    constructor(textLogo = "SVG", textColor = "white", shapeColor = "green") {
        super(textLogo, textColor, shapeColor);
    }

    render() {
        return `<circle cx="150" cy="100" r="100" fill="${this.shapeColor}"/>`;
    }
}

module.exports = { Triangle, Square, Circle }