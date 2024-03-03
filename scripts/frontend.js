import * as gameLogic from "./game-logic.js";



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
}

function updateScoreFields() {
    let results = gameLogic.getResults();

    for (let i = 0; i < inputfields.length; i++) {
        if (inputfields[i].className != "inputSelected") {
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
    console.log(throwDisplay);
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
    let field = event.target;

}

function updateSumAndBonusAndTotal() {
    let inputElements = document.getElementsByClassName("inputSelected");
    let sumAmount = 0;

    for (let i = 0; i < inputElements.length; i++) {
        sumAmount += parseInt(inputElements[i].value);
    }

    document.getElementById("id-sum").value = sumAmount;

    let bonusField = document.getElementById("id-bonus");
    if (sumAmount >= 63) {
        bonusField.value = 50;
    } else {
        bonusField.value = 0;
    }

    let totalSum = sumAmount + parseInt(bonusField.value);

    document.getElementById("id-total").value = totalSum;

}
