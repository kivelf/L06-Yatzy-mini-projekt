import * as gameLogic from "./game-logic.js";







let rollBtn = document.querySelector(".roll-button");

rollBtn.addEventListener("click", rollButton);


function rollButton() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    gameLogic.rollDice();

    let diceHolders = [];

    for (let i = 1; i < 6; i++) {
        diceHolders[i] = document.getElementById(`dice-holder-${i}`);

        
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
/* RollFunction 

Den skal tjekke om nogen af terningerne er låste,

Roll functionen skal kalde throwdice fra gamelogic klassen

Den skal herefter kører gif animationen på alle dice felter, vente på gif animationen er done.
Når gif animationen er done, skal den indsætte dice billeder for

*/