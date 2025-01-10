import { useState } from "react"
import { nanoid } from "nanoid"
import Dice from "./components/Dice"
import RollBtn from "./components/RollBtn"
import Score from "./components/Score"
import ScoreObjects from "./components/ScoreObjects"

export default function Yahtzee() {

  // States //
  const [dice, setDice] = useState(() => createDice())
  const [score, setScore] = useState(() => ScoreObjects())
  const [rolls, setRolls] = useState(3)

  const gameOver = score.every(scr => {
    return scr.used
  })

  // Reset
  function newGame() {
    setRolls(3)
    setScore(() => ScoreObjects())
    setDice(oldDice => oldDice.map(die => {
      return (
        {
          ...die,
          value: null,
          isHeld: false
        }
      )
    }))
  }

  // Dice Component //

  function createDice() {
    return new Array(5)
      .fill(0)
      .map(() => ({
        id: nanoid(),
        value: null,
        isHeld: false
      }))
  }

  function toggleHold(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
  }

  const diceComponents = dice.map(die => (
    <Dice 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
      allowClick={rolls !== 3}
    />
  ))

  // Roll Button Component //
  
  // Randomizes the dice that are not held
  function rollDice() {
    removeUnusedScores()
    setRolls(oldRolls => oldRolls - 1)
    
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    ))
  }

  /* Test Roll 

  function testRoll() {
    removeUnusedScores()
    setRolls(oldRolls => oldRolls - 1)
    
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ? die : {...die, value: 4}
    ))
  }

  */

  // Roll button element
  const rollButtonComponent = 
    <RollBtn
      rollsRemain={rolls}
      onClickFunc={gameOver ? newGame : rollDice}
      gameOver={gameOver}
    />

  // Score element //

  // Handle when a radio button is selected
  function handleRadioChange(event) {
    const id = event.target.id
    
    removeUnusedScores()
    const scoreValues = checkScore(id)
    const scoreValue = scoreValues[0]
    const yBonusValue = scoreValues[1]

    if (yBonusValue) {
      setScore(oldScore => oldScore.map(score =>
        score.name === "yBonus" ?
        {
          ...score,
          value: score.value + 100,
          used: false
        }
        : score
      ))
    }

    setScore(oldScore => oldScore.map(score => 
      score.name === id ?
        {
          ...score,
          selected: true,
          value: scoreValue
        } 
        : score
    ))
  }

  // Show the potential score of the selected radio button
  function checkScore(id) {
    let numToCheck = null
    let ret = [0,0]

    const diceValues = []
    dice.forEach(die => {
      diceValues.push(die.value)
    })

    const sortedDice = diceValues.sort((a, b) => (a - b))
    const diceSet = new Set(sortedDice)
    const diceTotal = diceValues.reduce((a, b) => a + b, 0)

    const diceCounts = {}
    dice.forEach((die) => {
      diceCounts[die.value] = (diceCounts[die.value] || 0) + 1
    })

    const countVals = Object.values(diceCounts)
    const maxSame = Math.max(...countVals)
    const minSame = Math.min(...countVals)

    // Check for yahtzee bonus
    if (maxSame === 5 && score[11].used && score[11].value === 50) {
      ret[1] = 100
    }

    const yahtzeeBonus = (ret[1] === 100)

    switch (id) {
      case "ones":
        numToCheck = 1;
        break;
      case "twos":
        numToCheck = 2;
        break;
      case "threes":
        numToCheck = 3;
        break;
      case "fours":
        numToCheck = 4;
        break;
      case "fives":
        numToCheck = 5;
        break;
      case "sixes":
        numToCheck = 6;
        break;
      case "threeKind":
        (maxSame >= 3 || yahtzeeBonus) ? ret[0] = diceTotal : ret[0] = 0
        break;
      case "fourKind":
        (maxSame >= 4 || yahtzeeBonus) ? ret[0] = diceTotal : ret[0] = 0
        break;
      case "fullHouse":
        ((maxSame === 3 && minSame === 2) || yahtzeeBonus) ? ret[0] = 25 : ret[0] = 0
        break;
      case "smStraight":
        for (let i = 1; i <= 3; i++) {
          if (
            diceSet.has(i) &&
            diceSet.has(i + 1) &&
            diceSet.has(i + 2) &&
            diceSet.has(i + 3)
          ) {
            ret[0] = 30
          }
          yahtzeeBonus ? ret[0] = 30 : null
        }
        break;
      case "lgStraight":
        for (let i = 1; i <= 2; i++) {
          if (
            diceSet.has(i) &&
            diceSet.has(i + 1) &&
            diceSet.has(i + 2) &&
            diceSet.has(i + 3) &&
            diceSet.has(i + 4)
          ) {
            ret[0] = 40
          }
          yahtzeeBonus ? ret[0] = 40 : null
        }
        break;
      case "yahtzee":
        (maxSame === 5) ? ret[0] = 50 : ret[0] = 0
        break;
      case "chance":
        ret[0] = diceTotal
        break;
      default:
    }

    if (numToCheck) {
      dice.map(die => {
        die.value === numToCheck ?
        ret[0] += numToCheck: null
      })
    }

    return ret
  }

  // Removes any score that was checked but not recorded
  function removeUnusedScores() {
    setScore(oldScore => oldScore.map(score => {
      if (score.name === "yBonus" && !score.used) {
        return (
          {
            ...score,
            value: score.value - 100,
            used: true
          }
        )
      } else if (!score.used) {
        return (
          {
            ...score,
            value: null,
            selected: false
          }
        )
      } else {
        return score
      }
    }))
  }

  // Takes the score and resets the roll count
  function takeScore() {
   
    setScore(oldScore => oldScore.map(score => {
      if (score.name === "yBonus") {
        return (
          {
            ...score,
            used: true
          }
        )
      } else if (score.selected) {
        return (
          {
            ...score,
            selected: false,
            used: true
          }
        )
      } else {
        return score
      }
    }))

    totalScores()

    setRolls(3)

    setDice(oldDice => oldDice.map(die => {
      return ({
        ...die,
        value: null,
        isHeld: false
      })
    }))
  }

  function totalScores() {
    let tPre = 0
    let tBonus = 0
    let tTotal = 0
    let bTotal = 0
    let gTotal = 0

    // Top Score
    for (let i = 0; i < 12; i+=2) {
      tPre += score[i].value
    }
    if (tPre >= 63) tBonus = 35
    tTotal = tPre + tBonus

    // Bottom Score
    for (let i = 1; i < 16; i+=2) {
      bTotal += score[i].value
    }

    gTotal = tTotal + bTotal

    setScore(oldScore => oldScore.map(score => {
      if (score.name === "topPre") {
        return (
          {
            ...score,
            value: tPre
          }
        )
      } else if (score.name === "topBonus") {
        return (
          {
            ...score,
            value: tBonus
          }
        )
      } else if (score.name === "topTotal") {
        return (
          {
            ...score,
            value: tTotal
          }
        )
      } else if (score.name === "botTotal") {
        return (
          {
            ...score,
            value: bTotal
          }
        )
      } else if (score.name === "grandTotal") {
        return (
          {
            ...score,
            value: gTotal
          }
        )
      } else {
        return score
      }
    }))
  }

  const scoreComponent = 
    <Score
      scores={score}
      takeScore={takeScore}
      rollsRemain={rolls}
      handleSubmit={takeScore}
      handleChange={handleRadioChange}
    />

  return (
    <main>
      <header>
        <img className="logo" src="src/images/Logo.png" alt="Yahtzee! Logo" />
      </header>
      <h5>Click a die to hold. A green background will hold the die.</h5>
      <section className="dice-container">
        {diceComponents}
      </section>
      <section className="roll-button-container">
        {rollButtonComponent}
      </section>
      <section className="rolls-remain">
        {gameOver? <h3>Game Over. Grand Total: {score[18].value}.</h3> : <h3>Rolls Remaining: {rolls}</h3>}
      </section>
      <section className="score-board">
        {scoreComponent}
      </section>
    </main>
  )
} 
