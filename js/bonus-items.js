var timerInterval;

// create an array named bonusItemsClass that contains svg files
var bonusItemsClass = [["parts_game/part1.svg", "bonus-img"],
                      ["parts_game/part2.svg", "bonus-img"],
                      ["parts_game/addLife.svg", "bonus-life"],
                      ["parts_game/part3.svg", "bonus-img"],
                      ["parts_game/part4.svg", "bonus-img"],
                      ["parts_game/part5.svg", "bonus-img"],
                      ["parts_game/part6.svg", "bonus-img"],
                      ["parts_game/subtractLife.svg", "subtract-life"],
                      ["parts_game/part7.svg", "bonus-img"]];

var tmpArray = [];

function createBonus() {

    if (tmpArray.length === 0) {
        tmpArray = bonusItemsClass.slice();// create copy of an array
    }

    // random bonusDiv from bonusItemsClass with no repeat
    var index = Math.floor(Math.random() * tmpArray.length);
    var bonusItemClass = tmpArray[index];
    tmpArray.splice(index, 1);
    //console.log('current bonus: ', index, tmpArray, bonusItemClass);

    function buildBonus() {
        if (bonusItemClass.length !== 2) {
            return;
        }

        var bonusItem = document.createElement('img');

        bonusItem.src = bonusItemClass[0];
        bonusItem.className = bonusItemClass[1];
        document.getElementById('good-elem').appendChild(bonusItem);
        quizLife();
        subtractLife();
    }

    var boardField = $('.board-field'),
        fieldWidth = boardField.outerWidth(),
        fieldHeight = boardField.outerHeight(),
        // pick random color for div
        //color = '#' + Math.round(0xffffff * Math.random()).toString(16),
        $bonusDiv = $('<div id="good-elem"/>').css({
            'width': fieldWidth * 2,
            'height': fieldHeight * 2
            //'background-color': color
        }),
        // random position of added divs
        posy = Math.floor((Math.random() * 19)) * (fieldHeight),
        posx = Math.floor((Math.random() * 20)) * (fieldWidth);

    $bonusDiv.css({
        'position': 'absolute',
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'none'
    }).appendTo(gameInProgress).fadeIn(100, function () {
        buildBonus();
    }).delay(300).fadeOut(4000, function () {
        $(this).remove(); // removing divs
    });
    // mouseover event for added divs
    $bonusDiv.mouseover(function () {
        $(this).addClass('newBonus-anim bonus-hov');
    });
}
//subtract life when clicked on bonus item with class .subtract-life
function subtractLife() {
    var $subtractLife = $('.subtract-life');
    var $subtractLifeSound = $('<embed src="music/skullSound.ogg" autostart="true" loop="false" width="0" height="0">');
    $subtractLife.on('click', function () {
        gameInProgress.append($subtractLifeSound);
        $(this).css('visibility', 'hidden');
        gameInProgress.append('<div class="subtract-life-box wrong fade-down-subst"><span class="subtract-life-desc"></span><a href="#" class="quiz-button">ok</a></div>');
        var subDesc = $('.subtract-life-desc');
        subDesc.html('<span data-lang="Oops... You lost one life :(">Niestety, straciłeś jedno życie :( </span>');
        clear();
        document.dispatchEvent(new CustomEvent('score', {detail: {action: "subtract", value: 50}}));
        var $lives = $('.result-container-element span');
        if ($lives.length > 0) {
            $lives[0].remove();
            $lives = $('.result-container-element span');
        }
    if ($lives.length === 0) {
        clear();
        endGame();
    }
        quitSubtractInfo();
    });

    grabBonusItem();
}

//exit the window with information about loss of life
function quitSubtractInfo() {
    $('.quiz-button').on('click', function () {
        gameInProgress.append($quizButtonSound);
        $('.subtract-life-box')
            .addClass("fade-out-subst")
            .removeClass('fade-down-subst')
            .delay(2000)
            .queue(function () {
                $(this).remove();
            });
        restartIntervals();
    });
}

function grabBonusItem() {
//music for bonus
    $('.bonus-img').on('click', function () {
        var $collectMusic = $('<embed src="music/collectSound.ogg" autostart="true" loop="false" width="0" height="0">');
        gameInProgress.append($collectMusic);
        $(this).css('visibility', 'hidden');
        document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 20}}));
    });
}