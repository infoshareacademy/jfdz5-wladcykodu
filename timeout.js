
// stop game when time is over
function stopGameAfterTime() {
    setTimeout(function () {
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        clearInterval(timerInterval);
        console.log('clear interval bonus and obstaclesInterval');
    }, 600000); // 10 minutes
}


//game timer for game
function gameTimer(duration) {
    if (currentTimer !== undefined) {
        duration = currentTimer;
    }
    var timer = duration,
        minutes,
        seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.text(minutes + ":" + seconds);
        console.log(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
        if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
            clearInterval(timerInterval);
        }
        currentTimer = timer;
        //set information for user that game is speeding up
        function speedInfo() {
            if (currentTimer === 477 || currentTimer === 297 || currentTimer === 117 || currentTimer === 580) { //580 is for test only
                gameInProgress.append('<div class="speed-up"></div>');
                $('.speed-up')
                    .delay(10000)
                    .queue(function () {
                        $(this).remove();
                    });
            }
        }
        speedInfo();

    }, 1000);
}