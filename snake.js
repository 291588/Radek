


let wybor;	
let b = document.body;

let button1 = document.createElement("button");
let button2 = document.createElement("button");
let button3 = document.createElement("button");
button1.textContent = "Plaszczyzna";
button2.textContent = "Plaszczyzna + jedzOgon";
button3.textContent = "Torus";
document.body.appendChild(button1);
document.body.appendChild(button2);
document.body.appendChild(button3);

document.body.addEventListener("click",function(e){

if(e.target === button1){	
wybor = 1;	
b.removeChild(button1);
b.removeChild(button2);
b.removeChild(button3);

Gra(1);		
}	
	
else if(e.target === button2){
wybor = 2;	
b.removeChild(button1);
b.removeChild(button2);
b.removeChild(button3);
Gra(2);			
	
}	
	
else if(e.target === button3){
wybor = 3;
b.removeChild(button1);
b.removeChild(button2);
b.removeChild(button3);
Gra(3);		


}		
});


function Gra(wybor){



let koniec = new Audio();
let jedz = new Audio();
let gora = new Audio();
let prawo = new Audio();
let lewo = new Audio();
let dol = new Audio();

koniec.src = "koniec.mp3";
jedz.src = "jedz.mp3";
gora.src = "gora.mp3";
prawo.src = "prawo.mp3";
lewo.src = "lewo.mp3";
dol.src = "dol.mp3";


let i;
let j;

let cvs = document.createElement("CANVAS");
document.body.appendChild(cvs);
let ctx = cvs.getContext("2d");

cvs.width = 600;
cvs.height = 600;
cvs.style.border = "1px solid #000000";

const cvsW = cvs.width;
const cvsH = cvs.height;

const snakeW = 24;
const snakeH = 24;

let wynik = 0;

let kierunek;


function sKierunek(e){

if(e.keyCode === 37 && kierunek !== "prawo"){
kierunek = "lewo";
lewo.play();}
if(e.keyCode === 38 && kierunek !== "dol"){
kierunek = "gora";
gora.play();}
if(e.keyCode === 39 && kierunek !== "lewo"){
kierunek = "prawo";
prawo.play();}
if(e.keyCode === 40 && kierunek !== "gora"){
kierunek = "dol";
dol.play();}

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
x: Math.round(Math.random()*((cvsW/snakeW-2)+2)),
y: Math.round(Math.random()*((cvsH/snakeH-2)+2))
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


function jedzOgon(x,y,array){
for(i = 1; i< array.length; i += 1){
if( x === array[i].x && y === array[i].y){
for( j=0; j< (array.length-(array.length-i)); j+=1 ){
array.pop();
wynik--;		
}		
}		
}		
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


function Torus(){
	
if(snakeX < 0){
snakeX = (cvsW/snakeW);	
}	
else if(snakeX >= cvsW/snakeW ){
snakeX = -1;		
}	
else if(snakeY < 0){
snakeY = (cvsH/snakeH);	
} 	
else if(snakeY >= cvsH/snakeH)
{	
snakeY = -1;	
}
}
if(wybor === 3){
Torus();	
	
}

if(wybor === 1 ){
if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH){
koniec.play();
alert("GAME OVER!");
location.reload();
}
}
if(wybor === 2 ){
if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH){
koniec.play();
alert("GAME OVER!");
location.reload();
}
}


if(wybor === 1 ){
if(Kolizja(snakeX,snakeY,snake)){
koniec.play();
alert("GAME OVER!");
location.reload();
}
}
if(wybor === 3 ){
if(Kolizja(snakeX,snakeY,snake)){
koniec.play();
alert("GAME OVER!");
location.reload();
}
}

if(wybor === 2){	
jedzOgon(snakeX,snakeY,snake);
}

if( kierunek === "lewo"){snakeX -= 1;}
else if( kierunek === "gora"){snakeY -= 1;}
else if( kierunek === "prawo"){snakeX += 1;}
else if( kierunek === "dol"){snakeY += 1;}

let nowaGlowa = {
x: snakeX,
y: snakeY
};


if(snakeX === food.x && snakeY === food.y){
jedz.play();
food = {
x: Math.round(Math.random()*((cvsW/snakeW-1)+1)),
y: Math.round(Math.random()*((cvsH/snakeH-1)+1))
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


