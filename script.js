const words = [
    "python",
    "computer",
    "program",
    "coding",
    "school"
];

let word;
let guessedLetters = [];
let wrongGuesses = 0;

const maxWrong = 6;

const wordDisplay = document.getElementById("word");
const livesDisplay = document.getElementById("lives");
const lettersContainer = document.getElementById("letters");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart");

function startGame() {

    word = words[Math.floor(Math.random() * words.length)];

    guessedLetters = [];
    wrongGuesses = 0;

    result.textContent = "";

    updateWord();
    updateLives();
    createButtons();
    resetHangman();
}

function updateWord() {

    let display = "";

    for (let letter of word) {

        if (guessedLetters.includes(letter)) {
            display += letter.toUpperCase() + " ";
        } else {
            display += "_ ";
        }
    }

    wordDisplay.textContent = display;

    if (!display.includes("_")) {

        result.textContent = "🎉 YOU WIN!";

        disableButtons();
    }
}

function updateLives() {

    livesDisplay.textContent =
        `Wrong guesses: ${wrongGuesses} / ${maxWrong}`;
}

function createButtons() {

    lettersContainer.innerHTML = "";

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let letter of alphabet) {

        const button = document.createElement("button");

        button.textContent = letter.toUpperCase();

        button.onclick = function () {

            guessLetter(letter);

            button.disabled = true;
        };

        lettersContainer.appendChild(button);
    }
}

function guessLetter(letter) {

    if (word.includes(letter)) {

        guessedLetters.push(letter);

        updateWord();

    } else {

        wrongGuesses++;

        updateLives();

        drawHangman();

        if (wrongGuesses >= maxWrong) {

            result.textContent =
                `💀 GAME OVER! Word was ${word.toUpperCase()}`;

            disableButtons();
        }
    }
}

function drawHangman() {

    const parts = [
        ".head",
        ".body",
        ".left-arm",
        ".right-arm",
        ".left-leg",
        ".right-leg"
    ];

    if (wrongGuesses > 0) {

        const part =
            document.querySelector(parts[wrongGuesses - 1]);

        part.style.display = "block";
    }
}

function resetHangman() {

    const parts = document.querySelectorAll(
        ".head, .body, .left-arm, .right-arm, .left-leg, .right-leg"
    );

    parts.forEach(part => {
        part.style.display = "none";
    });
}

function disableButtons() {

    const buttons =
        lettersContainer.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });
}

restartButton.onclick = startGame;

startGame();