function initializeSquares(containerClass, numberOfSquares) {
    const container = document.querySelector(`.${containerClass}`);
    if (!container) {
        console.error(`Container with class ${containerClass} not found`);
        return;
    }


    for (let i = 0; i < numberOfSquares ** 2; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
        square.style.width = `${960 / numberOfSquares - 4}px`;
        square.style.height = `${960 / numberOfSquares - 4}px`;
    }
    addHoverEffect();
    addToggleLockEffect();

}

function createResetButton(){
    const button = document.createElement('button');
    button.textContent = 'Reset';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        let numberOfSquares;
        do {
            numberOfSquares = parseInt(prompt('Enter the number of squares (between 1 and 96):'), 10);
        } while (isNaN(numberOfSquares) || numberOfSquares < 1 || numberOfSquares > 96);

        // Clear existing squares
        const container = document.querySelector('.square-container');
        container.innerHTML = '';

        initializeSquares('square-container', numberOfSquares);
    });
}




function addHoverEffect() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseover', () => paintSquare(square));
            
    });
}



function paintSquare(square) {
    if (!square.classList.contains('locked')) {
        if (paintColor === 'rainbow') {
            square.style.backgroundColor = getRandomColor();
        } else if (paintColor === 'fade up') {
            square.style.backgroundColor = fadeUp();
        } else if (paintColor === 'fade down') {
            square.style.backgroundColor = fadeDown();  
        } else {
            square.style.backgroundColor = paintColor;
        }
    }
}

function addToggleLockEffect() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            square.classList.toggle('locked');
            if (square.classList.contains('locked')) {
                square.style.border = '2px solid black';
            } else {
                square.style.border = '2px solid white';
                paintSquare(square);
            }
        });
    });
}

function createColorButton(color) {
    const button = document.createElement('button');
    button.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        paintColor = color === 'random' ? getRandomColor() : color;
        
    });
}

function createFadeHighButton() {
    const button = document.createElement('button');
    button.textContent = 'Fade High';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        fadeRate = 5;
    });
}

function createFadeLowButton() {
    const button = document.createElement('button');
    button.textContent = 'Fade Low';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        fadeRate = 2;
    });
}



function createColorButtons() {
    const colors = ['white', 'black', 'blue', 'red', 'yellow', 
        'random', 'rainbow', 'fade up', 'fade down'];
    colors.forEach(color => createColorButton(color));
}

function fadeUp() {
    if (fadeLevel > 0) {
        fadeLevel -= fadeRate;
    }
    return `rgb(${fadeLevel}, ${fadeLevel}, ${fadeLevel})`;
}

function fadeDown() {
    if (fadeLevel < 255) {
        fadeLevel += fadeRate;
    }
    return `rgb(${fadeLevel}, ${fadeLevel}, ${fadeLevel})`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initializeApp() {
    createResetButton();
    createColorButtons();
    createFadeHighButton();
    createFadeLowButton();

    paintColor = "black";
    const squareContainer = document.createElement('div');
    squareContainer.style.width = '960px';
    squareContainer.style.maxHeight = '960px';
    squareContainer.classList.add('square-container');
    document.body.appendChild(squareContainer);
    initializeSquares('square-container', 16);
}

let fadeLevel = 125;
let fadeRate = 5;
let paintColor = "black";
initializeApp();

