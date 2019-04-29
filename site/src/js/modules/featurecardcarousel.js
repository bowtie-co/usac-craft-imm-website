var fcc,
    FeatureCardCarousel = {
      init: function() {
          var featureCardContainer = $('.swiper-container.swiper-feature-card');
          var featureCardPagination = $(".swiper-pagination.fcc-swiper-pagination");
          var featureCardNext = $(".swiper-button-next.fcc-swiper-button-next");
          var featureCardPrev = $(".swiper-button-prev.fcc-swiper-button-prev");

          if (featureCardContainer.length) {
                  var fccSwiper = new Swiper(featureCardContainer, {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  loop: true,
                  pagination: featureCardPagination,
                  paginationClickable: true,
                  nextButton: featureCardNext,
                  prevButton: featureCardPrev,
                  breakpoints: {
                    1240: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    980: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    // 640: {
                    //   slidesPerView: 2,
                    //   spaceBetween: 20,
                    // },
                    640: {
                      slidesPerView: 1,
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
                    }
                  }
                });
                // fccSwiper.stopAutoplay();
                // featureCardContainer.hover(
                //     function () {
                //         fccSwiper.startAutoplay();
                //     }, function () {
                //         fccSwiper.stopAutoplay();
                //     });
            }
        }
    };
