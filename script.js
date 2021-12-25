const die1 = document.getElementById("die1")
const die2 = document.getElementById("die2")
const rollbtn = document.getElementById("rollbtn")

rollbtn.addEventListener('click', () => {
    const roll1 = randomDieRoll()
    const roll2 = randomDieRoll()

    clearRolls(die1)
    clearRolls(die2)

    die1.classList.add("die-roll"+roll1)

    die2.classList.add("die-roll"+roll2)
})

const randomDieRoll = () => {
    return Math.floor(Math.random()*6)+1
}

const testRoller = () => {
    let test = new Array(6).fill(0)

    for (let i = 0; i<100000; i++){
        const roll = randomDieRoll() - 1; 
        test[roll]++
    }

    console.log(test);
}

const clearRolls = (die) => {
    die.classList.remove("die-roll2")
    die.classList.remove("die-roll1")
    die.classList.remove("die-roll3")
    die.classList.remove("die-roll4")
    die.classList.remove("die-roll5")
    die.classList.remove("die-roll6")
}