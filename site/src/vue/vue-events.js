//if(document.getElementById("events-app")){

  const usacAPI = axios.create({
    // baseURL: 'https://ccnbikes.com/rest/v2',
    baseURL: "/API",
    timeout: 100000,
    withCredentials: false
  });

  var isProcessing = false;
  var query = "?";
  var pageCount = 0;
  var resultsActive = false;
  var searchParams = {
    search: "",
    starts_from: "",
    starts_to: "",
    country: "",
    province: "",
    category: ""
  };
  var squery = "";
  var testQuery = {};

  var data = {
    core: [],
    countries: [],
    countrySelected: '',
    currentAddress: '',
    currentCoords: '',
    dateInteracted: false,
    eventStartDate: "",
    eventEndDate: "",
    eventRange: "",
    eventTypes: [],
    eventTypeSelected: '',
    filterSelected: 'ALL',
    isActive: false,
    isLoggedIn: false,
    nextResult: "",
    provinces: [],
    provinceSelected: '',
    raceName: "",
    results: [],
    resultsOrig: [],
    resultsMsg: "",
    searchButtonText: 'Show Future Events',
    showLoading: false,
    showButtonText: true,
    uInfoLoad: false,
    zipSelected: '',
  };

  var vm = new Vue({
    el: '#events-app',
    data: () => {
      return data;
    },
    beforeMount() {
      if(this.getParameterByName('start')){
        data.eventStartDate = this.getParameterByName('start');
      }
      if(this.getParameterByName('end')) {
        data.eventEndDate = this.getParameterByName('end');
      }
      if(this.getParameterByName('range')) {
        try {
          var range = parseInt(this.getParameterByName('range'));
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var c = new Date(year - range, month, day)

          data.eventStartDate = c.toISOString().substring(0,10);
          data.eventEndDate = d.toISOString().substring(0,10);
        }
        catch(err) {

        }
      }
    },
    mounted() {
      //lets check to see if they are passing in event dates, if so auto-query.
      if(data.eventStartDate || data.eventEndDate) {
        this.search();
      }
      axios.get('/API/profile/')
        .then(function (response) {

          if(response.data.first_name) {
            data.isLoggedIn = true;
          } else {
            data.isLoggedIn = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    busy: false,
    delimiters: ['[[', ']]'],
    filters: {
      friendlyDate: function (value) {
        if (!value) return ''

        value = value.toString();

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        var today  = new Date(value);
        //console.log(today);
        return today.toLocaleDateString("en-US",options);
      }
    },
    watch: {
      "filterSelected": function(val, oldval) {
        switch (val) {
          case "ALL":
            data.results = data.resultsOrig;
            break;
          case "Y":
            data.results = [];
            data.resultsOrig.filter(function(prov){
              var comp = prov.competitive;
              if(comp == 'Y') {
                data.results.push(prov);
              }
            });
            break;
          case "N":
          data.results = [];
          data.resultsOrig.filter(function(prov){
            var comp = prov.competitive;
            if(comp == 'N') {
              data.results.push(prov);
            }
          });
            break;
          default:
            console.log(value);
        }
      },
      "raceName": function(val, oldVal) {
        if(val && !data.dateInteracted) {
          data.searchButtonText = "SEARCH FUTURE EVENTS";
        }
        else {
          data.searchButtonText = "SEARCH";
        }
      },
      "eventTypeSelected": function(val, oldVal) {
        if(val && !data.dateInteracted) {
          data.searchButtonText = "SEARCH FUTURE EVENTS";
        }
        else {
          data.searchButtonText = "SEARCH";
        }
      },
      "eventStartDate": function(val, oldVal){
        if(val) {
          data.dateInteracted = true;
          var dt = new Date(val);
          data.eventStartDate = dt.toISOString().substring(0,10);
          data.searchButtonText = "SEARCH";
        }
        else {
          if(!data.eventStartDate && !data.eventEndDate) {
            data.searchButtonText = "SEARCH FUTURE EVENTS";
          }
          data.eventStartDate = "";
        }
      },
      "eventEndDate": function(val, oldVal){
        if(val) {
          data.dateInteracted = true;
          var dx = new Date(val);
          data.eventEndDate = dx.toISOString().substring(0,10);
          data.searchButtonText = "SEARCH";
        }
        else {
          if(!data.eventStartDate && !data.eventEndDate) {
            data.searchButtonText = "SEARCH FUTURE EVENTS";
          }
          data.eventEndDate = "";
        }
      },
      "eventTypeSelected": function(val, oldVal) {
        if(val && !data.dateInteracted) {
          data.searchButtonText = "SEARCH FUTURE EVENTS";
        }
        else {
          data.searchButtonText = "SEARCH";
        }
      },
      "provinceSelected": function(val, oldVal) {
        if(val && !data.dateInteracted) {
          data.searchButtonText = "SEARCH FUTURE EVENTS";
        }
        else {
          data.searchButtonText = "SEARCH";
        }
      },
      "zipSelected": function(val, oldVal) {
        if(val && !data.dateInteracted) {
          data.searchButtonText = "SEARCH FUTURE EVENTS";
        }
        else {
          data.searchButtonText = "SEARCH";
        }
      }
    },
    methods: {
      sanitizeCompID: function (value) {
        if (!value) return ''

        value = value.toString();
        var result = value.split("-");
        var delimitMark = "";
        if (data.isLoggedIn) {
          delimitMark = '&';
        } else {
          delimitMark = '%26';
        }
        var tq = result[1] + delimitMark + 'year=' + result[0];
        return tq;
      },
      "getDates": function(startDate, stopDate) {
        var start = new Date(startDate);
        var stop = new Date(stopDate);
        var dateArray = [];

        while(start <= stop){
           dateArray.push(start.toISOString().slice(0,10));
           var newDate = start.setDate(start.getDate() + 1);
           start = new Date(newDate);
        }
        return dateArray;
      },
      "getParameterByName": function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      },
      "geoLocate": function() {
        axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBDpTddq88HsgGZC30_H93wjTE0M903HAg")
        .then(response => {
          //currentCoords has access to lat and lng
          data.currentCoords = response.data.location;

          axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ data.currentCoords.lat + "," + data.currentCoords.lng + "&key=AIzaSyBDpTddq88HsgGZC30_H93wjTE0M903HAg")
          .then(mapsResponse => {
            data.currentAddress = mapsResponse.data.results[0];

            if(data.currentAddress.address_components) {
              for(var i in data.currentAddress.address_components){
                if(typeof(data.currentAddress.address_components[i]) === "object" && data.currentAddress.address_components[i].types[0] == "postal_code") {
                  var result = data.currentAddress.address_components[i].long_name;
                }
              }
            }
          }).
          catch(function(error){
            console.log(error);
          })

        })
        .catch(function (error) {
          console.log(error);
        });
      },
      //Update provinces based on Country selection
      updateProvince: function(event) {
        if(data.countrySelected == 0){
          data.provinceSelected = "";
          data.provinces = "";
          query = "?";
          return;
        }
        data.countries.data.filter(function(prov){
          if(prov.id == data.countrySelected) {
            data.provinces = prov.provinces;
          }
        });
      },
      search: function () {
        data.isActive = true;
        data.showLoading = true;
        data.showButtonText = false;
        pageCount = 0;
        resultsActive = true;
        testQuery = {};
        if(data.raceName.length) {
          testQuery.search = data.raceName;
        }
        if(data.eventTypeSelected.length) {
          testQuery.type = data.eventTypeSelected;
        }
        if(data.provinceSelected.length) {
          testQuery.state = data.provinceSelected;
        }
        if(data.eventStartDate.length) {
            testQuery.starts_from = data.eventStartDate;
        }
        if(data.eventEndDate.length) {
            testQuery.starts_to = data.eventEndDate;
        }
        if(data.zipSelected.length) {
          testQuery.zip = data.zipSelected;
        }

        squery = $.param(testQuery);


        usacAPI.get('/events/?' + squery)
        .then(response => {
          this.results = response.data;
          this.resultsOrig = this.results;
          this.core = response.data;
          if(response.data.count != 0) {
            this.resultsMsg = "Displaying " + this.results.length + " results.";
          }
          else {
            this.resultsMsg = "No results found. Please change your search parameters and try again.";
          }


          //Reactively set showDetails for each result
          this.results.forEach(function(element){
            Vue.set(element, 'showDetails', false);
            Vue.set(element, 'singleDaySelection', '');
            Vue.set(element,'raceDates', vm.getDates(element.date_start, element.date_end));
          });

          query = "?";

          setTimeout(() => {
            data.showLoading = false;
            data.showButtonText = true;
            $(document).scrollTop( $("#results-anchor").offset().top );
          }, 800);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      loadMore: function() {
        data.uInfoLoad = false;
        if(pageCount != 0) {
        if(resultsActive  && !isProcessing) {
          data.uInfoLoad = true;
          isProcessing = true;
          pageCount += 1;
          setTimeout(() => {
            usacAPI.get('/events/?' + squery + "&page_start=" + ((pageCount-1)*20))
            .then(response => {
                for (var i = 0; i < response.data.length; i++) {
                  Vue.set(response.data[i], 'showDetails', false);
                  Vue.set(response.data[i],'raceDates', vm.getDates(response.data[i].date_start, response.data[i].date_end));
                  Vue.set(response.data[i], 'singleDaySelection','');

                  data.resultsOrig.push(response.data[i]);

                  if(data.filterSelected == 'Y') {
                    if(response.data[i].competitive == 'Y') {
                      data.results.push(response.data[i]);
                    }
                  }
                  if(data.filterSelected == 'N') {
                    if(response.data[i].competitive == 'N') {
                      data.results.push(response.data[i]);
                    }
                  }
                }
                data.resultsMsg = "Displaying " + data.results.length + " results.";
                isProcessing = false;
                data.uInfoLoad = false;
            })
            .catch(function (error) {

            });
            this.busy = false;
          }, 800);
        }
      }
      else {
        pageCount += 1;
      }
      }
    }
  });
//}
