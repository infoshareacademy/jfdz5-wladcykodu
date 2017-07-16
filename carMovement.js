/**
 * Created by ajemi on 12.07.2017.
 */

$(document).keydown(function(e) {
    var move = $('.game-table-data').width();
    var position = $('.games-auto').position();
    if (e.which === 37) {
        console.log('left');
        $('.games-auto').css('left', position.left - move/2);
    } else if (e.which === 39) {
        console.log('right');
        $('.games-auto').css('left', position.right + move);
    } else {
        position;
        console.log('other key');
        $('.games-auto').css();
    }
});

/*

$(document).keydown(function(e) {
    switch (e.which) {
        case 37:
            $('.games-auto').css('left', position.left + '6.666666666666667%');

            break;
        case 39:
            $('.games-auto').css('transform', 'translateX(50%)');

            break;
        default:
            break;
    }
});

*/
