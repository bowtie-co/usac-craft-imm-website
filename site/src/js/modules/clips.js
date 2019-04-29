var cl,
    Clips = {
        settings: {
            clipinfo: $(".which_membership > figcaption")
        },
        init: function() {
            cl = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            cl.clipinfo.click(function(){
                console.log(this)
            });
        }
    };
    
