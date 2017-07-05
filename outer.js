$(document).on('scroll', runOnEvent([shrinkNavbar, highlightSection], 0));
//function is called when resize or scroll
$(document).on('scroll resize', runIfEventStopped(slideInView, [], 66));

$(document).trigger('scroll'); //fake trigger of the scrolling event - at the moment of loading the page (in my case trigger is already once called, and this result in 2 events on loading)

/***********************************************/
/* Run group of functions on event with timeout*/
/***********************************************/

function runOnEvent(functions, timeout) {
    return function () {
        for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            func.apply(this, []);
            setTimeout(func, timeout);
            //func();
        }
    }
}

/************************************/
/* Call functions if scroll stopped */
/************************************/

function runIfEventStopped(func, args, timeout) {
    var isRunning;
    return function () {
        // clear last timeout of func - this aborts last execution if possible
        clearTimeout(isRunning);

        // bind context and args to func
        var context = this;

        var later = function () {
            func.apply(context, args);//assign a function (e.g slideInView) to a variable
        };

        // run new func at end of timeout (if timeout will not be cleared by next scroll event)
        isRunning = setTimeout(later, timeout); //timeout - after the scroll event is completed, the function (e.g slideInView) executes after 66 milliseconds
    };
}

/******************************/
/* Shrinked navbar (FZ5WK-26) */
/******************************/

function shrinkNavbar() {
    if ($(window).scrollTop() > 100) {
        $(".navbar--height").addClass("navbar--height--shrink");
    } else {
        $(".navbar--height").removeClass("navbar--height--shrink");
    }
}

/******************************/
/*Smooth scrolling (FZ5WK-29) */
/******************************/

$('.nav a').click(function () {
    /*   event.preventDefault();
     event.stopPropagation();*/
    //false is doing the same as this two lines above and when used we must add in function() event word
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 1000);
    $('.navbar-collapse.in').collapse('hide');

    //hide clicked menu item
    return false;
});

/**************************************************************/
/* Highlight the current section in the navigation (FZ5WK-19) */
/**************************************************************/

function highlightSection() {

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

}

/**************************************************/
/* Animated photos of the team members (FZ5WK-20) */
/**************************************************/

function slideInView() {
    var $members = $('.members');
    //console.log("slides");
    var topPosition = $(window).scrollTop();

    var windowHeight = $(window).height();
    //vertical position of the scroll bar
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
