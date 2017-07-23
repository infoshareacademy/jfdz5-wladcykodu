var timerInterval;

// create an array named bonusItemsClass that contains svg files
var bonusItemsClass = [["parts_game/part1.svg", "bonus-img"],
                      ["parts_game/part2.svg", "bonus-img"],
                      ["parts_game/part3.svg", "bonus-life"],
                      ["parts_game/part4.svg", "bonus-img"],
                      ["parts_game/part5.svg", "bonus-img"],
                      ["parts_game/part6.svg", "bonus-img"],
                      ["parts_game/oil.svg", "bonus-img"],
                      ["parts_game/tank.svg", "bonus-img"],
                      ["parts_game/repair.svg", "bonus-img"]];

var tmpArray = [];

function createBonus(gameclass) {
    if (tmpArray.length === 0) {
        tmpArray = bonusItemsClass.slice();// create copy of an array
    }

    // random bonusDiv from bonusItemsClass with no repeat
    var index = Math.floor(Math.random() * tmpArray.length);
    var bonusItemClass = tmpArray[index];
    tmpArray.splice(index, 1);
    console.log('ala', index, tmpArray, bonusItemClass);

    /*if (tmpBonusItemsClass.length === 0) {
     tmpBonusItemsClass = JSON.parse(JSON.stringify(bonusItemsClass));// create copy of an array
     //JSON.stringify turns a Javascript object into JSON text and stores that JSON text in a string.
     //JSON.parse turns a string of JSON text into a Javascript object.
     shuffleArr(tmpBonusItemsClass); // sort bonusItemsClass in array

     if (lastBonusItem !== null) {
     while (lastBonusItem === tmpBonusItemsClass[tmpBonusItemsClass.length - 1][0]) {
     console.log("ten sam, sortuje dalej");
     shuffleArr(tmpBonusItemsClass);
     }
     }
     }*/

    function buildBonus() {
        if (bonusItemClass.length !== 2) {
            return
        }

        var bonusItem = document.createElement('img');

        bonusItem.src = bonusItemClass[0];
        bonusItem.className = bonusItemClass[1];
        console.log(bonusItem);
        document.getElementById('good-elem').appendChild(bonusItem);
        quizLife();
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


