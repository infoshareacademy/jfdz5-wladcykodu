/**
 * GAME BOARD
 */
var bonus,
    obstaclesInterval,
    releaseCounter = 0,
    release = true,
    restart = false,
    gameTime = 60 * 10,
    timerDisplay,
    gameInProgress;

document.getElementById('game-frame').style.display = "block";
/*show game*/
$('.start-game-button').click(function showBoard() {
    $('.game-board').html('<div class="login-board"></div>');
    $('.login-board')
        .append($('<img class="start-game-boom" src="game-images/start-game-boom.svg" />'))
        .append($('<input type="text" class="user-login higher-z-index">'))
        .append($('<input type="button" value="Zapisz!" class="btn btn-danger send-login-button higher-z-index">'));
    $('.send-login-button').click(function sendLoginAndStartGame() {
        var userLogin = $('.user-login').val();
        var rankValue = {
            name: userLogin
        };
        localStorage.setItem('gameResult', JSON.stringify(rankValue));
        $('.game-board').prepend('<div class="result-container"></div>');
        $('.result-container')
            .append('<div class="result-container-element">score: <div id="score">0</div></div>')
            .append('<div class="result-container-element">time<div id="timer">00:00</div></div>')
            .append('<div class="result-container-element">lives: <span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span></div>');
        $('.login-board').replaceWith('<div class="game-in-progress"></div>');

        gameInProgress = $('.game-in-progress');

        var i = 0;
        while (i < 713) {
            gameInProgress.append($('<div class="board-field">'));
            i++;
        }
        gameInProgress.append($('<img class="games-auto" src="car.svg">'));

        // score - add and substract function
        document.addEventListener("score", function (e) {
            var scoreEl = document.getElementById('score');
            var score = parseInt(scoreEl.innerHTML);

            if (e.detail.action === "add") {
                scoreEl.innerHTML = score + e.detail.value;
            } else if (e.detail.action === "subtract") {
                if (score >= 0) {
                    scoreEl.innerHTML = score - e.detail.value;
                }
            }
            if (score < 0) {
                scoreEl.innerHTML = 0;
            }

        }, false);

        // setting obstacles
        startObstacles();
        // adding bonusItems - createBonus function
        startBonus();
        // added timer for game
        $(function ($) {
            timerDisplay = $('#timer');
            gameTimer(gameTime);
        });
        stopGameAfterTime();
    });
});
/*show instruction*/
$('.instruction-button').click(function showInstruction() {
    $('.game-board').html("tu bedzie instrukcja");
});
/*hide game feame*/
$('.escape-game-button').click(function hideBoard() {
    $('.game-frame').remove();
});

function startBonus() {
    bonus = setInterval(createBonus, 4400);
}

function startObstacles() {
    obstaclesInterval = setInterval(function () {
        releaseCounter = releaseCounter < 3 ? releaseCounter + 1 : 1;
        release = releaseCounter === 1;
        restart = setObstacles(release, restart);
    }, 300);
}