const DIE_WITH_NUMBERS = `<div class="side side1"><p>1</p></div>
<div class="side side2"><p>2</p></div>
<div class="side side3"><p>3</p></div>
<div class="side side4"><p>4</p></div>
<div class="side side5"><p>5</p></div>
<div class="side side6"><p>6</p></div>`

const DIE_WITH_DOTS = `<div class="side side1">
<div class="dot dot--middle"></div>
</div>
<div class="side side2">
<div class="dot dot--bottom-right"></div>
<div class="dot dot--top-left"></div>
</div>
<div class="side side3">
<div class="dot dot--bottom-right"></div>
<div class="dot dot--top-left"></div>
<div class="dot dot--middle"></div>
</div>
<div class="side side4">
<div class="dot dot--top-right"></div>
<div class="dot dot--bottom-left"></div>
<div class="dot dot--bottom-right"></div>
<div class="dot dot--top-left"></div>
</div>
<div class="side side5">
<div class="dot dot--top-right"></div>
<div class="dot dot--bottom-left"></div>
<div class="dot dot--bottom-right"></div>
<div class="dot dot--top-left"></div>
<div class="dot dot--middle"></div>
</div>
<div class="side side6">
<div class="dot dot--middle-right"></div>
<div class="dot dot--middle-left"></div>
<div class="dot dot--top-right"></div>
<div class="dot dot--bottom-left"></div>
<div class="dot dot--bottom-right"></div>
<div class="dot dot--top-left"></div>
</div>`

const die1 = document.getElementById("die1")
const die2 = document.getElementById("die2")
const rollbtn = document.getElementById("rollbtn")
const outcome1 = document.getElementById("outcome1")
const outcome2 = document.getElementById("outcome2")

const mainHeader = document.getElementById("main-header")
const options = document.getElementById("options")
const optionsShadow = document.getElementById("options-shadow")
const toggleOptions = document.getElementById("toggle-options")
const colourSetter = document.getElementById("colour-setter")
const diceSetter = document.getElementById("select-dice")

toggleOptions.addEventListener('click', () => {
    const showOptions = mainHeader.getAttribute("data-show-options")
    
    if (showOptions === "true"){
        mainHeader.setAttribute("data-show-options", "false")
    } else {
        mainHeader.setAttribute("data-show-options", "true")
    }
})

optionsShadow.addEventListener('click', () => {
    mainHeader.setAttribute("data-show-options", "false")
})

colourSetter.addEventListener('change', (e) => {
    const colour = e.target.value;
    document.documentElement.style.setProperty('--hue', colour);
    localStorage.setItem('diceColour', colour);
})

diceSetter.addEventListener('change', e => {
    const diceType = e.target.value;
    localStorage.setItem('diceType', diceType);
    changeDice(diceType);
})


const changeDice = (diceType) => {
    switch (diceType) {
        case 'dots':
            die1.innerHTML = DIE_WITH_DOTS;
            die2.innerHTML = DIE_WITH_DOTS;
            break;
        case 'numbers':
            die1.innerHTML = DIE_WITH_NUMBERS;
            die2.innerHTML = DIE_WITH_NUMBERS;
            break;
        default:
            die1.innerHTML = DIE_WITH_DOTS;
            die2.innerHTML = DIE_WITH_NUMBERS;
            break;
    }
}

let clicked = false

const outcomeText1 = ["one", "two", "three", "four", "five", "six"]
const outcomeText2 = ["one", "two", "three", "four", "five", "six"]

rollbtn.addEventListener('click', () => {
    roll()
})

die1.addEventListener('click', () => {
    roll()
})

die2.addEventListener('click', () => {
    roll()
})

const roll = () => {
    if (!clicked){
        rollDice()
    }
    clicked = true; 
    rollbtn.classList.add("btn--disabled")
    setTimeout(() => {
        clicked = false
        rollbtn.classList.remove("btn--disabled")
    }, 10500)
}

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
        outcome1.innerText = outcomeText1[roll1-1]
        outcome2.innerText = outcomeText1[roll2-1] 
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

if (localStorage.getItem('diceColour')){
    document.documentElement.style.setProperty('--hue', localStorage.getItem('diceColour'));
}

if (localStorage.getItem('diceType')){
    changeDice(localStorage.getItem('diceType'))
    diceSetter.value = localStorage.getItem('diceType')
}