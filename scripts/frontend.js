import * as gameLogic from "./game-logic.js";



// Basic game logic for front-end (Advanced logic in Game-logic file)

let canLockScoreField = false;

// Selection of elements for Eventhandling
let inputfields = document.getElementsByTagName("input");

let rollBtn = document.querySelector(".roll-button");

let diceImages = document.getElementsByTagName("img");


// Adding event listeners

rollBtn.addEventListener("click", rollButton);

for (let i = 0; i < diceImages.length; i++) {
    diceImages[i].addEventListener("click", lockDice);
}

for (let i = 0; i < inputfields.length; i++) {
    inputfields[i].addEventListener("click", lockScoreField);
}

function rollButton() {
    if (gameLogic.throwCount == 3) {
        return;
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    gameLogic.rollDice();

    let diceHolders = [];

    for (let i = 1; i < 6; i++) {
        diceHolders[i] = document.getElementById(`dice-holder-${i}`);

        if (!gameLogic.dices[i - 1].lockedState) {
            const setPermanentDiceValue = async (j) => {
                let yeet = (Math.random() * 400) + 200;
                await delay(yeet);
                diceHolders[j].src = `./assets/dice-animation/dice_animation_${j}.gif`;

                let diceValue = gameLogic.dices[j - 1].value;

                await delay(2000);
                diceHolders[j].src = `./assets/die_${diceValue}.png`;
            };
            setPermanentDiceValue(i);
        }
    }
    updateThrowCount();
    updateScoreFieldsWithDelay();
    canLockScoreField = true;
}

function updateScoreFields() {
    let results = gameLogic.getResults();

    for (let i = 0; i < inputfields.length; i++) {
        let inputfield = inputfields[i];
        if (inputfield.className != "inputSelected" && inputfield.id != "sum" && inputfield.id != "bonus" && inputfield.id != "total") {
            inputfields[i].value = results[i];
        }
    }
}

function updateScoreFieldsWithDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            updateScoreFields();
            resolve();
        }, 2500); // delay of 2.5 seconds
    });
}

function updateThrowCount() {
    let throwDisplay = document.getElementById("throwDisplay");
    console.log(gameLogic.throwCount);
    throwDisplay.textContent = `Throw ${gameLogic.throwCount}`;
}

function lockDice(event) {
    let index = event.target.id.split("-")[2];
    if (gameLogic.dices[index - 1].lockedState) {
        gameLogic.dices[index - 1].lockedState = false;
        event.target.className = "dice_regular";
    } else {
        event.target.className = "lockedDice";
        gameLogic.dices[index - 1].lockedState = true;
    }

}

function lockScoreField(event) {
    if (canLockScoreField) {
        let field = event.target;
        field.className = "inputSelected";
        updateSumAndBonusAndTotal();
        canLockScoreField = false;
        gameLogic.newRound();
        updateThrowCount();
    }
}

function updateSumAndBonusAndTotal() {
    let inputElements = document.getElementsByClassName("inputSelected");
    let sumAmount = 0;

    for (let i = 0; i < inputElements.length; i++) {
        sumAmount += parseInt(inputElements[i].value);
    }

    document.getElementById("sum").value = sumAmount;

    let bonusField = document.getElementById("bonus");
    if (sumAmount >= 63) {
        bonusField.value = 50;
    } else {
        bonusField.value = 0;
    }

    let totalSum = sumAmount + parseInt(bonusField.value);

    document.getElementById("total").value = totalSum;

}
