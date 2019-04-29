var cgc,
    CardGridCarousel = {
        settings: {
            swiperContainer: $('.swiper-container.swiper-card-grid')
        },
        init: function() {
            cgc = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            if (cgc.swiperContainer.length) {
                new Swiper(cgc.swiperContainer, {
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
            }
        }
    };