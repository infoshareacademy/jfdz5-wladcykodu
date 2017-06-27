/*****************************************************************************
 * Hiding and showing "go back to top" button when scrolling.                *
 * Smooth scrolling to top of document when "go back to top" button clicked. *
 *****************************************************************************/

$(document).ready(function(){

    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('#go-back-to-top').fadeIn();
        } else {
            $('#go-back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#go-back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});
