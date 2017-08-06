/**
 * GAME BOARD
 */
var bonus,
    score = 0,
    currentTimer,
    obstaclesFrequency = 300,
    obstaclesInterval,
    releaseCounter = 0,
    release = true,
    restart = false,
    gameTime = 60 * 5,
    timerDisplay,
    gameInProgress,
    $gameEndBoard,
    $musicForGame,
    $welcomeMusic,
    $quizButtonSound = $('<embed src="music/buttonOkaySound.ogg" autostart="true" loop="false" width="0" height="0">'),
    $endSound,
    $gameboard = $('.game-board');

document.getElementById('game-frame').style.display = "flex";
/*show game*/
$('.start-game-button').click(function showBoard() {
    $gameboard.html('<div class="login-board"></div>');
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

        //music for game - background theme and welcome message
        $welcomeMusic = $('<audio autoplay><source src="music/welcome.ogg" type="audio/ogg"/></audio>');
        gameInProgress.append($welcomeMusic).delay(3000).queue(function (next) {
            $musicForGame = $('<audio autoplay loop><source src="music/theme.ogg" type="audio/ogg"/></audio>');
            $(this).append($musicForGame);
            next();
        });

        // score - add and substract function
        document.addEventListener("score", function (e) {
            var scoreEl = document.getElementById('score');
            score = parseInt(scoreEl.innerHTML);

            if (e.detail.action === "add") {
                scoreEl.innerHTML = score + e.detail.value;
            } else if (e.detail.action === "subtract") {
                if (score >= 0) {
                    scoreEl.innerHTML = score - e.detail.value;
                    console.log('oedejmij: ', score)
                }
            }
            if (score < 0) {
                scoreEl.innerHTML = 0;
                console.log('zeruj: ', score)
            }
            score = parseInt(scoreEl.innerHTML);
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
    });
});
/*show instruction*/
$('.instruction-button').click(function showInstruction() {
    $gameboard.html('<div class="game-instruction"></div>');
    var $instruction = $('.game-instruction');
    $instruction.css({
        'display': 'flex'
    }).appendTo($gameboard);
});

/*end-game board & ranking*/
function endGame() {
    $(".result-container").remove();
    console.log("remove");
    $(".game-in-progress").remove();
    $('.game-board').append('<div class="game-end-board"></div>');
    $gameEndBoard = $('.game-end-board');
    $gameEndBoard
        .append('<div class="thanks-for-games">Koniec gry! Dziękujemy!</div>')
        .append('<div class="score-count">Twój wynik to <span>score</span></div>')
        .append('<div class="ranking">Ranking</div>');
    $musicForGame.remove();
    $endSound = $('<embed src="music/endGameSound.ogg" autostart="true" loop="false" width="0" height="0">');
    $gameEndBoard.append($endSound);
}

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
    }, obstaclesFrequency);
}

//restart intervals
function restartIntervals() {
    gameTimer(gameTime);
    startBonus();
    startObstacles();
}

//clear intervals
function clear() {
    clearInterval(bonus);
    clearInterval(obstaclesInterval);
    clearInterval(timerInterval);
}