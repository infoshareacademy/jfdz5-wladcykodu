function createBonus(gameclass) {

    // create an array named bonusItems that contains svg files
    var bonusItems = [["parts_game/part1.svg", "bonus-img"],
                     ["parts_game/part2.svg", "bonus-img"],
                     ["parts_game/part3.svg", "bonus-life"],
                     ["parts_game/part4.svg", "bonus-img"],
                     ["parts_game/part5.svg", "bonus-img"],
                     ["parts_game/part6.svg", "bonus-img"],
                     ["parts_game/oil.svg", "bonus-img"],
                     ["parts_game/tank.svg", "bonus-img"],
                     ["parts_game/repair.svg", "bonus-img"]];

    // random bonusDiv from bonusItems
    var index = Math.floor(Math.random() * (bonusItems.length - 1));

    // add bonusItem to div ('good-elem')
    function buildBonus() {
        if (bonusItems[index].length !== 2) {
            return
        }

        var bonusItem = document.createElement('img');

        bonusItem.src = bonusItems[index][0];
        bonusItem.className = bonusItems[index][1];
        console.log(index);
        document.getElementById('good-elem').appendChild(bonusItem);
        //add event to selected item from array
        var $quiz = $('.bonus-life');
        $quiz.on('click', function () {
            console.log('test');
            $('.game-in-progress').append('<div class="quiz-board"></div>');
            clearInterval(bonus);
        });
    }

    var boardField = $('.board-field');
    var fieldWidth = boardField.outerWidth();
    var fieldHeight = boardField.outerHeight();
    // pick random color for div
    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    var $bonusDiv = $('<div id="good-elem"/>').css({
        'width': fieldWidth * 2,
        'height': fieldHeight * 2,
        'background-color': color
    });
    // random position of added divs
    var posy = Math.floor((Math.random() * 19)) * (fieldHeight);
    var posx = Math.floor((Math.random() * 20)) * (fieldWidth);

    $bonusDiv.css({
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
    $bonusDiv.mouseover(function () {
        //console.log("add");
        $(this).addClass('newBonus-anim');
    });
    // click event for divs - make them disapear and add score
    $bonusDiv.on('click', function () {
        $(this).css('visibility', 'hidden');
        document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 10}}));
    });
}