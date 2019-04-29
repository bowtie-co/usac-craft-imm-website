var na,
    NewsArticle = {
        init: function() {
            this.bindUIActions();
        },
        bindUIActions: function() {
            var ajaxTpl = "/article/ajax/loadmore-listing.html";
            var pageNum = 1;
            // in case there are multiple widgets on the same page.
            $.each($(".news-article-widget"), function(){
                var eid = $(this).data("eid");
                $(".news-article-widget-"+eid+" .ajax-listing-widget").click(function(e){
                    e.preventDefault();
                    // request a template that only allows ajax requests.
                    // pass the page the number of articles already loaded.
                    // return 6 at a time.
                    var remaining_ajaxable_entries_count = NewsArticle.getTotalAjaxableEntries(eid);
                    url = ajaxTpl + "?page=" + pageNum + "&remaining=" + remaining_ajaxable_entries_count;
                    $.get(url, function (data) {
                        $(".news-article-widget-"+eid+" .load-target").append(data);
                    }).done(function () {
                        var remaining_ajaxable_entries_count = NewsArticle.getTotalAjaxableEntries(eid)-(3*pageNum);
                        if (remaining_ajaxable_entries_count <= 0) {
                            $(".news-article-widget-"+eid+" .ajax-listing-widget").hide();
                        }
                        pageNum++
                    });
                });
            });
        },
        getTotalAjaxableEntries: function(eid) {
            // total_ajaxable_entries is set inline by craft in the widgets/news-article-dynamic-widget.html template
            var total_ajaxable_entries_count = $(".news-article-widget-"+eid+" .load-target").data('total-ajaxable-entries-count');
            return total_ajaxable_entries_count;
        }
    };