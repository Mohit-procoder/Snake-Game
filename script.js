var scoree = 0
// flag to cheack if game is being initialized or not (to initialize snake motion)
var flag = 0
/* snake body overview->
snake body is made by boxes(div) . A new box/div is being added whenever snake eats food . And every div follows it's next div(or privious sibling)
*/

/* Snake Motion overview->
For smooth motion of snake and random placement of food , Grids are being used . The plane is being divided into several grids . For every interval
snanke moves , in actuall the divs of snakebody changes their grid position by 1 according to it's respective direction
*/

// every snake div has it's own grid position , i.e. gridColomnStart value and gridRowStart value.
//gcs[i] indicates gridColomnStart value of i'th div(or box) of snakeBody and grs[i] indicates gridRowStart value of i'th div(or box) of snake
let gcs = [1]
let grs = [1]

//every snake div or every box of the snakeBody have a perticular direction,
//here snake[i] indicates the direction of i'th div(or i'th box) of snakeBody , snake[i] can be 1,2,3 or 4 denoting right,down,left and up direction respectivelly
var snake = [1]

//speed indicates the speed of snake
var speed = 100
// sig is being used to cheack wheather user changed the direction of snake or not . Wherever user changes the direction of snake sig value changes to 1 and snakemove() function executes accordingly
var sig = 0

// for responsive design , making the number of grids and height width of box(in which snake moves) dynamic
const foood = document.querySelector('.food')
if (innerWidth >= 800) document.querySelector('.container').style.height = `${innerWidth / 3}px`
else document.querySelector('.container').style.height = `${innerWidth}px`
if (innerWidth >= 800) {
    document.querySelector('.container').style.gridTemplateRows = `repeat(${Math.floor(innerWidth / 75)},1fr)`
    document.querySelector('.container').style.gridTemplateColumns = `repeat(${Math.floor(innerWidth / 75)},1fr)`
}
else {
    document.querySelector('.container').style.gridTemplateRows = `repeat(${Math.floor(innerWidth / 15)},1fr)`
    document.querySelector('.container').style.gridTemplateColumns = `repeat(${Math.floor(innerWidth / 15)},1fr)`
}

// foodPos function of random position of food
function foodPos() {
    if (innerWidth >= 800) {
        document.querySelector('.food').style.gridColumnStart = `${Math.floor(Math.random() * (innerWidth / 75))}`
        document.querySelector('.food').style.gridRowStart = `${Math.floor(Math.random() * (innerWidth / 75))}`
    }
    else {
        document.querySelector('.food').style.gridColumnStart = `${Math.floor(Math.random() * (innerWidth / 15))}`
        document.querySelector('.food').style.gridRowStart = `${Math.floor(Math.random() * (innerWidth / 15))}`
        console.log(Math.floor(Math.random() * (innerWidth / 15)))
    }
}
function foodPos1() {
    if (innerWidth >= 800) {
        let randdom = Math.floor(Math.random() * (innerWidth / 75))
        while (randdom == 1) {
            randdom = Math.floor(Math.random() * (innerWidth / 75))
        }
        let randdom2 = Math.floor(Math.random() * (innerWidth / 75))
        while (randdom2 == 1) {
            randdom2 = Math.floor(Math.random() * (innerWidth / 75))
        }
        document.querySelector('.food').style.gridColumnStart = `${randdom}`
        document.querySelector('.food').style.gridRowStart = `${randdom2}`
    }
    else {
        let randdom = Math.floor(Math.random() * (innerWidth / 15))
        while (randdom == 1) {
            randdom = Math.floor(Math.random() * (innerWidth / 15))
        }
        let randdom2 = Math.floor(Math.random() * (innerWidth / 15))
        while (randdom2 == 1) {
            randdom2 = Math.floor(Math.random() * (innerWidth / 15))
        }
        document.querySelector('.food').style.gridColumnStart = `${randdom}`
        document.querySelector('.food').style.gridRowStart = `${randdom2}`
    }
}
foodPos1()

// simple score increment function 🥱
function scoreInc() {
    scoree++
    document.querySelector('.score_val').innerHTML = `${scoree}`
}

// snakeBOdy incriment function overview->
// A new box (or div) will be added whenever snake eats the food . THe new box is added  just before the last div of snakeBody and at 
// this interval the direction of that div must follow the last div's (or last box of sankeBody) direction
function snakeInc() {
    const snakeBody = [...document.querySelectorAll('.snake')]
    const divv = document.createElement('div')
    divv.classList.add('snake')

    if (snake[snake.length - 1] == 1) {
        divv.style.gridColumnStart = `${parseInt(snakeBody[snakeBody.length - 1].style.gridColumnStart) - 1}`
        divv.style.gridRowStart = snakeBody[snakeBody.length - 1].style.gridRowStart
        snake.push(snake[snake.length - 1])
    }
    else if (snake[snake.length - 1] == 2) {
        divv.style.gridRowStart = `${parseInt(snakeBody[snakeBody.length - 1].style.gridRowStart) - 1}`
        divv.style.gridColumnStart = snakeBody[snakeBody.length - 1].style.gridColumnStart
        snake.push(snake[snake.length - 1])
    }
    else if (snake[snake.length - 1] == 3) {
        divv.style.gridColumnStart = `${parseInt(snakeBody[snakeBody.length - 1].style.gridColumnStart) + 1}`
        divv.style.gridRowStart = snakeBody[snakeBody.length - 1].style.gridRowStart
        snake.push(snake[snake.length - 1])
    }
    else {
        divv.style.gridRowStart = `${parseInt(snakeBody[snakeBody.length - 1].style.gridRowStart) + 1}`
        divv.style.gridColumnStart = snakeBody[snakeBody.length - 1].style.gridColumnStart
        snake.push(snake[snake.length - 1])
    }
    document.querySelector('.container').append(divv)
    gcs.push(parseInt(divv.style.gridColumnStart))
    grs.push(parseInt(divv.style.gridRowStart))
}
const snakeBody = [...document.querySelectorAll('.snake')]

