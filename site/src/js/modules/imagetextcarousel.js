var itc,
    ImageTextCarousel = {
        init: function($id) {

            var swiperContainer = $("#"+$id+" > .swiper-container");
            var swiperPagination = $("#"+$id+" .swiper-pagination");
            var swiperNext = $("#"+$id+" .swiper-button-next");
            var swiperPrev = $("#"+$id+" .swiper-button-prev");
            var autoplay = $("#"+$id).data('delayspeed');

            if (swiperContainer.length){
                new Swiper(swiperContainer, {
                    pagination: swiperPagination,
                    paginationClickable: true,
                    nextButton: swiperNext,
                    prevButton: swiperPrev,
                    spaceBetween: 30,
                    effect: 'fade',
                    autoplay: autoplay*1000,
                    autoplayDisableOnInteraction: false
                });
            }
        }
    };
