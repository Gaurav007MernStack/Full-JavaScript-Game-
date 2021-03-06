//ctrl d => for selecting multi variables of same word
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);
let player = { speed : 5 , score : 0} ;


let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false , w: false,a: false,s:false,d:false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    //console.log(keys);
    //console.log(e.key);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    //console.log(keys);
    //console.log(e.key);
}
function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    console.log("car ",aRect);
    console.log("other", bRect);

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)
    || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y > 700){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final Score is " + (ps +5) + " <br> Press here to Restart the Game.";
   
    
}


function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){
        if(player.score++  > 2000){
            player.speed = 6;
            item.y += player.speed;
        }
        
        if(isCollide(car, item)){
            console.log("Boom HIT");
            console.log(player.speed);
            endGame();
        }

        if(item.y > 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay(){
    //console.log("Start Clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    //console.log(road);
    
    if(player.start){

        moveLines();
        moveEnemy(car);

        if((keys.ArrowUp || keys.w) && player.y > (road.top + 70)) { player.y -= player.speed}
        if((keys.ArrowDown || keys.s) && player.y < (road.bottom - 85) ) { player.y += player.speed}
        if((keys.ArrowLeft || keys.a) && player.x > 0  ) { player.x -= player.speed}
        if((keys.ArrowRight || keys.d) && player.x < (road.width - 65) ) { player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        ps = player.score ;
        score.innerText = "Score: " + ps;
    }

}
function start(){
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute("class","lines");
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
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

    //console.log("top Position "+car.offsetTop);
    //console.log("left Position "+car.offsetLeft);
    for(x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute("class","enemy");
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return '#'+c()+c()+c();
}