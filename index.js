let s=60;
let cs = 0,hs=0;
let num1 = 0,num2 = 0,answer=0;
let letsgo = new Audio();
let levelup = new Audio();
let error = new Audio();
let gameover = new Audio();

if(localStorage.getItem("hs")){
    hs = localStorage.getItem("hs");
    $("#hs").html(`HighestScore : ${hs}`);
}


function countdown(){
    let x = setInterval(function(){
        if(s != 0){
            s--;
            $("#timer").html(`Countdown : ${s}`);
        }
        if(s == 0){
            $("#startbtn").removeAttr("disabled");
            $("#submitbtn").attr("disabled","");
            gameover.src = "./game-over.mp3";
            gameover.play();
            if(cs > hs){
                hs = cs;
                localStorage.setItem("hs",hs);
                $("#hs").html(`HighestScore : ${hs}`);
            }
            clearInterval(x);
        }
    },1000)
    
}

function rndmNumGenerator(){
    num1 = Math.ceil(Math.random()*12);
    num2 = Math.ceil(Math.random()*12);
    answer = num1 * num2;
    console.log("answer = ",answer);
    $("h1").html(`What is ${num1} * ${num2} ?`);
}

$("#submitbtn").on('click',function(){
    if(parseInt($("input").val()) == answer){
        levelup.src = "./level-up.mp3";
        levelup.play();
        $("#cs").html(`CurrentScore : ${++cs}`);
        rndmNumGenerator();
    }
    else if(parseInt($("input").val()) != answer){
        $("#cs").html(`CurrentScore : ${--cs}`);
        error.src = "./error.mp3";
        error.play();
    }
    $("input").val("");
})

$("#startbtn").on('click',function(){
    letsgo.src = "./letsgo.mp3";
    letsgo.play();
    rndmNumGenerator();
    cs = 0;
    $("#cs").html(`CurrentScore : ${cs}`);
    $("#startbtn").attr("disabled","");
    $("#submitbtn").removeAttr("disabled");
    s = 60; 
    countdown();
})