var search,
    Search = {
        settings: {
            search_id: $("#search")
        },
        init: function() {
            search = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {
            search.search_id.submit(function(e){
                e.preventDefault();
                var search_text = $(this).find(".search-text").val();
                search_text = encodeURI(search_text)
                    .replace("'",'%27')
                    .replace("\"",'%22')
                    .replace("<",'%3C')
                    .replace(">",'%3E');
                $(this).find(".search-text-q").val(search_text);
                $(this).unbind('submit').submit();
            });
        }
    };