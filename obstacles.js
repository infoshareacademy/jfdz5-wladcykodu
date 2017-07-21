/**
 * Created by rafal on 15.07.17.
 */
function setObstacles() {
    var $boardFileds = $('.board-field');
    var rowSize = 31;
    var rowCount = 23;
    var counter = 0;
    var freeze = false;
    setInterval(function () {
        if (freeze) {
            sleep(1000)
            $('.board-field--obstacle').each(function() {
                this.classList.remove('board-field--obstacle', 'board-field--collision')
            });
            var $lives = $('.result-container-element span');
            if ($lives.length > 0 ) {
                $lives[0].remove();
                var $lives = $('.result-container-element span');
            };
            if ( $lives.length === 0 ) {
                console.log('GAME OVER');
            };
            freeze = false;
        }
        for (var i = rowCount - 1; i >=0; i -= 1) {
            for (var j = 0; j < rowSize ; j += 1) {
                currentCellIndex = i * rowSize + j;
                nextCellIndex = currentCellIndex + rowSize;
                if ($boardFileds[currentCellIndex].classList.contains('board-field--obstacle')) {
                    if (i !== rowCount - 1) {
                        $boardFileds[nextCellIndex].classList.add('board-field--obstacle');
                        var obstaclePosition = new elementPosition($boardFileds[nextCellIndex]);
                        var carPosition = new elementPosition($('.games-auto')[0]);
                        var consoleMessage = '';
                        if ( obstaclePosition.isTopContactTo(carPosition) ) {
                            consoleMessage += 'Top ';
                        }
                        if ( obstaclePosition.isRightContactTo(carPosition) ) {
                            consoleMessage += 'Right ';
                        }
                        if ( obstaclePosition.isBottomContactTo(carPosition) ) {
                            consoleMessage += 'Bottom ';
                            $boardFileds[nextCellIndex].classList.add('board-field--collision');
                            freeze = true;
                        }
                        if ( obstaclePosition.isLeftContactTo(carPosition) ) {
                            consoleMessage += 'Left ';
                        }
                        if (consoleMessage.length > 0) {
                            console.log(consoleMessage);
                        }
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

    }, 300);
};

function elementPosition(element) {
    this.x1 = $(element).offset().left;
    this.y1 = $(element).offset().top;
    this.x2 = $(element).offset().left + element.offsetWidth;
    this.y2 = $(element).offset().top + element.offsetHeight;
    this.serializePosition = serializePosition;
    this.isContactTo = isContactTo;
    this.isTopContactTo = isTopContactTo;
    this.isBottomContactTo = isBottomContactTo;
    this.isLeftContactTo = isLeftContactTo;
    this.isRightContactTo = isRightContactTo;
    function serializePosition() {
        return JSON.stringify(this);
    };
    function isContactTo(anotherElement) {
        if (anotherElement instanceof elementPosition) {
            if ((( this.x1 <= anotherElement.x1 && this.x2 >= anotherElement.x1 )  ||
                 ( this.x1 <= anotherElement.x2 && this.x2 >= anotherElement.x2 )) &&
                (( this.y1 <= anotherElement.y1 && this.y2 >= anotherElement.y1 )  ||
                 ( this.y1 <= anotherElement.y2 && this.y2 >= anotherElement.y2 ))) {
                return true;
            } else {
                return false;
            }
        } else {
            return 'undefined';
        };
    };
    function isTopContactTo(anotherElement) {
        if (anotherElement instanceof elementPosition) {
            if (( this.x1 === anotherElement.x1   || 
                  this.x2 === anotherElement.x2 ) &&
                  this.y1 === anotherElement.y2 ) {
                return true;
            } else {
                return false;
            }
        } else {
            return 'undefined';
        };
    };
    function isRightContactTo(anotherElement) {
         if (anotherElement instanceof elementPosition) {
            if (  this.x2 === anotherElement.x1 &&
                ( this.y1 === anotherElement.y1 || 
                  this.y2 === anotherElement.y2 )) {
                return true;
            } else {
                return false;
            }
        } else {
            return 'undefined';
        };
    };
    function isBottomContactTo(anotherElement) {
        if (anotherElement instanceof elementPosition) {
            if ( ( this.x1 === anotherElement.x1   || 
                   this.x2 === anotherElement.x2 ) && 
                   this.y2 === anotherElement.y1 ) {
                return true;
            } else {
                return false;
            }
        } else {
            return 'undefined';
        };
    };
    function isLeftContactTo(anotherElement) {
        if (anotherElement instanceof elementPosition) {
            if (  this.x1 === anotherElement.x2 &&
                ( this.y1 === anotherElement.y1 || 
                  this.y2 === anotherElement.y2 )) {
                return true;
            } else {
                return false;
            }
        } else {
            return 'undefined';
        };
    };
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) < milliseconds) {
        ;
    }
}