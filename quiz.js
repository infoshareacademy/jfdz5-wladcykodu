function quizLife() {
    //add event to selected item from array of bonusItems
    var $quiz = $('.bonus-life');
    $quiz.on('click', function () {

        $('.game-in-progress').append('<div class="quiz-board higher-z-index"><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span> is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer-1">1</div></div><div class="option"><div class="answer-box" id="answer-2">1</div></div><div class="option"><div class="answer-box" id="answer-3">1</div></div></div></div><div class="result-field hidden" id="result-field"><span class="result-desc" id="result-desc"></span><a href="#" class="quiz-button">ok</a></div></div></div>');

        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        clearInterval(timerInterval);
        quizForBonusLife();
    });
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var wrongResult2;
function quizForBonusLife() {
    var multiplicand = randomNum(1, 15);
    var multiplier = randomNum(1, 15);
    var correctResult = multiplicand * multiplier;
    var wrongResult1 = correctResult + randomNum(1, 12);

    function wrongRes2() {
        if (correctResult > 30) {
            wrongResult2 = correctResult - randomNum(1, 12);
        }
        else {
            wrongResult2 = correctResult + randomNum(12, 20);
        }
    }

    wrongRes2();
    var answersArr = [wrongResult1, wrongResult2, correctResult];

    answersArr.sort(function () {
        return .5 - Math.random();
    }); //or shuffleArr??

    var guessObj = {
        multiplicand: multiplicand,
        multiplier: multiplier,
        answersArr: answersArr,
        goodAnswer: correctResult
    };

    $('#multiplicand').html(guessObj.multiplicand);
    $('#multiplier').html(guessObj.multiplier);
    $('#answer-3').html(guessObj.answersArr[2]);
    $('#answer-2').html(guessObj.answersArr[1]);
    $('#answer-1').html(guessObj.answersArr[0]);

    $('.answer-box').on('click', function (e) {
        console.log(guessObj.goodAnswer);
        console.log(e.target.innerHTML);

        var resultField = $('.result-field');
        var resultDesc = $('.result-desc');

        if (e.target.innerHTML == guessObj.goodAnswer) {
            console.log('correct!');
            resultField.removeClass('hidden').addClass("correct fade-down-quiz");
            resultDesc.html("Good Job! You win a bonus life!");
            document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 100}}));
            $($('.result-container-element')[2]).append('<span class="glyphicon glyphicon-heart"></span>');
        }
        else {
            console.log('wrong!');
            resultField.removeClass('hidden').addClass("wrong fade-down-quiz");
            resultDesc.html("You lose :( Try next time...");
        }

        $('.quiz-button').on('click', function () {
            console.log('clicked button');
            $('.quiz-board').addClass("fade-out-quiz");
            //restart intervals
        });
    });
}