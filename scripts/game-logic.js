export default function randomName() {
    console.log("object");
}



export const dices = [
    { value: 0, lockedState: false },
    { value: 0, lockedState: false },
    { value: 0, lockedState: false },
    { value: 0, lockedState: false },
    { value: 0, lockedState: false }
];


// Variable for Number of times the 5 dice have been thrown.

// 0 <= throwCount <= 3.
export let throwCount = 0;

// Variable for roundCount

export let roundCount = 0;


// Random number generator. Generates a number between 1 and 6
function getRandomInt() {
    return Math.floor(Math.random() * 6) + 1;
}

export function newRound() {
    resetDices();
    resetThrowCount();
}

export function newGame() {
    throwCount = 0;
    roundCount = 0;
    resetDices();
}

function resetDices() {
    for (let i = 0; i < dices.length; i++) {
        dices[i].value = 0;
        dices[i].lockedState = false;
    }
}
/**
    * Reset the throw count.
    */
export function resetThrowCount() {
    throwCount = 0;
    roundCount++;
    for (let i = 0; i < dices.length; i++) {
        dices[i].value = 0;
    }
}

/**
    * Roll the 5 dice. Only roll dice that are not hold.<br/>
    * Note: holdStatus[index] is true, if die no. index is hold (for index in [0..4]).
    */

export function rollDice() {
    for (let i = 0; i < dices.length; i++) {
        if (!dices[i].lockedState) {
            dices[i].value = getRandomInt();
        }
    }
    throwCount++;
}

// -------------------------------------------------------------------------

// Return an int[7] containing the frequency of face values.
// Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
// Index 0 is not used.
// Note: This method can be used in several of the following methods.

export function frequency() {
    let currentFrequency = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dices.length; i++) {
        let yeetnumber = dices[i].value;
        currentFrequency[yeetnumber]++;
    }
    return currentFrequency;
}

/**
     * Return same-value points for the given face value.<br/>
     * Returns 0, if no dice has the given face value.<br/>
     * Pre: 1 <= value <= 6;
     */

export function sameValuePoints(value) {
    let frequencies = frequency();
    let sameValuePoints = frequencies[value] * value;
    return sameValuePoints;
}


/**
 * Return points for one pair (for the face value giving the highest points).<br/>
 * Return 0, if there aren't 2 dice with the same face value.
 */
export function onePairPoints() {
    let frequencies = frequency();
    let pairPoints = 0;
    for (let i = 6; i >= 1; i--) {
        if (frequencies[i] >= 2) {
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
export function twoPairPoints() {
    let frequencies = frequency();
    let lowerPairPoints = 0;
    let highestPairPoints = onePairPoints();
    let doublePairPoints = 0;
    if (highestPairPoints !== 0) {
        for (let i = 6; i >= 1; i--) {
            if (frequencies[i] >= 2) {
                if (i * 2 !== highestPairPoints) {
                    lowerPairPoints = i * 2;
                    break;
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
export function threeSamePoints() {
    let frequencies = frequency();
    let triplePoints = 0;
    for (let i = 1; i <= 6; i++) {
        if (frequencies[i] >= 3) {
            triplePoints = i * 3;
        }
    }
    return triplePoints;
}


/**
 * Return points for 4 of a kind.<br/>
 * Return 0, if there aren't 4 dice with the same face value.
 */
export function fourSamePoints() {
    let frequencies = frequency();
    let quadruplePoints = 0;
    for (let i = 1; i <= 6; i++) {
        if (frequencies[i] >= 4) {
            quadruplePoints = i * 4;
        }
    }
    return quadruplePoints;
}

/**
 * Return points for full house.<br/>
 * Return 0, if there aren't 3 dice with the same face value<br/>
 * and 2 other dice with the same but different face value.
 */
function fullHousePoints() {
    let frequencies = frequency();
    let pairPoints = 0;
    let triplePoints = threeSamePoints();
    let fullHouse = 0;
    if (triplePoints !== 0) {
        for (let i = 1; i <= 6; i++) {
            if (frequencies[i] === 2) {
                pairPoints = i * 2;
                break; // Exit loop once pair is found
            }
        }
    }
    if (pairPoints !== 0) {
        fullHouse = triplePoints + pairPoints;
    }
    return fullHouse;
}


/**
 * Return points for small straight.<br/>
 * Return 0, if the dice aren't showing 1,2,3,4,5.
 */
function smallStraightPoints() {
    let frequencies = frequency();
    let haveSmallStraight = true;
    let smallStraight = 0;
    for (let i = 1; i <= 5; i++) {
        if (frequencies[i] < 1) {
            haveSmallStraight = false;
            break; // exit the loop once a required value is missing
        }
    }
    if (haveSmallStraight) {
        smallStraight = 15; // the sum of 1,2,3,4,5
    }
    return smallStraight;
}


/**
 * Return points for large straight.<br/>
 * Return 0, if the dice aren't showing 2,3,4,5,6.
 */
export function largeStraightPoints() {
    let frequencies = frequency();
    let haveLargeStraight = true;
    let bigStraight = 0;
    for (let i = 2; i <= 6; i++) {
        if (frequencies[i] < 1) {
            haveLargeStraight = false;
        }
    }
    if (haveLargeStraight) {
        bigStraight = 20;     // the sum of 2,3,4,5,6
    }
    return bigStraight;
}

/**
 * Return points for chance (the sum of face values).
 */

export function chancePoints() {
    let frequencies = frequency();
    let sum = 0;
    for (let i = 1; i <= 6; i++) {
        sum += frequencies[i] * i;
    }
    return sum;
}

/**
 * Return points for yatzy (50 points).<br/>
 * Return 0, if there aren't 5 dice with the same face value.
 */

export function yatzyPoints() {
    let frequencies = frequency();
    let yatzy = 0;
    for (let i = 1; i <= 6; i++) {
        if (frequencies[i] == 5) {
            yatzy = (frequencies[i] * i) + 50;
        }
    }
    return yatzy;
}

export function getResults() {
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