var countDownInterval,
    countDownQuiz,
    timeExpired,
    resultField,
    resultDesc;

function quizLife() {
    //add event to selected item from array of bonusItems
    var $quiz = $('.bonus-life');
    $quiz.on('click', function () {

        gameInProgress.append('<div class="quiz-board higher-z-index fade-in-quiz"><div class="count-down" id="count-down"></div><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span> is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer-1">1</div></div><div class="option"><div class="answer-box" id="answer-2">1</div></div><div class="option"><div class="answer-box" id="answer-3">1</div></div></div></div><div class="result-field hidden" id="result-field"><span class="result-desc" id="result-desc"></span><a href="#" class="quiz-button">ok</a></div></div></div>');
        countDownTime();
        clear();
        quizForBonusLife();
        timeExpired = setTimeout(timeOutForQuiz, 10000);
    });
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var wrongResult2;
//create quiz to win bonus life
function quizForBonusLife() {
    var multiplicand = randomNum(5, 15);
    var multiplier = randomNum(5, 15);
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
        return 0.5 - Math.random();
    });

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

    resultField = $('.result-field');
    resultDesc = $('.result-desc');

    $('.answer-box').on('click', function (e) {
        //if selected element is a good answer add bonus and points to score
        if (parseInt(e.target.innerHTML) === guessObj.goodAnswer) {
            resultField.removeClass('hidden').addClass("correct fade-down-quiz");
            resultDesc.html("Good Job! You win a bonus life!");
            document.dispatchEvent(new CustomEvent('score', {detail: {action: "add", value: 100}}));
            $($('.result-container-element')[2]).append('<span class="glyphicon glyphicon-heart"></span>');
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = '';
            clearTimeout(timeExpired);
        }
        else {
            resultField.removeClass('hidden').addClass("wrong fade-down-quiz");
            resultDesc.html("You lost :( Try next time...");
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = '';
            clearTimeout(timeExpired);
        }
        quitQuiz();
    });
}
//quit from quiz (restart all intervals)
function quitQuiz() {
    $('.quiz-button').on('click', function () {
        $('.quiz-board')
            .addClass("fade-out-quiz")
            .removeClass('fade-in-quiz')
            .delay(2000)
            .queue(function () {
                $(this).remove();
            });
        //restart intervals
        restartIntervals();
    });
}
//display timeout info
function timeOutForQuiz() {
    resultField.removeClass('hidden').addClass("wrong fade-down-quiz");
    resultDesc.html("Too long... You lost :( Try next time...");
    quitQuiz();
}
//count down time to answer
function countDownTime() {
    var seconds = 9,
        second = 0;
    countDownQuiz = document.getElementById('count-down');

    countDownInterval = setInterval(function () {
        countDownQuiz.innerHTML = 'You have ' + (seconds - second) + ' seconds left';
        if (second >= seconds) {
            clearInterval(countDownInterval);
            countDownQuiz.innerHTML = "Time's up";
        }
        second++;
    }, 1000);
}