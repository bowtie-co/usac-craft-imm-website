var nv,
    Navigation = {
        settings: {
        },
        init: function() {
            nv = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {

              axios.get('/API/profile/')
                .then(function (response) {

                  if(response.data.first_name) {
                    $('.nav-username').html(response.data.first_name + ' ' + response.data.last_name);
                    //$('.nav-user-loggedOut').hide();
                    //$('.nav-user-loggedIn').show();
                  }
                  //else {
                  //  $('.nav-user-loggedOut').show();
                  //  $('.nav-user-loggedIn').hide();
                  //}
                })
                .catch(function (error) {
                  console.log(error);
                });

            // search bar logic
            $("#filtersubmit").click(function(){
                $(".top-bar-nav-overlay").toggle();
            });
            $(".content-overlay").click(function(){
                if($(".top-bar-nav-overlay").is(":visible")) {
                    $(".top-bar-nav-overlay").toggle();
                }
            });
            $(".title-bar-right, .js-off-canvas-overlay").click(function(){
                $(".title-bar-right .fa-bars").toggle();
                $(".title-bar-right .fa-close").toggle();
            });

            // $(".is-accordion-submenu-parent > a").each(function(i, e){
            //     // turn off foundation events
            //     $(e).unbind("click")
            // });

            $(".is-accordion-submenu-parent .float-right-ff-div").click(function(e){
                var id = $(this).parent().attr("id");
                var is_open = $("#"+id).attr("aria-expanded");
                var href = $("#"+id+" > a").attr("href");
                if(is_open == "true") {
                    // make chevron a down arrow
                    if($("#"+id+" .fa-nav-icon-parent").hasClass("fa-chevron-up")){
                        $("#"+id+" .fa-nav-icon-parent").removeClass("fa fa-chevron-up")
                        $("#"+id+" .fa-nav-icon-parent").addClass("fa fa-chevron-down")
                    }
                    $("#"+id).attr("aria-expanded", false);
                    $("#"+id).find(".submenu").hide();
                } else {
                    // make chevron an up arrow
                    if($("#"+id+" .fa-nav-icon-parent").hasClass("fa-chevron-down")){
                        $("#"+id+" .fa-nav-icon-parent").removeClass("fa fa-chevron-down")
                        $("#"+id+" .fa-nav-icon-parent").addClass("fa fa-chevron-up")
                    }
                    $("#"+id).attr("aria-expanded", true);
                    $("#"+id).find(".submenu").show();
                }
            });
        }
    };
