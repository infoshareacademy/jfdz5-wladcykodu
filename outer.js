/******************************/
/* Shrinked navbar (FZ5WK-26) */
/******************************/

$(document).on("scroll", function () {

    if ($(window).scrollTop() > 100) {
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
    }, 2000);
    $('.navbar-collapse.in').collapse('hide');
    /*hide clicked menu item*/
    return false;
});

/**************************************************************/
/* Highlight the current section in the navigation (FZ5WK-19) */
/**************************************************************/

$(document).scroll(function () {
    // distance to which user scroll down the page / number of pixels the window has been scrolled
    var scrollPosition = $(window).scrollTop();
    var menuHeight = 100;
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
    var footerHeight = 150;
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - footerHeight) {
        $('.nav a.active').removeClass('active');
        $('.nav li:last-child a').addClass('active');
    } else {
        $('.nav li:last-child a').removeClass('active');
    }

}).scroll();


/**************************************************/
/* Animated photos of the team members (FZ5WK-20) */
/**************************************************/

var $window = $(window);
var $members = $('.members');

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var counter = 0;

function slideInView() {
    counter += 1;
    console.log(counter);
    var windowHeight = $window.height();
    //vertical position of the scroll bar
    var topPosition = $window.scrollTop();
    var bottomPosition = (topPosition + windowHeight);

    $.each($members, function () {
        //height of the members with padding and border
        var membersHeight = $(this).outerHeight();
        //distance of members relative to the top
        var memberTopPosition = $(this).offset().top;
        var memberBottomPosition = (topPosition + membersHeight);

        //checking is team info (members) in view --> is members bottom position greater than top position of window AND is members top top position less than bottom position of window
        // if yes add class slide-active, if not remove it
        if ((memberBottomPosition >= topPosition) &&
            (memberTopPosition <= bottomPosition)) {
            $(this).addClass('slide-active');
        } else {
            $(this).removeClass('slide-active');
        }
    });
}
//function is called when resize or scroll
$window.on('scroll resize', debounce(slideInView, 50));
$window.trigger('scroll');






