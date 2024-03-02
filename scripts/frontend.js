import * as gameLogic from "./game-logic.js";



let inputfields = document.getElementsByTagName("input");

let rollBtn = document.querySelector(".roll-button");

let diceImages = document.getElementsByTagName("img");

rollBtn.addEventListener("click", rollButton);

for (let i = 0; i < diceImages.length; i++) {
    diceImages[i].addEventListener("click", lockDice);
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

        if (!gameLogic.dices[i-1].lockedState) {
            const setPermanentDiceValue = async (j) => {
                let yeet = (Math.random() * 400)+200;
                await delay(yeet);
                diceHolders[j].src = `./assets/dice-animation/dice_animation${j}.gif`;
                
                let diceValue = gameLogic.dices[j-1].value;
    
                await delay(2000);
                diceHolders[j].src = `./assets/die_${diceValue}.png`;
              };
            setPermanentDiceValue(i);
        }
    }
    updateScoreFields();
    updateThrowCount();
}

function updateScoreFields() {
    let results = gameLogic.getResults();

    for (let i = 0; i < inputfields.length; i++) {
        inputfields[i].value = results[i];
    }
}

function updateThrowCount() {
    let turnDisplay = document.getElementById("turnDisplay");
    console.log(turnDisplay);
    turnDisplay.textContent = `Turn ${gameLogic.throwCount}`;
}

function lockDice(event) {
    let index = event.target.id.split("-")[2];
    if (gameLogic.dices[index-1].lockedState) {
        gameLogic.dices[index-1].lockedState = false;
        event.target.className = "dice_regular";
    } else {
        event.target.className = "lockedDice";
        gameLogic.dices[index-1].lockedState = true;
    }

}

/* RollFunction 

Den skal tjekke om nogen af terningerne er låste,

Roll functionen skal kalde throwdice fra gamelogic klassen

Den skal herefter kører gif animationen på alle dice felter, vente på gif animationen er done.
Når gif animationen er done, skal den indsætte dice billeder for

*/