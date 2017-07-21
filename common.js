function sleep(milliseconds) {
    var start = new Date().getTime();
    while ((new Date().getTime() - start) < milliseconds) {
        ;
    }
}

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
    }

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
        }
    }

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
        }
    }

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
        }
    }

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
        }
    }

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
        }
    }
}
