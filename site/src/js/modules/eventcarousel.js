var ecc,
    EventCardCarousel = {
      init: function() {
          var eventCardContainer = $('.swiper-container.swiper-event-card');
          var eventCardPagination = $(".swiper-pagination.ecc-swiper-pagination");
          var eventCardNext = $(".swiper-button-next.ecc-swiper-button-next");
          var eventCardPrev = $(".swiper-button-prev.ecc-swiper-button-prev");
          //var eventMatrixLength = $("#eventCount").val();

          // if(eventMatrixLength > 4) {
          //   eventMatrixLength = 4;
          // }
          if (eventCardContainer.length) {
                  var eccSwiper = new Swiper(eventCardContainer, {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  loop: false,
                  pagination: eventCardPagination,
                  paginationClickable: true,
                  nextButton: eventCardNext,
                  prevButton: eventCardPrev,
                  breakpoints: {
                    1240: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    980: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
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
            }
        }
    };

    $(function(){
      $(".event-info").each(function(index,element){
        var eventID = $(element).data("eid");
        $.get( "/API/events/index.php?eid=" + eventID, function( data ) {

          $(element).find(".event-category").html(data[0].org);
          $(element).find(".event-title").html(data[0].title);
          $(element).find(".event-date").html(data[0].date_start);
          $(element).find(".event-location").html(data[0].address.city + ', ' + data[0].address.state + ' ' + data[0].address.zip);

          $( ".result" ).html( data );
          //alert( "Load was performed." );
        });
      });
    });
