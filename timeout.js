$('.start-game-button').on('click', function () {
    setTimeout(function () {
        clearInterval(bonus); // add other intervals to clear...
        console.log('clear interval bonus');
    }, 60000); // it will be e.g 600000 = 10 min, now it is 1 minute
});