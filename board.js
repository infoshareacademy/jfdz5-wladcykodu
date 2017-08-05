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
    gameTime = 60 * 10,
    timerDisplay,
    gameInProgress,
    $gameboard = $('.game-board'),
    userLogin,
    readedValue,
    readedObject,
    allLogins,
    showBoard;

/*show game board after click start-game-button*/
showBoard = function showBoard() {
    $gameboard.html('<div class="login-board"></div>');
    $('.login-board')
        .append($('<img class="start-game-boom" src="game-images/start-game-boom.svg" />'))
        .append($('<input type="text" class="user-login higher-z-index">'))
        .append($('<input type="button" value="Zapisz!" class="btn btn-danger send-login-button higher-z-index">'));
    $('.send-login-button').click(function sendLoginAndStartGame() {
        if (localStorage.hasOwnProperty('gameResult')) {
            userLogin = $('.user-login').val();
            readedValue = localStorage.getItem('gameResult');
            readedObject = JSON.parse(readedValue);
            allLogins = readedObject;
            actuallyUser = {
                name: userLogin
            };
            allLogins.push(actuallyUser);
            localStorage.setItem('gameResult', JSON.stringify(allLogins));
            readedValue = localStorage.getItem('gameResult');
            readedObject = JSON.parse(readedValue);
            if (readedObject.length = 11) {
                readedObject.shift();
                localStorage.setItem('gameResult', JSON.stringify(readedObject));
            }
/*            localStorage.setItem('gameResult', JSON.stringify(readedObject));*/
        } else {
            userLogin = $('.user-login').val();
            allLogins = [];
            actuallyUser = {
                name: userLogin
            };

            allLogins.push(actuallyUser);
            localStorage.setItem('gameResult', JSON.stringify(allLogins));
        }
        console.log(localStorage.getItem('gameResult'));

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
            score = parseInt(scoreEl.innerHTML);

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
}

document.getElementById('game-frame').style.display = "flex";
/*show game*/
$('.start-game-button').click(showBoard);
/*show instruction*/
$('.instruction-button').click(function showInstruction() {
    $gameboard.html('<div class="game-instruction"></div>');
    var $instruction = $('.game-instruction');
    $instruction.css({
        'display': 'flex'
    }).appendTo($gameboard);
});
/*instructions play button*/


/*end-game board & ranking*/
function endGame() {
    readedValue = localStorage.getItem('gameResult');
    readedObject = JSON.parse(readedValue);
    var date = new Date;
    actuallyUser.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    actuallyUser.score = score;
    localStorage.setItem('gameResult', JSON.stringify(allLogins));

    $(".result-container").remove();
    $(".game-in-progress").remove();
    $('.game-board').append('<div class="game-end-board"></div>');
    $('.game-end-board')
        .append('<div class="thanks-for-games">Koniec gry! Dziękujemy!</div>')
        .append('<div class="score-count"></div>').text('Twój wynik to ' + score)
        .append('<div class="ranking">Ranking</div>')
        .append('<button class="btn btn-danger play-again-button higher-z-index">Zagraj ponownie!</button>');
    $('.ranking').append('<table>');
    $('table').append($('<tr>'));
    $('tr')
        .append('<th>Name</th>')
        .append('<th>Date</th>')
        .append('<th>Score</th>');

    readedValue = localStorage.getItem('gameResult');
    console.log(readedValue);
    readedObject = JSON.parse(readedValue);
    console.log(readedObject);
    allLogins = readedObject;
    console.log(allLogins);

    function addToTable() {
        for (i = 0; i < readedObject.length; i++) {
            $('table').html('<tr></tr>');
            console.log('create  tr');
            $('tr')
                .append($('td').text(allLogins[i].name))
                .append($('td').text(allLogins[i].date))
                .append($('td').text(allLogins[i].score));
        }
    }

    addToTable();

}

/*play again button*/
$('.play-again-button').click(function () {
    $('.game-end-board').remove();
    showBoard;
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