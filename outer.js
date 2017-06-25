
/*Shrinked navbar*/

$(window).scroll(function() {
    if ($(".navbar").offset().top > 70) {
        $(".navbar--height").addClass("navbar--height--shrink");
    } else {
        $(".navbar--height").removeClass("navbar--height--shrink");
    }
});



/*Smooth scrolling*/

$('.nav a').click(function(){
 /*   event.preventDefault();
    event.stopPropagation();*//*false is doing the same as this two lines and when used we must add in function() event word */
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    $('.navbar-collapse.in').collapse('hide'); /*hide clicked menu item*/
    return false;
});


