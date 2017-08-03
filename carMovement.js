/**
 * Created by ajemi on 12.07.2017.
 */

$(document).keydown(function (e) {
    var move = $('.board-field').outerWidth();
    var car = $('.games-auto');
    var board = car.parent();
    // var left = parseInt($('.games-auto').css('left'));
    var left = car.offset().left;
    // var limitLeft = 25;
    // var limitRight = 775 - 25;
    var limitLeft = board.offset().left - car.width();
    var limitRight = limitLeft + board.width() + car.width();

    var newPos = left
    var lastTwoRows = $('.board-field').slice(-62);

    if (e.which === 37) {
        newPos = left - move
    } else if (e.which === 39) {
        newPos = left + move
    }

    if (newPos < limitRight && newPos > limitLeft) {

        if (isValid(newPos, lastTwoRows)) {
            // $('.games-auto').css('left', newPos);
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
        // var parentPos = $(obj).parent().offset();
        // var childOffset = {
        //     top: childPos.top - parentPos.top,
        //     left: childPos.left - parentPos.left
        // }
        // console.log(childOffset.left, newPos, (childOffset.left === newPos))
        // console.log(childPos.left, newPos, (childPos.left === newPos))
        // return childOffset.left === newPos - 12
        return childPos.left === newPos
    })
    return result
}

