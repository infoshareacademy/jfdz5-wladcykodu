function createBonus(gameclass) {

    // create an array named bonusItems that contains svg files
    var bonusItems = [
        "parts_game/part1.svg",
        "parts_game/part2.svg",
        "parts_game/part3.svg",
        "parts_game/part4.svg",
        "parts_game/part5.svg",
        "parts_game/part6.svg",
        "parts_game/oil.svg",
        "parts_game/tank.svg",
        "parts_game/repair.svg"
    ];
    // random element from bonusItems
    var index = Math.floor(Math.random() * (bonusItems.length - 1));
    // add bonusItem to div ('good-elem')
    function buildBonus() {
        var img = document.createElement('img');
        console.log(index);
        img.src = bonusItems[index];
        document.getElementById('good-elem').appendChild(img);
    }

    var boardField = $('.board-field');
    var fieldWidth = boardField.outerWidth();
    var fieldHeight = boardField.outerHeight();
    // pick random color for div
    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    var $element = $('<div id="good-elem"/>').css({
        'width': fieldWidth,
        'height': fieldHeight,
        'background-color': color
    });
    // random position of added divs
    var posy = Math.floor((Math.random() * 20)) * (fieldHeight);
    var posx = Math.floor((Math.random() * 30)) * (fieldWidth);

    $element.css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'none'
    }).appendTo(gameclass).fadeIn(100, function () {
        buildBonus();
    }).delay(300).fadeOut(4000, function () {
        $(this).remove(); // removing divs
    });
    // mouseover event for added divs
    $element.mouseover(function () {
        //console.log("add");
        $(this).addClass('newBonus-anim');
    });
    // click event for divs - make them disapear and add score
    $element.on('click', function () {
        $(this).css('visibility', 'hidden');
        document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 10}}));
    });
}