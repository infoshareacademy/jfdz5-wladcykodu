/******************************/
/* Shrinked navbar (FZ5WK-26) */
/******************************/

$(window).on("scroll", function() {

    if($(window).scrollTop() > 100) {
        $(".navbar--height").addClass("navbar--height--shrink");
    } else {
        $(".navbar--height").removeClass("navbar--height--shrink");
    }
});

/******************************/
/*Smooth scrolling (FZ5WK-29) */
/******************************/

$('.nav a').click(function () {
    /*   event.preventDefault();
     event.stopPropagation();*/
    //false is doing the same as this two lines above and when used we must add in function() event word

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 500);
    $('.navbar-collapse.in').collapse('hide');
    /*hide clicked menu item*/
    return false;
});

/**************************************************************/
/* Highlight the current section in the navigation (FZ5WK-19) */
/**************************************************************/

$(window).scroll(function () {
    // distance to which user scroll down the page / number of pixels the window has been scrolled
    var scrollPosition = $(window).scrollTop();
    var menuHeight = 110;
    // check the position of each of the sections compared to the windows scroll position
    if (scrollPosition) {
        // .each() iterates over the DOM elements
        $('.nav a').each(function (i) {
            var refLink = $(this);
            // refLink as its source of ID
            var refSection = $(refLink.attr('href'));
            //.position().top - position from the top; compare current position and every section position in each scroll
            if (refSection.position().top - menuHeight <= scrollPosition && refSection.position().top +
                refSection.height() > scrollPosition) {
                $('.nav a.active').removeClass('active');
                $('.nav a').eq(i).addClass('active');
            }
        });

    } else {
        $('.nav a.active').removeClass('active');
    }

    // add active class to contact in normal size window
    if ( $(window).scrollTop() + $(window).height() === $(document).height()) {
        $('.nav a.active').removeClass('active');
        $('.nav li:last-child a').addClass('active');
    } else {
        $('.nav li:last-child a').removeClass('active');
    }

}).scroll();


/**************************************************/
/* Animated photos of the team members (FZ5WK-20) */
/**************************************************/


/*...*/
