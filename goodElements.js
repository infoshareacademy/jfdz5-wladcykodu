var tmpBonusItemsClass = [];
var lastBonusItem = 0;

//sorting items in array, shuffle an array a of n elements --> swapping the picked element with the current element, and then picking the next random element from the remainder
function shuffleArr(a) {
    var j, x, i;
    // loop runs backwards
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j]; //exchange places
        a[j] = x;
    }
}

function createBonus(gameclass) {

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

    // random bonusDiv from bonusItemsClass with no repeat

    if (tmpBonusItemsClass.length === 0) {
        tmpBonusItemsClass = JSON.parse(JSON.stringify(bonusItemsClass));// create copy of an array
        shuffleArr(tmpBonusItemsClass); // sort bonusItemsClass in array

        if (lastBonusItem !== null) {
            while (lastBonusItem === tmpBonusItemsClass[tmpBonusItemsClass.length - 1][0]) {
                console.log("ten sam sortuje dalej");
                shuffleArr(tmpBonusItemsClass);
            }
        }
    }
    //remove  last element of an array and set it to index
    var bonusItemClass;
    bonusItemClass = tmpBonusItemsClass.pop();
    lastBonusItem = bonusItemClass[0];
    console.log(tmpBonusItemsClass);

    // add bonusItem to div ('good-elem')
    function buildBonus() {
        if (bonusItemClass.length !== 2) {
            return
        }

        var bonusItem = document.createElement('img');

        bonusItem.src = bonusItemClass[0];
        bonusItem.className = bonusItemClass[1];
        console.log(bonusItem);
        document.getElementById('good-elem').appendChild(bonusItem);
        //add event to selected item from array
        var $quiz = $('.bonus-life');
        $quiz.on('click', function () {
            console.log('clicked');
            $('.game-in-progress').append('<div class="quiz-board higher-z-index"><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span>  is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer1">1</div></div><div class="option"><div class="answer-box" id="answer2">1</div></div><div class="option"><div class="answer-box" id="answer3">1</div></div></div></div>');
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

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function quizForMoreLifes() {
    var multiplicand = randomNum(1, 10);
    var multiplier = randomNum(1, 10);
    var correctResult = multiplicand * multiplier;

}