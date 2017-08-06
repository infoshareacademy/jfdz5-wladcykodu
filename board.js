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
    $gameboard = $('.game-board'),
    userLogin,
    temporaryUserLogin,
    readedValue,
    readedObject,
    allLogins,
    showBoard,
    $gameEndBoard,
    $musicForGame,
    $welcomeMusic,
    $quizButtonSound = $('<embed src="music/buttonOkaySound.ogg" autostart="true" loop="false" width="0" height="0">'),
    $endSound;

/*show game board after click start-game-button*/
showBoard = function showBoard() {
    $gameboard.html('<div class="login-board"></div>');
    $('.login-board').append($('<div class="login-frame">'));
    $('.login-frame')
        .append($('<h2><span data-lang="Please enter your login.">Podaj swój login.</span></h2>'))
        .append($('<h4 data-lang="After the game you will see a top 10 ranking.">Po zakończeniu gry zostanie wyświetlony ranking 10 najlelpszych wyników.</h4>'))
        .append($('<h4 data-lang="Have fun and beat the records!">Baw się i pobijaj rekordy!</h4>'))
        .append($('<input type="text" placeholder="login" class="user-login higher-z-index">'))
        .append($('<input type="button" value="Zapisz" data-lang="Send" class="btn btn-danger send-login-button higher-z-index">'));
    $('.send-login-button').click(function sendLoginAndStartGame() {
        if (localStorage.hasOwnProperty('gameResult')) {
            temporaryUserLogin = $('.user-login').val();
            console.log(temporaryUserLogin);
            userLogin = temporaryUserLogin.length > 0 ? $('.user-login').val() : 'login';
            console.log(userLogin);
            readedValue = localStorage.getItem('gameResult');
            console.log(readedValue);
            readedObject = JSON.parse(readedValue);
            allLogins = readedObject;
            actuallyUser = {
                name: userLogin
            };
            allLogins.push(actuallyUser);
            localStorage.setItem('gameResult', JSON.stringify(allLogins));
            readedValue = localStorage.getItem('gameResult');
            readedObject = JSON.parse(readedValue);
        } else {
            temporaryUserLogin = $('.user-login').val();
            console.log(temporaryUserLogin);
            userLogin = temporaryUserLogin.length > 0 ? $('.user-login').val() : 'login';
            console.log(userLogin);
            allLogins = [];
            console.log(allLogins);
            actuallyUser = {
                name: userLogin
            };
            console.log(actuallyUser);

            allLogins.push(actuallyUser);
            localStorage.setItem('gameResult', JSON.stringify(allLogins));
        }

        $('.game-board').prepend('<div class="result-container"></div>');
        $('.result-container')
            .append('<div class="result-container-element" data-lang="Score">Punkty: <div id="score">0</div></div>')
            .append('<div class="result-container-element" data-lang="Time">Czas<div id="timer">00:00</div></div>')
            .append('<div class="result-container-element"><p data-lang="Lives">Życia:</p><div class="lives"><span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span></div></div>');
        $('.login-board').replaceWith('<div class="game-in-progress"></div>');
        gameInProgress = $('.game-in-progress');

        var i = 0;
        while (i < 713) {
            gameInProgress.append($('<div class="board-field">'));
            i++;
        }
        gameInProgress
            .append('<div class="road-line road-line-1">')
            .append('<div class="road-line road-line-2">')
            .append('<div class="road-dashed-line road-dashed-line-1">')
            .append('<div class="road-dashed-line road-dashed-line-2">')
            .append('<div class="road-dashed-line road-dashed-line-3">')
            .append('<div class="road-dashed-line road-dashed-line-4">')
            .append('<div class="road-dashed-line road-dashed-line-5">')
            .append('<div class="road-dashed-line road-dashed-line-6">')
            .append($('<img class="games-auto" src="car.svg">'));
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
                if (score > 0) {
                    scoreEl.innerHTML = score - e.detail.value;
                }
                score = parseInt(scoreEl.innerHTML);
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
};

document.getElementById('game-frame').style.display = "none";
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

/*end-game board & ranking*/
function endGame() {
    readedValue = localStorage.getItem('gameResult');
    readedObject = JSON.parse(readedValue);
    var date = new Date;
    actuallyUser.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    actuallyUser.score = score;
    localStorage.setItem('gameResult', JSON.stringify(allLogins));
    clear();
    $(".result-container").remove();
    $(".game-in-progress").remove();
    $('.game-board').append('<div class="game-end-board"></div>');
    $gameEndBoard = $('.game-end-board');
    $musicForGame.remove();
    $endSound = $('<embed src="music/endGameSound.ogg" autostart="true" loop="false" width="0" height="0">');
    $gameEndBoard.append($endSound);
    $('.game-end-board')
        .append('<div>').html('<h2 class="thanks-for-games" data-lang="End of the game! Thank you!">Koniec gry! Dziękujemy!</h2><h3 class="score-count" data-lang="Your result is ">Twój wynik to :</h3>' + score)
        .append('<div class="ranking"><h3>Ranking</h3></div>')
        .append('<button class="btn btn-danger play-again-button higher-z-index" data-lang="Play again!">Zagraj ponownie!</button>');
    $('.ranking').append($('<table>').addClass('rank-table'));
    $('table.rank-table').append($('<tr>'));
    $('table.rank-table tr')
        .append('<th>Login</th>')
        .append('<th data-lang="Date">Data</th>')
        .append('<th data-lang="Score">Wynik</th>');

    readedValue = localStorage.getItem('gameResult');
    readedObject = JSON.parse(readedValue);
    allLogins = readedObject;
    allLogins.sort(function (log1, log2) {
        return log2.score - log1.score;
    });
    allLogins.splice(10);
    function addToTable() {
        for (i = 0; i < allLogins.length; i++) {
            $('table.rank-table').append('<tr></tr>');
            $('table.rank-table tr:last-child')
                .append($('<td>').text(allLogins[i].name))
                .append($('<td>').text(allLogins[i].date))
                .append($('<td>').text(allLogins[i].score));
        }
    }
    addToTable();
}

/*play again button*/
$('body').on('click', '.play-again-button',showBoard);


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