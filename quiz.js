function quizLife() {
    //add event to selected item from array of bonusItems
    var $quiz = $('.bonus-life');
    $quiz.on('click', function () {
        console.log('clicked');
        $('.game-in-progress').append('<div class="quiz-board higher-z-index"><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span>  is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer1">1</div></div><div class="option"><div class="answer-box" id="answer2">1</div></div><div class="option"><div class="answer-box" id="answer3">1</div></div></div></div>');
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        clearInterval(timerInterval);
        $('.quiz-board').on('click', function () {
            console.log('clicked quiz board');
            //start intervals...on the end of quiz, this is just test
        });
        quizForMoreLives()
    });
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var wrongResult2;
function quizForMoreLives() {
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

    document.getElementById('multiplicand').innerHTML = guessObj.multiplicand;
    document.getElementById('multiplier').innerHTML = guessObj.multiplier;
    document.getElementById('answer1').innerHTML = guessObj.answersArr[0];
    document.getElementById('answer2').innerHTML = guessObj.answersArr[1];
    document.getElementById('answer3').innerHTML = guessObj.answersArr[2];
}