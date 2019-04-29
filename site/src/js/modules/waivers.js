var waivers,
    Waivers = {
        settings: {

        },
        init: function() {
            waivers = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
          $(document).on('change', '.waiver-check', function() {
            var dataOpt = $(this).data('content');
              if(this.checked) {
                $(this).parent().addClass('active');
                // $(dataOpt).addClass('hidden');
                $('html, body').animate({
                    scrollTop: $("#" + $(this).attr('id')).offset().top
                }, 500);
              }
              else {
                $(this).parent().removeClass('active');
                // $(dataOpt).removeClass('hidden');
                $('html, body').animate({
                    scrollTop: $("#" + $(this).attr('id')).offset().top
                }, 500);
              }

          });

          $( "#waiver-data-form" ).submit(function( event ) {
            event.preventDefault();
            var ws = $("#wid").val();
            var ss = $("#waiver-signature").val();
            var hasErrors = false;
            $('#waiver-data-form input').each(function(index,data) {
              if($(this).is(':checkbox')) {
                if($(this).is(':checked')) {
                  $(this).parent().removeClass('error');
                }
                else {
                  $(this).parent().addClass('error');
                  $('html, body').animate({
                      scrollTop: $("#" + $(this).attr('id')).offset().top
                  }, 500);
                  hasErrors = true;
                  return false;
                }

              }

              if($('#waiver-signature').val().length < 1) {
                $('#waiver-signature').addClass('error-red');
                hasErrors = true;
                return false;
              } else {
                $('#waiver-signature').removeClass('error-red');
              }

            });
            if(!hasErrors) {
              //if you made it this far, you are ready to submit.
                axios.get('/API/waiver-put/?wid='+ws+'&sig='+ss)
                  .then(function (response) {
                    location.href = '/account-new?wa=yes';
                  })
                  .catch(function (error) {

                  });
            }
          });
        }
    };
