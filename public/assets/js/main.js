!(function ($) {
      // menu scrolling effect to solid color
    $(window).on("scroll", function () {
        if ($(window).scrollTop()) {
            $('nav-menu-container').addClass('text-secondary-color');
            $('#header').addClass('.header-scrolled');
        } else {
            $('nav-menu-container').removeClass('text-secondary-color');
            $('#header').removeClass('.header-scrolled');
        }
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

})(jQuery);