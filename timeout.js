
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
            endGame();
        }
        currentTimer = timer;
        //set information for user that game is speeding up
        function speedInfo() {
            if (currentTimer === 244 || currentTimer === 154 || currentTimer === 64) {
                gameInProgress.append('<div class="speed-up"></div>');
                $('.speed-up')
                    .delay(10000)
                    .queue(function () {
                        $(this).remove();
                    });
            }
        }
        speedInfo();

        function speedObstacles() {
            var timeFactor  = [240, 150, 60];
            var speedFactor = [200, 100, 70];
            if (currentTimer === timeFactor[0] || currentTimer === timeFactor[1] || currentTimer === timeFactor[2]) {
                switch (currentTimer) {
                    case timeFactor[0]:
                        obstaclesFrequency = speedFactor[0];
                        break;
                    case timeFactor[1]:
                        obstaclesFrequency = speedFactor[1];
                        break;
                    case timeFactor[2]:
                        obstaclesFrequency = speedFactor[2];
                        break;
                }
                clearInterval(obstaclesInterval);
                startObstacles();
            }
        }
        speedObstacles();

    }, 1000);
}