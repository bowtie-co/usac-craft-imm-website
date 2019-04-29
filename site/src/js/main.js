$(document).ready(function() {

    $(document).foundation();
    $(".nav-loader").css({"display":"inline-block"});
    $(".nav-loader-mobile").css({"display":"block"});

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    // ga data push
    DataPushGa.init();
    MailChimpSubscribe.init();

    // carousels use http://idangero.us/swiper
    count = $('.image-text-carousel-widget').length;
    for (var i = 0; i < count; i++) {
        ImageTextCarousel.init($($('.image-text-carousel-widget')[i]).attr("id"))
    }

    EventCardCarousel.init();
    FeatureCardCarousel.init();
    CardGridCarousel.init();
    SocialCarousel.init();
    HeroCarousel.init();

    // miscellaneous js
    ViewMore.init();
    NewsArticleDynamic.init();
    NewsArticle.init();
    Faq.init();
    EventsModule.init();
    UserLogin.init();
    Account.init();
    Navigation.init();
    Clips.init();
    Search.init();
    Waivers.init();
    $('.masonry-grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: 200
    });

    $('.filter-toggle').on('click', function(e) {
           e.preventDefault();
           $('.more-filters').slideToggle(300);
           $('.filter-toggle > .more').toggleClass("hide");
           $('.filter-toggle > .less').toggleClass("hide");
       });

       $('.filter-toggle-resources').on('click', function(e) {
           e.preventDefault();
           $('.filters-area').slideToggle(300);
       });

       $('.btn-apply').on('click', function(e) {
           e.preventDefault();
           $('.filters-area').slideToggle(300);
       });

       $('.btn-clear').on('click', function(e) {
           e.preventDefault();
           $('input[type=checkbox]').prop('checked',false);
       });

       $('.switch-input').on('click', function(e) {
           if ((this).id == "mapoff") {
               $('#without-map').show();
               $('#with-map').hide();
           } else {
               $('#without-map').hide();
               $('#with-map').show();
           }
       });

       $("#tabs-section").on("change.zf.tabs", function(event) {
           setTimeout(function(){
               $('html,body').animate({scrollTop: 0}, 'fast');
           }, 10); //Adjust to match slideSpeed
       });

       $('.postCategory').on('change',function(){
         window.location.href = $('.postCategory').val();
       });

       $('#dropdown-button').on('click',function(){
         window.location = $('#dropdown-select').val();
       });

       $('.tweet-carousel').slick({
          dots: false,
          arrows: false,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: true,
      });

      $(".search-field").keyup(function( e ) {
        $('.search-reset').show();
      });
      $(".search-reset").on('click',function( e ) {
        $('.search-reset').hide();
      });
});
