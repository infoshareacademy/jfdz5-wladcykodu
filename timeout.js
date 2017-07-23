// stop game when time is over
function stopGameAfterTime() {
    setTimeout(function () {
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        clearInterval(timerInterval);
        console.log('clear interval bonus and obstaclesInterval');
    }, 600000); // 10 minutes
}

var display = $('#timer');
//game timer for game
function gameTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
        if (minutes == 0 && seconds == 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
