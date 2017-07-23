$('.start-game-button').on('click', function () {
    setTimeout(function () {
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        console.log('clear interval bonus and obstaclesInterval');
    }, 600000); // 10 minutes
});


var display = $('#timer');
function gameTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
        if (minutes == 0 && seconds == 0) {
            clearInterval(interval);
        }
    }, 1000);
}
