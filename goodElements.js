var score = 0;

function createBonus(gameclass) {
    var boardField = $('.board-field');
    var fieldWidth = boardField.outerWidth();
    var fieldHeight = boardField.outerHeight();

    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    var $element = $('<div class="good-elem"/>').css({
        'width': fieldWidth,
        'height': fieldHeight,
        'background-color': color
    });

    var posy = Math.floor((Math.random() * 20)) * (fieldHeight);
    var posx = Math.floor((Math.random() * 30)) * (fieldWidth);
    //console.log(posx);
    //console.log(posy);

    $element.css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'none'
    }).appendTo(gameclass).fadeIn(100).delay(300).fadeOut(4000, function () {
        $(this).remove();
        //createBonus(gameclass);
    });

    var newBonus = $('.good-elem');

    newBonus.mouseover(function () {
        $(this).addClass('newBonus-anim');
    });

    newBonus.on('click', function () {
        $(this).css('visibility', 'hidden');
        score++;
        console.log("New score is: " + score);
    });
}
