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
    var rowSize = 15;
    var rowCount = 15;
    var counter = 0;

    setInterval(function () {
        for (var i = rowCount - 2; i >=0; i -= 1) {
            // console.log('to jest i: ', i)
            for (var j = 0; j < rowSize ; j += 1) {
                // console.log('to jest j: ', j)
                oldCellIndex = i * rowSize + j;
                // console.log('to jest o: ', oldCellIndex)
                newCellIndex = oldCellIndex + rowSize;
                // console.log('to jest n: ', newCellIndex)

                    $boardFileds[newCellIndex].classList = $boardFileds[oldCellIndex].classList;
                    $boardFileds[oldCellIndex].classList.remove('board-field--obstacle');
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

