let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple", "green"];
let start = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(start == false){
        // console.log("Game Started");
        start = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash")
    },250);
}

//for user
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash")
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);//class created and used both
    // console.log(randColor);
    // console.log(randIdx);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function btnPress(){
    console.log(this);
    let btn = this;
    btnFlash(btn);
}

function checkAns(idx){
    //console.log("curr level : ",level);

    if(userSeq[idx] === gameSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(level > highScore)
            highScore = level;
        else{
            h2.innerHTML = `Game Over!<br>Your Score is <b>${level}</b> - High Score Was <b>${highScore}</b><br>press any key to start.`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(function(){
                document.querySelector("body").style.backgroundColor = "white";
            },250);
            reset();
        }
    }
}

//for user
function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    highScore = level;
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}