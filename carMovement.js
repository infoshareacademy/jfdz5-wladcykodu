/**
 * Created by ajemi on 12.07.2017.
 */

$(document).keydown(function (e) {
    var move = $('.board-field').outerWidth();
    var left = parseFloat($('.games-auto').css('left'));
    var limitLeft = 12.5;
    var limitRight = 762.5;
    if (e.which === 37) {
        if (left !== limitLeft) {
            $('.games-auto').css('left', left - move);
        }
    } else if (e.which === 39) {
        if (left !== limitRight)
            $('.games-auto').css('left', left + move);
    }
});

