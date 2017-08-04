function endGame() {
    $(".result-container").remove();
    console.log("remove");
    $(".game-in-progress").remove();
    $('.game-board').append('<div class="game-end-board"></div>');
}