
/*Shrinked navbar*/

$(window).scroll(function() {
    if ($(".navbar").offset().top > 70) {
        $(".navbar--height").addClass("navbar--height--shrink");
    } else {
        $(".navbar--height").removeClass("navbar--height--shrink");
    }
});


/*document.getElementById('.navbar')*/


/*Smooth scrolling:*/

$('.nav a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});


