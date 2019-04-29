var nad,
    NewsArticleDynamic = {
        init: function() {
            this.bindUIActions();
        },
        bindUIActions: function() {
            var ajaxTpl = "/article/ajax/loadmore.html";
            var pageNum = 1;
            // in case there are multiple widgets on the same page.
            $.each($(".news-article-category-widget"), function(){
                var cat = $(this).data("cat");
                var classCat = cat.replace(/ /g, "_");

                $(".news-article-category-widget-"+classCat+" .ajax-listing-widget").click(function(e){
                    e.preventDefault();


                    // request a template that only allows ajax requests.
                    // pass the page the number of articles already loaded.
                    // return 6 at a time.
                    var remaining_ajaxable_entries_count = NewsArticleDynamic.getTotalAjaxableEntries(classCat);
                    url = ajaxTpl + "?page=" + pageNum + "&category=" + cat + "&remaining=" + remaining_ajaxable_entries_count;
                    $.get(url, function (data) {
                        $(".news-article-category-widget-"+classCat+" .load-target").append(data);
                    }).done(function () {
                        var remaining_ajaxable_entries_count = NewsArticleDynamic.getTotalAjaxableEntries(classCat)-(6*pageNum);
                        if (remaining_ajaxable_entries_count <= 0) {
                            $(".news-article-category-widget-"+classCat+" .ajax-listing-widget").hide();
                        }
                        pageNum++
                    });
                });
            });
        },
        getTotalAjaxableEntries: function(classCat) {
            // total_ajaxable_entries is set inline by craft in the widgets/news-article-dynamic-widget.html template
            var total_ajaxable_entries_count = $(".news-article-category-widget-"+classCat+" .load-target").data('total-ajaxable-entries-count');
            return total_ajaxable_entries_count;
        }
    };