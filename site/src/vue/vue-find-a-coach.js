if(document.getElementById("coaches-app")){

    const baseUrl = "/API/coaches/";

    var coachApp = new Vue({
        el: '#coaches-app',
        data: {
            coaches: [],
            filter: {
                Disciplines: "",
                state: "",
                zipcode: "",
                radius: "5",
                lastname: "",
                gender: "",
                cpbt: "",
                csi: "",
                L01: "",
                L02: "",
                L03: "",
                BMX01: "",
                BMX02: "",
                BMX03: "",
                page: 0,
                limit: 999
            },
            modalCoachData: {
                name: null,
                certlevel: null,
                phone: null,
                website: null,
                email: null
            },
            modalActive: false,
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
                let l = this.coaches.length,
                    s = this.resultsPerPage;
                return Math.ceil(l/s);
            },
            paginatedData(){
                const maxLen = this.coaches.length;
                const start = this.pageNumber * this.resultsPerPage;
                const end = start + this.resultsPerPage < maxLen ? start + this.resultsPerPage : maxLen;
                return this.coaches.slice(start, end);
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
                    //callback: "coachApp.updateGoogleMap",
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
            getCoaches(url) {

                var arrCoachesResult = [];

                axios.get(url).then(function (response) {
                    $.each(response.data, function(i, v) {
                        arrCoachesResult.push(v);
                    });
                }).catch(function (error) {
                    console.log(error);
                }).then(function(){
                    //this.loader = false;
                    coachApp._data.loader = false;
                });

                this.coaches = arrCoachesResult;

            },
            setOrgType(event) {
                this.filter.Disciplines = event.target.value;
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
            setLastName(event) {
                this.filter.lastname = event.target.value;
            },
            setGenderPreference(event) {
                var genderVals = [];
                $("input[name=gender]:checked").each(function(i, v){
                    genderVals.push($(v).val());
                });
                if(genderVals.indexOf("M") > -1 && genderVals.indexOf("F") > -1) {
                    this.filter.gender = "";
                } else if(genderVals.length == 1) {
                    this.filter.gender = genderVals[0];
                } else {
                    this.filter.gender = "";
                }
            },
            setCPBT(event) {
                //console.log(event.target.value);
                this.filter.cpbt = $(event.target).is(':checked') ? event.target.value : "";
            },
            setCSI(event) {
                //console.log(event.target.value);
                this.filter.csi = $(event.target).is(':checked') ? event.target.value : "";
            },
            setL01(event) {
                this.filter.L01 = $(event.target).is(':checked') ? event.target.value : "";
            },
            setL02(event) {
                this.filter.L02 = $(event.target).is(':checked') ? event.target.value : "";
            },
            setL03(event) {
                this.filter.L03 = $(event.target).is(':checked') ? event.target.value : "";
            },
            setBMX01(event) {
                this.filter.BMX01 = $(event.target).is(':checked') ? event.target.value : "";
            },
            setBMX02(event) {
                this.filter.BMX02 = $(event.target).is(':checked') ? event.target.value : "";
            },
            setBMX03(event) {
                this.filter.BMX03 = $(event.target).is(':checked') ? event.target.value : "";
            },
            submitSearch() {
                this.loader = true;
                this.pageNumber = 0;
                this.getCoaches(window.location.protocol+"//"+window.location.hostname+baseUrl+this.buildFilter());
            },
            formatPhoneNumber(s) {
                var s2 = (""+s).replace(/\D/g, '');
                var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
                return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
            },
            launchModal(event) {
                this.modalActive = !this.modalActive;
                this.modalCoachData = {
                    name: event.target.getAttribute("data-name"),
                    certlevel: event.target.getAttribute("data-cert-level"),
                    phone: this.formatPhoneNumber(event.target.getAttribute("data-phone")),
                    email: event.target.getAttribute("data-email"),
                    website: event.target.getAttribute("data-website")
                };
            },
            closeModal() {
                this.modalActive = !this.modalActive;
            }
        }
    });
}
