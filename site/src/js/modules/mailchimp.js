var mc,
    MailChimpSubscribe = {
        settings: {
            form: $(".newsletter-signup-widget form"),
            messageContainer: $(".newsletter-message-container")
        },
        init: function() {
            mc = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            if (mc.form.length) {
                mc.form.on("submit", function(e) {
                    e.preventDefault();
                    $.post('/', $(this).serialize())
                        .done(function(data) {
                            if (!data.success) {
                                // there was an error, do something with data
                                mc.messageContainer.html(data.message)
                            } else {
                                // Success
                                mc.messageContainer.html("Thanks!")
                            }
                        });
                });
            }
        }
    };