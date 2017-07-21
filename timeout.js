$('.start-game-button').on('click', function () {
    setTimeout(function () {
        clearInterval(bonus);
        clearInterval(obstaclesInterval);
        console.log('clear interval bonus and obstaclesInterval');
    }, 600000); // 10 minutes
});