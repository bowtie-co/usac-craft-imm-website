var cmc,
    CourseMapCarousel = {
        settings: {
            swiperContainer: $('.swiper-container.swiper-course-map')
        },
        init: function() {
            cmc = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            if (cmc.swiperContainer.length) {
                new Swiper(cmc.swiperContainer, {
                  slidesPerView: 1,
                  loop: true,
                  autoplay: 1,
                  autoplayDisableOnInteraction: false,
                  speed: 2000,
                  spaceBetween: 30,
                  freeMode: true
                    
                });
            }
        }
    };