/* SnakeMove function , the most interesting and challenging part of the project 🥵
 here for motion of snake , every div of snakebody moves and for every interval we inspect the direction of every div of snakebody and
 modify it if needed  , hence for every interval we traverse the whole [snake] array . And according to their direction we change the 
 row and column of every div's of snakebody by 1  
*/
function snakeMove(idddd) {
    if (snake.length != 1) {
        for (let i = snake.length - 1; i >= 1; i--) {
            if (i == 1 && sig == 0) sig = 1
            else if (snake[i - 1] != snake[i]) snake[i] = snake[i - 1]
        }
    }
    const snakeBody = document.querySelectorAll('.snake')
    for (let i = 0; i < snake.length; i++) {
        if (snake[i] == 1) {

            // conditions to terminate the game , i.e. whever sanke hits the wall the game is terminated
            if (innerWidth < 800) {
                if (i == 0 && parseInt(snakeBody[0].style.gridColumnStart) == Math.floor(innerWidth / 15)) {
                    alert('game over')
                    location.reload()

                }
            }
            else {
                if (i == 0 && parseInt(snakeBody[0].style.gridColumnStart) == Math.floor(innerWidth / 75)) {
                    alert('game over')
                    location.reload()
                }
            }
            gcs[i]++
            snakeBody[i].style.gridColumnStart = `${gcs[i]}`
        }
        else if (snake[i] == 2) {
            if (innerWidth < 800) {
                if (i == 0 && parseInt(snakeBody[0].style.gridRowStart) == Math.floor(innerWidth / 15)) {
                    alert('game over')
                    location.reload()
                }
            }
            else {
                if (i == 0 && parseInt(snakeBody[0].style.gridRowStart) == Math.floor(innerWidth / 75)) {
                    alert('game over')
                    location.reload()
                }
            }
            grs[i]++
            snakeBody[i].style.gridRowStart = `${grs[i]}`

        }
        else if (snake[i] == 3) {
            if (i == 0 && parseInt(snakeBody[0].style.gridColumnStart) == 1) {
                alert('game over')
                location.reload()
            }
            gcs[i]--
            snakeBody[i].style.gridColumnStart = `${gcs[i]}`

        }
        else {
            if (i == 0 && parseInt(snakeBody[0].style.gridRowStart) == 1) {
                alert('game over')
                location.reload()
            }
            grs[i]--
            snakeBody[i].style.gridRowStart = `${grs[i]}`

        }
    }

    // condition for sanke to eat food
    if (snakeBody[0].style.gridColumnStart == foood.style.gridColumnStart && snakeBody[0].style.gridRowStart == foood.style.gridRowStart) {
        foodPos()
        scoreInc()
        snakeInc()
    }
}

// Allowing arrow keys to change the direction of snake whenever user press it .
window.addEventListener('keydown', (e) => {
    if (e.key == 's') {
        document.querySelector('.startGame').style.opacity = '0'
        setInterval(snakeMove, speed)
    }
    if (e.key == 'ArrowRight') {
        if (snake[0] != 3) snake[0] = 1
        sig = 0
    }
    else if (e.key == 'ArrowDown') {
        if (snake[0] != 4) snake[0] = 2
        sig = 0
    }
    else if (e.key == 'ArrowLeft') {
        if (snake[0] != 1) snake[0] = 3
        sig = 0
    }
    else if (e.key == 'ArrowUp') {
        if (snake[0] != 2) snake[0] = 4
        sig = 0
    }
    snakeMove()
})

// giving click controll featue to controll the motion of snake by clicking the respective direction (given at bottom of the game)
document.querySelector('.controll').addEventListener('click', (e) => {
    if (flag == 0 && e.target == document.querySelector('.inialized')) {
        flag = 1
        document.querySelector('.inialized').style.display = 'none'
        setInterval(snakeMove, speed)
    }
    else if (e.target == document.querySelector('.upArrow2')) {
        if (snake[0] != 2)snake[0] = 4
        sig = 0
    }
    else if (e.target == document.querySelector('.DownArrow2')) {
        if (snake[0] != 4)snake[0] = 2
        sig = 0
    }
    else if (e.target == document.querySelector('.rightArrow2')) {
        if (snake[0] != 3)snake[0] = 1
        sig = 0
    }
    else if (e.target == document.querySelector('.leftArrow2')) {
        if (snake[0] != 1)snake[0] = 3
        sig = 0
    }
    snakeMove()
})