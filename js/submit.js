/**********************************************************************
 * Show message on form submit. One can run the game from that place  *
 **********************************************************************/

document.getElementById('enrollmentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.reset();
    document.getElementById('submit-message').style.display = 'block';
    $('#enrollmentForm input').attr('disabled','disabled');
});

document.getElementById('gameStartBtn').addEventListener('click', function (event) {
    document.getElementById('submit-message').style.display = 'none';
    $('#enrollmentForm input').removeAttr('disabled');
    //Here add the code to run the game
    document.getElementById('game-frame').style.display = "flex";
});

document.getElementById('submitMessageCloseBtn').addEventListener('click', function (event) {
    document.getElementById('submit-message').style.display = 'none';
    $('#enrollmentForm input').removeAttr('disabled');
});
