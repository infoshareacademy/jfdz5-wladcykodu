/**
 * Created by rafal on 15.07.17.
 */
function setObstacles(release, restart) {
    var $boardFileds = $('.board-field');
    var rowSize = 31;
    var rowCount = 23;

    if ( restart ) {
        sleep(1000);
        $('.board-field--obstacle').each(function () {
            this.classList.remove('board-field--obstacle', 'board-field--collision')
        });

        var $lives = $('.result-container-element span');
        if ($lives.length > 0) {
            $lives[0].remove();
            var $lives = $('.result-container-element span');
        }

        if ($lives.length === 0) {
            console.log('GAME OVER');
        }

        restart = false;
    }

    for ( var i = rowCount - 1; i >= 0; i -= 1 ) {
        for ( var j = 0; j < rowSize; j += 1 ) {
            currentCellIndex = i * rowSize + j;
            nextCellIndex = currentCellIndex + rowSize;
            if ( $boardFileds[currentCellIndex].classList.contains('board-field--obstacle') ) {
                if ( i !== rowCount - 1 ) {
                    $boardFileds[nextCellIndex].classList.add('board-field--obstacle');
                    var obstaclePosition = new elementPosition($boardFileds[nextCellIndex]);
                    var carPosition = new elementPosition($('.games-auto')[0]);
                    // $boardFileds[nextCellIndex].setAttribute('title',obstaclePosition.serializePosition());
                    // $('.games-auto')[0].setAttribute('title',carPosition.serializePosition());
                    var consoleMessage = '';
                    if (obstaclePosition.isTopContactTo(carPosition)) {
                        consoleMessage += 'Top ';
                    }

                    if ( obstaclePosition.isRightContactTo(carPosition) ) {
                        consoleMessage += 'Right ';
                    }

                    if ( obstaclePosition.isBottomContactTo(carPosition) ) {
                        consoleMessage += 'Bottom ';
                        $boardFileds[nextCellIndex].classList.add('board-field--collision');
                        restart = true;
                    }

                    if ( obstaclePosition.isLeftContactTo(carPosition) ) {
                        consoleMessage += 'Left ';
                    }
                    if ( consoleMessage.length > 0 ) {
                        console.log(consoleMessage);
                    }
                }

                $boardFileds[currentCellIndex].classList.remove('board-field--obstacle');

            }
        }
    }

    if ( release ) {
        var randomCellIndex = Math.floor(rowSize * Math.random());
        $boardFileds[randomCellIndex].classList.add('board-field--obstacle');
    }

    return restart;
}
