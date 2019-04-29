var ev,
    EventsModule = {
        init: function() {
            ev = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
          $('.revise-search').on('click',function(){
            window.scrollTo(0, 0);
            // $('.stuck').addClass('active');
            // $('#search-contain').show();

          });


          $('.date-picker').fdatepicker({
            format: 'yyyy-mm-dd',
            disableDblClickSelection: true,
            leftArrow:'<<',
            rightArrow:'>>',
            closeIcon:'X',
            closeButton: true
          }).on('changeDate', function(dateData){
              switch(dateData.currentTarget.id) {
                case "eventStartDate":
                    if(dateData.date) {
                      vm.eventStartDate = dateData.date;
                    }
                    else {
                      vm.eventStartDate = "";
                    }
                    break;
                case "eventEndDate":
                    if(dateData.date) {
                      vm.eventEndDate = dateData.date;
                    }
                    else {
                      vm.eventEndDate = "";
                    }
                    break;
                default:
                    console.log('Element does not exist.');
            }
          });

            if ($('.search-sticky').length) {
                var sticky = new Waypoint.Sticky({
                    element: $('.search-sticky')[0],
                    handler: function (direction) {
                        switch (direction) {
                            case "up":
                                $('.revise-search').css('visibility', 'hidden');
                                $('.revise-search').css('display', 'none');
                                break;
                            case "down":
                                $('.revise-search').css('visibility', 'visible');
                                $('.revise-search').css('display', 'block');
                                break;
                            default:
                            //do nothing
                        }
            },
            offset: -120
          });

        }
      },
      getParameterByName: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }
    };
