
/***********************/
/* Count down to Oct 1 */
/***********************/

var countDown = new Date('Oct 1, 2017 15:00:00').getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDown - now;
    var day = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var second = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('time-out').innerHTML = (day <= 9 ? '0' + day : day) + 'd ' + (hour <= 9 ? '0' + hour : hour) + ($('.logo img[title="English"]').length >= 1 ? 'g ' : 'h ') + (minute <= 9 ? '0' + minute : minute) + 'm ' + (second <= 9 ? '0' + second : second) + 's ';

    // when the count down is over
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('time-out').innerHTML = ('<span data-lang="OUR APP IS WORKING !">Nasza aplikacja już działa !</span>');
    }

    // update count down every 1 second
}, 1000);