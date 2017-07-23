/**
 * GAME BOARD
 */
var bonus;
var obstaclesInterval;
var releaseCounter = 0;
var release = true;
var restart = false;

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
        localStorage.setItem("login", userLogin);
        $('.game-board').prepend('<div class="result-container"></div>');
        $('.result-container')
            .append('<div class="result-container-element">score: <div id="score">0</div></div>')
            .append('<div class="result-container-element">time<div id="timer">00:00</div></div>')
            .append('<div class="result-container-element">lives: <span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span></div>');
        $('.login-board').replaceWith('<div class="game-in-progress"></div>');
        var i = 0;
        while (i < 713) {
            $('.game-in-progress').append($('<div class="board-field">'));
            i++;
        }
        $('.game-in-progress').append($('<img class="games-auto" src="car.svg">'));

        // score - add and substract function
        document.addEventListener("score", function (e) {
            var scoreEl = document.getElementById('score');
            var score = parseInt(scoreEl.innerHTML);

            if (e.detail.action === "add") {
                scoreEl.innerHTML = score + e.detail.value;
            } else if (e.detail.action === "substract") {
                if (score > 0) {
                    scoreEl.innerHTML = score - e.detail.value;
                }
            }

        }, false);

        // setting obstacles
        obstaclesInterval = setInterval(function () {
            releaseCounter = releaseCounter < 3 ? releaseCounter + 1 : 1;
            release = releaseCounter === 1 ? true : false;
            restart = setObstacles(release, restart);
        }, 300);

        // adding bonusItems - createBonus function
        bonus = setInterval(function () {
            createBonus($('.game-in-progress'));
        }, 4400);

        // added timer for game
        $(function ($) {
            var tenMinutes = 60 * 10,
                display = $('#timer');
            gameTimer(tenMinutes, display);
        });
    })
});
/*show instruction*/
$('.instruction-button').click(function showInstruction() {
    $('.game-board').html("tu bedzie instrukcja");
});
/*hide game feame*/
$('.escape-game-button').click(function hideBoard() {
    $('.game-frame').remove();
});

