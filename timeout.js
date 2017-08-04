
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
        //console.log(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
        // stop game when time is over
        if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
            clear();
            endGame();
        }
        currentTimer = timer;
        //set information for user that game is speeding up
        function speedInfo() {
            if (currentTimer === 485 || currentTimer === 305 || currentTimer === 125) {
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