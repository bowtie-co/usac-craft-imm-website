var dpga,
    DataPushGa = {
        settings: {

        },
        init: function() {
            dpga = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {

            //push the ga-data-push value to google as a click event
            $('*[data-ga-push]').click(function(){
                var val = $(this).data('ga-push');
                //console.log(val)
                //turn this on once ga is being pulled onto the page via gtm
                ga('send', 'event', 'Cta', 'Click', val)
            });

        }
    };