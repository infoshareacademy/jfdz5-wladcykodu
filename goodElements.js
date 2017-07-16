var score = 0;

function createBonus(gameclass) {
    var boardField = $('.board-field');
    var fieldWidth = boardField.width();
    var fieldHeight = boardField.height();

    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    var $element = $('<div class="good-elem"/>').css({
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



//setTimeout(function () {
//    clearInterval(bonus);
//}, 420000);


//var bonus = setInterval(function(){ (createBonus($('.game-in-progress'))); }, 4400);
console.log(bonus);