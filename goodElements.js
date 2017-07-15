var score = 0;

function makeElem(gameclass) {
    var boaardField = $('.board-field');
    var fieldWidth = boaardField.width();
    var fieldHeight = boaardField.height();

    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    $element = $('<div class="good-elem"/>').css({
        'width': fieldWidth,
        'height': fieldHeight,
        'background-color': color
    });

    var posx = Math.floor((Math.random() * 16)) * (fieldHeight);
    var posy = Math.floor((Math.random() * 14)) * (fieldWidth);
    //console.log(posx);
    //console.log(posy);

    $element.css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'none'
    }).appendTo(gameclass).fadeIn(100).delay(300).fadeOut(4000, function () {
        $(this).remove();
        makeElem(gameclass);
    });

    var newDiv = $('.good-elem');

    newDiv.mouseover(function () {
        $(this).addClass('newdiv-anim');
    });

    newDiv.on('click', function () {
        $(this).css('visibility', 'hidden');
        score++;
        console.log("New score is: " + score);
    });
}