/**
 * Created by rafal on 15.07.17.
 */
function times(n, callback) {
    for (var i = 0; i < n; i += 1) {
        callback(i);
    }
}

function setObstacles() {
    var $boardFileds = $('.board-field');
    var rowSize = 31;
    var rowCount = 23;
    var counter = 0;

    setInterval(function () {
        for (var i = rowCount - 2; i >=0; i -= 1) {
            for (var j = 0; j < rowSize ; j += 1) {
                oldCellIndex = i * rowSize + j;
                newCellIndex = oldCellIndex + rowSize;
                if ($boardFileds[oldCellIndex].classList.contains('board-field--obstacle')) {
                    $boardFileds[newCellIndex].classList.add('board-field--obstacle');
                    $boardFileds[oldCellIndex].classList.remove('board-field--obstacle');
                }
            }
        }

        counter = counter < 3 ? counter + 1 : 1;
        console.log(counter);
        if ( counter === 1 ) {
            var randomCellIndex = Math.floor(rowSize * Math.random());
            $boardFileds[randomCellIndex].classList.add('board-field--obstacle');
        }

    }, 1000);
}

