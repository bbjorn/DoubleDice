const die1 = document.getElementById("die1")
const die2 = document.getElementById("die2")
const rollbtn = document.getElementById("rollbtn")
let clicked = false

rollbtn.addEventListener('click', () => {
    if (!clicked){
        rollDice()
    }
    clicked = true; 
    rollbtn.classList.add("btn--disabled")
    setTimeout(() => {
        clicked = false
        rollbtn.classList.remove("btn--disabled")
    }, 10500)
})

const rollDice = () => {
    const roll1 = randomDieRoll()
    const roll2 = randomDieRoll()
    
    clearRolls(die1)
    clearRolls(die2)
    
    die1.classList.add("die-roll"+roll1)
    die2.classList.add("die-roll"+roll2)
    
    deactiveSides(die1)
    deactiveSides(die2)
    
    setTimeout(() => {
        activateSide(die1, roll1)
        activateSide(die2, roll2)        
    }, 10000);
    
    setTimeout(() => {
        clearRolls(die1)
        clearRolls(die2)
    
    
        die1.classList.add("die-"+roll1+"-up")
        die2.classList.add("die-"+roll2+"-up")
    }, 10200)
}

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
        for( let i = 1; i<=6; i++){
        if(die.classList.contains("die-roll"+i)){
            die.classList.remove("die-roll"+i)
        }
        if(die.classList.contains("die-"+i+"-up")){
            die.classList.remove("die-"+i+"-up")
        }
    }
}

const activateSide = (die, roll) => {
    Array.from(die.children).map((child) => {
        if(child.classList.contains("side"+roll)){
            child.classList.add("active-side")
        }
    })
}

const deactiveSides = (die) => {
    Array.from(die.children).map((child) => {
        if(child.classList.contains("active-side")){
            child.classList.remove("active-side")
        }
    })
}