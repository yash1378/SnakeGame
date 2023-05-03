//Game Constants and variables
let inputdir = {x:0 , y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
// musicSound.play();

let speed = 8;
let score = 0;
let lastpainttime = 0;
let snakeArr = [{x:13 , y:15}]
food = {x:6 , y:7};


//Game Functions
function main(ctime){
    //this requestAnimationFrame is better than setinterval and settimeout
    window.requestAnimationFrame(main); //now this has become the game loop
    // console.log(ctime);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    // musicSound.play();
    lastpainttime = ctime;
    gameengine();
}

function iscollide(sarr){
    //if snake bump into itself

    for (let i = 1; i < sarr.length; i++) {
        if(sarr[0].x===sarr[i].x && sarr[0].y===sarr[i].y){
            return true;
        }
    }

    //if you bumped into the wall
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0){
        return true;
    }
        
    

}

function gameengine(){
    //part1 : updating the snake array and food
    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputdir = {x:0,y:0};
        alert("Game over . Press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
        let s= document.getElementById("score");
        s.innerHTML = "Score: "+score;

    }
    //if you have eaten the food increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highscore.innerHTML = "HiScore: " + hiscoreval;
        }

        let s= document.getElementById("score");
        s.innerHTML = "Score: "+score;
        snakeArr.unshift({x:(snakeArr[0].x),y:(snakeArr[0].y)})
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
        // this is a formula to generate random number between a to b.

    }

    //moving the snake

    for (let i = snakeArr.length-2 ;i>=0; i--) {
        // const element = [i];
        snakeArr[i+1] = {...snakeArr[i]}; // if we dont use curly braces then it will just point at that object so after sometime at the end all will point at the same object 
    }

    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;
    //part 2 : display the snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;

        //adding a new class to the board
        if(index === 0){
            snakeelement.classList.add('head');
        }
        else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });

    //Display the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food')
    board.appendChild(foodelement);
}











musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscore.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputdir = {x:0,y:0} //start the game on clicking any key
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
        console.log("ArrowUp")
            inputdir.x=0;
            inputdir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputdir.x=0;
            inputdir.y=1;
            break;

        case "ArrowLeft":
        console.log("ArrowLeft")
            inputdir.x=-1;
            inputdir.y=0;
            break;
    
        case "ArrowRight":
        console.log("ArrowRight")
            inputdir.x=1;
            inputdir.y=0;
            break;

        default:
            break;









    }
});
