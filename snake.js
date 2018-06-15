window.onload = function(){
"use strict";

let i;

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const cvsW = cvs.width;
const cvsH = cvs.height;

const snakeW = 24;
const snakeH = 24;

let wynik = 0;

let kierunek;




function sKierunek(e){

if(e.keyCode === 37 && kierunek !== "right"){
kierunek = "left";}
if(e.keyCode === 38 && kierunek !== "down"){
kierunek = "up";}
if(e.keyCode === 39 && kierunek !== "left"){
kierunek = "right";}
if(e.keyCode === 40 && kierunek !== "up"){
kierunek = "down";}

}

document.addEventListener("keydown",sKierunek);

function rysSnake(x,y){

ctx.fillStyle = "blue";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

ctx.fillStyle = "green";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

}




let snake =[];



snake.push({
x:12,
y:12
});


let food = {
x: Math.round(Math.random()*((cvsW/snakeW-1)+1)),
y: Math.round(Math.random()*((cvsH/snakeH-1)+1))
};

function rysFood(x,y){

ctx.fillStyle = "red";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

ctx.fillStyle = "white";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

}


function Kolizja(x,y,array){
for( i = 1; i< array.length; i += 1){
if( x === array[i].x && y === array[i].y){
return true;
}
}
return false;
}


function rysWynik(x){
ctx.fillStyle = "black";
ctx.font = "30px Times New Roman";
ctx.fillText("wynik: "+x,5,cvsH-5);
}


function rys(){
ctx.clearRect(0,0,cvsW,cvsH);
for( i=0;i<snake.length;i += 1){
let x = snake[i].x;
let y = snake[i].y;
rysSnake(x,y);
rysFood(food.x,food.y);
}


let snakeX = snake[0].x;
let snakeY = snake[0].y;


if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH){
alert("GAME OVER!");
location.reload();
}


if(Kolizja(snakeX,snakeY,snake)){
alert("GAME OVER!");
location.reload();
}


if( kierunek === "left"){snakeX -= 1;}
else if( kierunek === "up"){snakeY -= 1;}
else if( kierunek === "right"){snakeX += 1;}
else if( kierunek === "down"){snakeY += 1;}

let nowaGlowa = {
x: snakeX,
y: snakeY
};


if(snakeX === food.x && snakeY === food.y){
food = {
x: Math.round(Math.random()*(cvsW/snakeW-1)+1),
y: Math.round(Math.random()*(cvsH/snakeH-1)+1)
};

nowaGlowa = {
x: snakeX,
y: snakeY
};
wynik += 1;
}
else{
snake.pop();

nowaGlowa = {
x: snakeX,
y: snakeY
};
}

snake.unshift(nowaGlowa);
rysWynik(wynik);

}

setInterval(rys,100);
}


