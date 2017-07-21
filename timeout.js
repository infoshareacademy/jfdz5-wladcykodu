$('.start-game-button').on('click', function () {
    setTimeout(function () {
        clearInterval(bonus); // add other intervals to clear...
        console.log('clear interval bonus');
    }, 600000); // 10 minutes
});
