var vm,
    ViewMore = {
        init: function() {
            this.bindUIActions();
        },
        bindUIActions: function() {
            var pageNum = 1;
            $(function(){
                var page = 2;
                var currentUrl = window.location.href;
                var eid = $(this).data("eid");
                $("#loadMore").click(function(e){
                    e.preventDefault();
                    $('#loading').show();

                    var remaining_blog_entries_count = ViewMore.getTotalBlogEntries(eid);
                    var newUrl = currentUrl+"/p"+page;
                    $.get(newUrl, function (data) {
                        $("#featured-blog-posts").append(data);
                        $('#loading').hide();
                        page++;
                    }).done(function () {
                        var remaining_blog_entries_count = ViewMore.getTotalBlogEntries(eid)-(6*pageNum);
                        console.log(remaining_blog_entries_count);
                        if (remaining_blog_entries_count <= 6) {
                            $("#loadMore").hide();
                        }
                        pageNum++;
                    });
                });
            });
        },
        getTotalBlogEntries: function(eid) {
            // total_blog_entries is set inline by craft in the blog/_entry.html template
            var total_blog_entries_count = $(".total-entries").data('total-blog-entries-count');
            return total_blog_entries_count;
        }
    };
