jQuery(function ($) {
    $('#carouselArea').carousel({
        interval: 5000
    });
    
    $('.active-image-carousel').owlCarousel({
        loop: true,
        nav:true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            },
            900: {
                items: 4,
            }

        }
    });

});