function showBoom (gameBoard) {
    var boom = $('<div id="boom" class="boom"></div>');
    console.log (boom);
    console.log (gameInProgress);
    $('body').append(boom);
    $('#boom')
        .css({
            top: $('.games-auto').offset().top  - 175,
            left:  $('.games-auto').offset().left + 12.5
        })
        .animate({
            width: 200,
            height: 300
        }, 1000)
}

function removeBoom () {
    $('#boom').each(function () {
        this.remove()
    });
}



