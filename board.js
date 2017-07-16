/**
 * GAME BOARD
 */


/*show game*/

$('.start-game-button').click(function () {

    $('.game-board').html('<div class="login-board"></div>');
    $('.login-board')
        .append($('<input type="text" class="user-login">'))
        .append($('<input type="button" value="Zapisz!" class="send-login-button">'));

    $('.send-login-button').click(function () {
        $('.login-board').replaceWith('<div class="game-in-progress"></div>');
        var i = 0;
        while (i < 225) {
            $('.game-in-progress').append($('<div class="board-field">'));
            i++;
        }
        $('.game-in-progress').append($('<img class="games-auto" src="car.svg">'));
        var bonus = setInterval(function(){ (createBonus($('.game-in-progress'))); }, 4400);
        console.log(bonus);
    });
});


/*show instruction*/
$('.instruction-button').click(function () {
    $('.game-board').html("tu bedzie instrukcja");
});


/*hide game feame*/
$('.escape-game-button').click(function () {
    $('.game-frame').hide();
});