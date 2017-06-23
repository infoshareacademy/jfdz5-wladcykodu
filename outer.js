$(window).scroll(function() {
    if ($(".navbar").offset().top > 70) {
        $(".navbar--height").addClass("navbar--height--shrink");
    } else {
        $(".navbar--height").removeClass("navbar--height--shrink");
    }
});


