var faq,
    Faq = {
        settings: {
            learnmore: $(".learn-more-expand"),
            faqhacksaw: $(".faqAnswerHacksaw"),
            faqfull: $(".faqAnswerFull")
        },
        init: function() {
            faq = this.settings;
            this.bindUIActions(); 
        },
        bindUIActions: function() {

            faq.faqfull.hide();
            faq.learnmore.click(function(e){
                e.preventDefault();
                $(this).siblings(".faqAnswerHacksaw").toggle();
                $(this).siblings(".faqAnswerFull").toggle();
            });
        }
    };
