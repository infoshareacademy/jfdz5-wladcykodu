/**
 * Created by ajemi on 12.07.2017.
 */

$(document).keydown(function (e) {

    var car = $('.games-auto');

    var left = car.length > 0 ? car.offset().left : 0;
    var board = car.length > 0 ? car.parent() : $('.game-in-progress');
    var move = board.width()/31;

    var limitLeft = board.length > 0 ? board.offset().left - car.width() : 0;
    var limitRight = board.length > 0 ? limitLeft + board.width() + car.width() : 0;
    var newPos = left;
    var lastTwoRows = $('.board-field').slice(-62);

    if (e.which === 37) {
        newPos = left - move

    } else if (e.which === 39) {
        newPos = left + move
    }

    if (newPos < limitRight && newPos > limitLeft) {
        if (isValid(newPos, lastTwoRows)) {
            car.offset({left: newPos});
        }
    }
});

function isValid(newPos, lastTwoRows) {
    var allItems = lastTwoRows.get()
    var obstacles = allItems.filter(function (item) {
        return $(item).hasClass('board-field--obstacle')
    })

    var result = !obstacles.some(function (obj) {
        var childPos = $(obj).offset();
        return childPos.left === newPos
    })
    return result
}

