

export default function randomName() {
    console.log("object");
}

/* Array for dice values*/
export let diceValues = new Array(5);

// Variable for Number of times the 5 dice have been thrown.

// 0 <= throwCount <= 3.
export let throwCount = 0;

// Variable for roundCount

export let roundCount = 0;

// Random number generator.
function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
  }

 

 /**
     * Reset the throw count.
     */
function resetThrowCount() {
    throwCount = 0;
    roundCount++;
    for (let i = 0; i < diceValues.length; i++) {
        diceValues[i] = 0;
    }
}

 /**
     * Roll the 5 dice. Only roll dice that are not hold.<br/>
     * Note: holdStatus[index] is true, if die no. index is hold (for index in [0..4]).
     */

 function rollDice(holdStatus) {
    for (let i = 0; i < holdStatus.length; i++){
        if (!holdStatus[i]){
            values[i] = getRandomInt();
        }
    }
 }

 // -------------------------------------------------------------------------

    /**
     * Return all results possible with the current face values.<br/>
     * The order of the results is the same as on the score board.<br/>
     * Note: This is an optional method. Comment this method out,<br/>
     * if you don't want use it.
     */

function getResults() {
        let results = new Array(15);
        for (let i = 0; i < 6; i++) {
            results[i] = sameValuePoints(i + 1);
        }
        results[6] = onePairPoints();
        results[7] = twoPairPoints();
        results[8] = threeSamePoints();
        results[9] = fourSamePoints();
        results[10] = fullHousePoints();
        results[11] = smallStraightPoints();
        results[12] = largeStraightPoints();
        results[13] = chancePoints();
        results[14] = yatzyPoints();

        return results;
    }

     // -------------------------------------------------------------------------

    // Return an int[7] containing the frequency of face values.
    // Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
    // Index 0 is not used.
    // Note: This method can be used in several of the following methods.

    function frequency() {
        let currentFrequency = new Array(7);
        for (faceValue in diceValues){
            currentFrequency[faceValue]++;
        }
        return currentFrequency;
    }

    /**
     * Return same-value points for the given face value.<br/>
     * Returns 0, if no dice has the given face value.<br/>
     * Pre: 1 <= value <= 6;
     */
    function sameValuePoints(value) {
        let frequency = getFrequency();
        let sameValuePoints = frequency[value] * value;
        return sameValuePoints;
    }
  

    /**
     * Return points for one pair (for the face value giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value.
     */
    function onePairPoints() {
        let frequency = getFrequency();
        let pairPoints = 0;
        for (let i = 6; i >= 1; i--) {
            if (frequency[i] >= 2) {
                pairPoints = i * 2;
                break; // exit loop once pair is found since it'll be the highest found one
            }
        }
        return pairPoints;
    }
    

    /**
     * Return points for two pairs<br/>
     * (for the 2 face values giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
    function twoPairPoints() {
        let frequency = getFrequency();
        let lowerPairPoints = 0;
        let highestPairPoints = onePairPoints();
        let doublePairPoints = 0;
        if (highestPairPoints !== 0) {
            for (let i = 6; i >= 1; i--) {
                if (frequency[i] >= 2) {
                    if (i * 2 !== highestPairPoints) {
                        lowerPairPoints = i * 2;
                        break; // exit loop once lower pair is found
                    }
                }
            }
        }
        if (lowerPairPoints !== 0) {
            doublePairPoints = lowerPairPoints + highestPairPoints;
        }
        return doublePairPoints;
    }

    
    

    /**
     * Return points for 3 of a kind.<br/>
     * Return 0, if there aren't 3 dice with the same face value.
     */
    


    /**
     * Return points for 4 of a kind.<br/>
     * Return 0, if there aren't 4 dice with the same face value.
     */
    

    /**
     * Return points for full house.<br/>
     * Return 0, if there aren't 3 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
    

    /**
     * Return points for small straight.<br/>
     * Return 0, if the dice aren't showing 1,2,3,4,5.
     */
    

    /**
     * Return points for large straight.<br/>
     * Return 0, if the dice aren't showing 2,3,4,5,6.
     */
    function largeStraightPoints() {
        let frequency = frequency();
        let haveLargeStraight = true;
        let bigStraight = 0;
        for (let i = 2; i <= 6; i++){
            if (frequency[i] < 1){
                haveLargeStraight = false;
            }
        }
        if (haveLargeStraight){
            bigStraight = 20;     // the sum of 2,3,4,5,6
        }
        return bigStraight;
    }

    /**
     * Return points for chance (the sum of face values).
     */
    
    function chancePoints() {
        let frequency = frequency();
        let sum = 0;
        for (let i = 1; i <= 6; i++){
            sum += frequency[i] * i;
        }
        return sum;
    }

    /**
     * Return points for yatzy (50 points).<br/>
     * Return 0, if there aren't 5 dice with the same face value.
     */

    function yatzyPoints() {
        let frequency = frequency();
        let yatzy = 0;
        for (let i = 1; i <= 6; i++) {
            if (frequency[i] == 5){
                yatzy = 50;
            }
        }
        return yatzy;
    }