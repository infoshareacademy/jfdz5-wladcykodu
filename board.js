/**
 * GAME BOARD
 */
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
            .append('<div class="result-container-element">score:</div>')
            .append('<div class="result-container-element">time</div>')
            .append('<div class="result-container-element">lives: <span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-heart"></span></div>');
        $('.login-board').replaceWith('<div class="game-in-progress"></div>');
        var i = 0;
        while (i < 713) {
            $('.game-in-progress').append($('<div class="board-field">'));
            i++;
        }
        $('.game-in-progress').append($('<img class="games-auto" src="car.svg">'));
        setObstacles();
        var bonus = setInterval(function () {
            (createBonus($('.game-in-progress')));
        }, 4400);
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
