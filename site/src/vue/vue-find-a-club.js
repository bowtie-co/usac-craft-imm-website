if(document.getElementById("clubs-app")){

    const baseUrl = "/API/clubs/";

    var clubApp = new Vue({
        el: '#clubs-app',
        data: {
            clubs: [],
            filter: {
                org: "",
                state: "",
                zipcode: "",
                radius: "5",
                club: "",
                womenonly: "",
                juniorsonly: "",
                mastersonly: "",
                page:0,
                limit:999
            },
            pageNumber: 0, // default to page 0
            resultsPerPage: 8,
            loader: false,
        },
        delimiters: ['[[', ']]'],
        created: function() {
            this.initGoogleMapsLibs();
        },
        computed: {
            pageCount(){
                let l = this.clubs.length,
                    s = this.resultsPerPage;
                return Math.ceil(l/s);
            },
            paginatedData(){
                const maxLen = this.clubs.length;
                const start = this.pageNumber * this.resultsPerPage;
                const end = start + this.resultsPerPage < maxLen ? start + this.resultsPerPage : maxLen;
                return this.clubs.slice(start, end);
            }
        },
        methods: {
            nextPage() {
                this.pageNumber++;
            },
            goToPage(target) {
                this.pageNumber = target;
            },
            prevPage() {
                this.pageNumber--;
            },
            updateGoogleMap : function() {
                var map = new google.maps.Map(document.getElementById('google-map'), {
                    zoom: 3,
                    center: new google.maps.LatLng(39.0997, -94.5786),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            },
            initGoogleMapsLibs: function() {

                // add maps lib
                var googleMapScript = document.createElement('script');
                var baseUrl = 'https://maps.googleapis.com/';

                var options = {
                    //callback: "clubApp.updateGoogleMap",
                    key: "AIzaSyDy0wL4H7-4TOQGB0yukQnw3n4ECTs2kFU"
                };

                var google_api_url = baseUrl + 'maps/api/js?' + Object.keys(options).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
                }).join('&');

                googleMapScript.setAttribute('src', google_api_url);
                googleMapScript.setAttribute('async', '');
                googleMapScript.setAttribute('defer', '');
                document.head.appendChild(googleMapScript);
            },
            buildFilter() {
                var filterParams = [];
                $.each(this.filter, function(i, v) {
                    if(v != 0 && v != "") {
                        filterParams.push(i+"="+v);
                    }
                });
                if(filterParams.length > 0) {
                    //console.log("?"+filterParams.join("&"));
                    return "?"+filterParams.join("&");
                }
                return "";
            },
            getClubs(url) {

                var arrClubsResult = [];

                axios.get(url).then(function (response) {
                    $.each(response.data, function(i, v) {
                        arrClubsResult.push(v);
                    });
                }).catch(function (error) {
                    console.log(error);
                }).then(function(){
                    //this.loader = false;
                    clubApp._data.loader = false;
                });

                this.clubs = arrClubsResult;

            },
            setOrgType(event) {
                this.filter.org = event.target.value;
            },
            setState(event) {
                this.filter.state = event.target.value;
            },
            setZip(event) {
                this.filter.zipcode = event.target.value;
            },
            setRadius(event) {
                if(this.filter.zipcode != ""){
                    this.filter.radius = event.target.value;
                }
            },
            setClubName(event) {
                this.filter.club = event.target.value;
            },
            setGenderPreference(event) {
                //console.log("_____________")
                //console.log(event.target.value)
                //console.log("_____________")
                if(event.target.value == "Women") {
                    this.filter.womenonly = "Y";
                    this.filter.juniorsonly = "";
                    this.filter.mastersonly = "";
                } else if(event.target.value == "Junior") {
                    this.filter.womenonly = "";
                    this.filter.juniorsonly = "Y";
                    this.filter.mastersonly = "";
                } else if(event.target.value == "Master") {
                    this.filter.womenonly = "";
                    this.filter.juniorsonly = "";
                    this.filter.mastersonly = "Y";
                } else {
                    this.filter.womenonly = "";
                    this.filter.juniorsonly = "";
                    this.filter.mastersonly = "";
                }
            },
            submitSearch() {
                this.loader = true;
                this.pageNumber = 0;
                this.getClubs(window.location.protocol+"//"+window.location.hostname+baseUrl+this.buildFilter());

                //this.updateMap();
            }
        }
    });

}
