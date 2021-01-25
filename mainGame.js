const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = {};

let keys = {ArrowUp: "false", ArrowDown: "false", ArrowLeft: "false", ArrowRight: "false"};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
    console.log(e.key);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
    console.log(e.key);
}

function gamePlay(){
    console.log("Start");
    if(player.start){
        window.requestAnimationFrame(gamePlay);
    }

}
function start(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    player.start = true;
    window.requestAnimationFrame(gamePlay);

    let car = document.createElement('div');
    car.setAttribute("class","car");
    //car.innerText = "Hey I'm Your Car";
    gameArea.appendChild(car);
}
