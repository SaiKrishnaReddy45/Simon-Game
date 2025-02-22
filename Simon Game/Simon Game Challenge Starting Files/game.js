let gamePattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let userClickedPattern=[];
var level=0;
var started=false;
$(".btn").click(function(){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;    
    }
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor((Math.random())*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 setTimeout(function(){
$("#"+currentColour).removeClass("pressed")
 },100);
}

function checkAnswer(currentLevel){
 if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
 }else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
 }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}