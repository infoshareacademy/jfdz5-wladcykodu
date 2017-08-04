
/*show game-end-board*/
function endGame() {
    setTimeout();
    $(".result-container").remove();
    console.log("remove");
    $(".game-in-progress").remove();
    $('.game-board').append('<div class="game-end-board"></div>');
    $('.game-end-board')
        .append('<div class="thanks-for-games">Koniec gry! Dziękujemy!</div>')
        .append('<div class="score-count">Twój wynik to <span><script>score</script></span></div>')
        .append('<div class="ranking">Ranking</div>');

    var readedValue = localStorage.getItem('gameResult');
    var readedObject = JSON.parse(readedValue);
    var date = new Date;
    readedObject.name = readedObject.name + "   " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    readedObject.score = score;
}
