var gamePattern = [];
var level=0;
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;
var userClickedPattern = [];
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+ level.toString());
    level+=1;
}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var ind=userClickedPattern.length-1;
    checkAnswer(ind);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100)
}

$(document).keypress(function(){
    if(started==false){
    nextSequence();
    started=true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        })
        $("#level-title").text("Game Over, Press Any Key to Restart")
        gameover();
    }
}

function gameover(){
    started=false;
    gamePattern=[];
    level=0;
}