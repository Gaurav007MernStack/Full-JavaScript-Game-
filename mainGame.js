const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = { speed : 5 } ;

let keys = {ArrowUp: "false", ArrowDown: "false", ArrowLeft: "false", ArrowRight: "false"};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
    //console.log(e.key);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
    //console.log(e.key);
}

function gamePlay(){
    console.log("Start");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    console.log(road);
    if(player.start){

        if(keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 70) ) { player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0  ) { player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 50) ) { player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
    }

}
function start(){
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    player.start = true;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute("class","lines");
        roadLine.style.top = (x*150) + "px";
        gameArea.appendChild(roadLine);
    }

    let roadLine = document.createElement('div');
    roadLine.setAttribute("class","lines");
    gameArea.appendChild(roadLine);

    let car = document.createElement('div');
    car.setAttribute("class","car");
    //car.innerText = "Hey I'm Your Car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    console.log("top Position "+car.offsetTop);
    console.log("left Position "+car.offsetLeft);
}