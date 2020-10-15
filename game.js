let userClickPattern = [];
let gamePattern = [];
let buttonColors = ['red', 'green', 'blue', 'yellow'];
let started = false;
let level = 0;
let score = 0;
let gameProc;

$("body").keypress(function () {
    if (!started) {
        $(".game-over").remove();
        $("#level-title").text("Level " + level);
        $("#score").text(score);
        started = true;
        produceGamePattern();
    }
});

$(".btn").on("click", function (e) {
    let userChosenColor = this.getAttribute('id');
    userClickPattern.push(userChosenColor);

    $(`#${userChosenColor}`).fadeOut().fadeIn();
    audios(`sounds/${userChosenColor}.mp3`);

    checkAnswer(userClickPattern.length - 1);
});

function produceGamePattern() {
    level++;
    $("h1").text(`LEVEL ${level}`);
    for (let i = 1; i <= level; i++) {
        gameProc = setTimeout(nextSequence, i * 1000);
        if (started == false) {
            break;
            clearTimeout(gameProc);
        }
    }

}

function nextSequence() {
    userClickPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColors = buttonColors[randomNumber];
    gamePattern.push(randomChosenColors);
    $("#" + randomChosenColors).fadeOut().fadeIn();
    audios(`sounds/${randomChosenColors}.mp3`);
}

function checkAnswer(currentLevel) {
    let answer;
    if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
        console.log("success");
        score++;
        $("#score").text(score);
        if (gamePattern.length == userClickPattern.length) {
            answerRight();
        }

    } else {
        console.log("wrong");
        answerWrong();
    }

}

function answerRight() {
    userClickPattern = [];
    gamePattern = [];
    setTimeout(produceGamePattern, 2000);
}

function answerWrong() {
    $(".game-over").remove();
    $("body").toggleClass("game-over").fadeOut();
    setTimeout(function () {
        $("body").toggleClass("game-over").fadeIn();
    }, 300);
    audios("sounds/wrong.mp3");
    reset();
}

function reset() {
    userClickPattern = [];
    gamePattern = [];
    level = 0;
    $("h1").text(`Press Any Key To Start`);
    $("h1").before(`<h1 id="level-title" class="game-over">GAME OVER</h1>`);
    score = 0;
    started = false;
}

function audios(src) {
    let audio = new Audio(src);
    return audio.play();
}