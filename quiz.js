function quizLife() {
    //add event to selected item from array of bonusItems
    var $quiz = $('.bonus-life');
    $quiz.on('click', function () {
        console.log('clicked');
        $('.game-in-progress').append('<div class="quiz-board higher-z-index"><div class="quiz"><div><div class="question">Result of <span class="quiz-text" id="multiplicand">1</span> * <span class="quiz-text" id="multiplier">1</span>  is: </div><div class="answers"><div class="option"><div class="answer-box" id="answer1">1</div></div><div class="option"><div class="answer-box" id="answer2">1</div></div><div class="option"><div class="answer-box" id="answer3">1</div></div></div></div>');
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        clearInterval(timerInterval);
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