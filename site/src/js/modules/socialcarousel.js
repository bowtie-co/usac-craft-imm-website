var sc,
    SocialCarousel = {
        settings: {
            swiperContainer: $('.swiper-container.swiper-social')
        },
        init: function() {
            sc = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            if (sc.swiperContainer.length) {
                if ($(window).width() < 640) {
                    new Swiper(sc.swiperContainer, {
                        effect: 'coverflow',
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        coverflow: {
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows : true
                        }
                    });
                } else {
                    var desktopSwiper = new Swiper(sc.swiperContainer, {
                        slidesPerView: 4,
                        loop: true,
                        autoplay: 1,
                        autoplayDisableOnInteraction: false,
                        speed: 2000,
                        spaceBetween: 30,
                        freeMode: true
                    });
                    desktopSwiper.stopAutoplay();
                    sc.swiperContainer.hover(
                        function () {
                            desktopSwiper.startAutoplay();
                        }, function () {
                            desktopSwiper.stopAutoplay();
                        });
                }
            }
        }
    };
