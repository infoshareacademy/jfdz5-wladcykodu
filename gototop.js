/************************************************************************
 * Hiding and showing "go to top" button when scrolling.                *
 * Smooth scrolling to top of document when "go to top" button clicked. *
 ************************************************************************/

$(document).ready(function(){

    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('#go-to-top').fadeIn();
        } else {
            $('#go-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#go-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

});
