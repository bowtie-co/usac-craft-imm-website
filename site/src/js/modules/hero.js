var hc,
    HeroCarousel = {
        settings: {
            swiperContainer: $('.swiper-container.swiper-hero-carousel'),
            swiperPagination: $('.swiper-hero-carousel .swiper-pagination'),
            //swiperNext: $('.swiper-hero-carousel .swiper-button-next'),
            //swiperPrev: $('.swiper-hero-carousel .swiper-button-prev')
        },
        init: function() {
            hc = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            if (hc.swiperContainer.length){
                new Swiper(hc.swiperContainer, {
                    pagination: hc.swiperPagination,
                    paginationClickable: true,
                    //nextButton: hc.swiperNext,
                    //prevButton: hc.swiperPrev,
                    spaceBetween: 30,
                    //effect: 'fade',
                    loop: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false

                });
            }
        }
    };
