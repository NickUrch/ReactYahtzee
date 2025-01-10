const ones = {
    name: "ones",
    value: null,
    text: "Ones: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const twos = {
    name: "twos",
    value: null,
    text: "Twos: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const threes = {
    name: "threes",
    value: null,
    text: "Threes: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const fours = {
    name: "fours",
    value: null,
    text: "Fours: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const fives = {
    name: "fives",
    value: null,
    text: "Fives: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const sixes = {
    name: "sixes",
    value: null,
    text: "Sixes: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const topPre = {
    name: "topPre",
    value: 0,
    text: "Top Pre-bonus: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const topBonus = {
    name: "topBonus",
    value: 0,
    text: "Top Bonus: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const topTotal = {
    name: "topTotal",
    value: 0,
    text: "Top Total: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const threeKind = {
    name: "threeKind",
    value: null,
    text: "Three-of-a-kind: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const fourKind = {
    name: "fourKind",
    value: null,
    text: "Four-of-a-kind: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const fullHouse = {
    name: "fullHouse",
    value: null,
    text: "Full House: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const smStraight = {
    name: "smStraight",
    value: null,
    text: "Small Straight: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const lgStraight = {
    name: "lgStraight",
    value: null,
    text: "Large Straight: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const yahtzee = {
    name: "yahtzee",
    value: null,
    text: "Yahtzee!: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const yBonus = {
    name: "yBonus",
    value: null,
    text: "Yahtzee! Bonus: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const chance = {
    name: "chance",
    value: null,
    text: "Chance: ",
    type: "radio",
    input: true,
    selected: false,
    used: false
}

const botTotal = {
    name: "botTotal",
    value: 0,
    text: "Bottom Total: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const grandTotal = {
    name: "grandTotal",
    value: 0,
    text: "Grand Total: ",
    type: "text",
    input: false,
    selected: false,
    used: true
}

const scoreElements = [
    ones,
    threeKind,
    twos,
    fourKind,
    threes,
    fullHouse,
    fours,
    smStraight,
    fives,
    lgStraight,
    sixes,
    yahtzee,
    topPre,
    yBonus,
    topBonus,
    chance,
    topTotal,
    botTotal,
    grandTotal
]

export default function ScoreObjects() {
    return scoreElements
}