/**
 * Created by rafal on 15.07.17.
 */
function setObstacles() {
    var $boardFileds = $('.board-field');
    var rowSize = 31;
    var rowCount = 23;
    var counter = 0;

    setInterval(function () {
        for (var i = rowCount - 1; i >=0; i -= 1) {
            for (var j = 0; j < rowSize ; j += 1) {
                currentCellIndex = i * rowSize + j;
                nextCellIndex = currentCellIndex + rowSize;
                if ($boardFileds[currentCellIndex].classList.contains('board-field--obstacle')) {
                    if (i !== rowCount - 1) {
                        $boardFileds[nextCellIndex].classList.add('board-field--obstacle');
                    }
                    $boardFileds[currentCellIndex].classList.remove('board-field--obstacle');
                }
            }
        }

        counter = counter < 3 ? counter + 1 : 1;
        if ( counter === 1 ) {
            var randomCellIndex = Math.floor(rowSize * Math.random());
            $boardFileds[randomCellIndex].classList.add('board-field--obstacle');
        }

    }, 1000);
}

