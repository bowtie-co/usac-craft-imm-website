if(document.getElementById("rr-app")){

  Vue.mixin({
  computed: {
    unique () {
      return function (arr, key) {
        var output = []
        var usedKeys = {}
        for (var i = 0; i < arr.length; i++) {
          if (!usedKeys[arr[i][key]]) {
            usedKeys[arr[i][key]] = true
            output.push(arr[i])
          }
        }
        return output
      }
    }
  }
});

  const usacRRapi = axios.create({
    // baseURL: 'https://ccnbikes.com/rest/v2',
    baseURL: "/API",
    timeout: 100000,
    withCredentials: false
  });

  var data = {
    eventNameOrID: "",
    eventNameOrIDError: false,
    nameOrLicense: "",
    nameOrLicenseError: false,
    currentEventName: "",
    discResults: [],
    discSelected: "",
    eidName: "",
    rr: {
      rank_org: "Road",
      rank_disc: "RR",
      gender: "M",
      category: "",
      state: "",
      age_min: "1",
      age_max: "99",
      page_start: 0,
      page_limit: 500
    },
    discLookup: {
      "XC" : "Cross Country",
      "XCM" : "Cross Country Marathon",
      "CM" : "Cross Country Marathon",
      "DH" : "Downhill",
      "ELIM" : "Eliminator",
      "MX" : "Mountain Cross",
      "STXC" : "Short Track Cross Country",
      "DS" : "Dual Slalom",
      "TT" : "Time Trial",
      "FTT" : "Flying Time Trial",
      "SD" : "Super D",
      "ED" : "Enduro",
      "ITT" : "Individual Time Trial",
      "XCU" : "Cross Country Ultra Endurance",
      "FB" : "Fat Bike",
      "OT" : "Observed Trials",
      "AM" : "All-Mountain",
      "CRIT" : "Criterium",
      "CX" : "Cyclo-cross", 
      "CCR" : "Circuit Race",
      "HR" : "Handicap Race",
      "IP" : "Individual Pursuit",
      "KEIR" : "Keirin",
      "MAD" : "Madison",
      "MO" : "Miss and Out",
      "OMNI" : "Omnium",
      "IO" : "International Omnium",
      "PR" : "Points Race",
      "RR" : "Road Race",
      "HC" : "Hill Climb",
      "SR" : "Scratch Race",
      "SPR" : "Sprints",
      "STR" : "Stage Race",
      "GC" : "Stage Race",
      "TS" : "Tandem Sprint",
      "TSPR" : "Team Sprint",
      "TP" : "Team Pursuit",
      "FTT" : "Flying Time Trial",
      "TTT" : "Team Time Trial",
      "TRK" : "Track",
      "CCRR" : "Conference Champ Road Race",
      "CCCRIT" : "Conference Champ Criterium",
      "CCTTT" : "Conference Champ Team Time Trial",
      "DS/MX" : "Dual / Mountain Cross",
      "TR"  : "Team Relay",
      "4KM PURSUIT" : "4K",
      "TEAM PURSUIT" : "Team Pursuit",
      "SPRINT" : "Sprint",
      "POINTS" : "Points",
      "500 M TT" : "500M",
      "3KM PURSUIT"  : "3K",
      "1KM TT" : "1K",
      "POINTS RACE"  : "Points",
      "MIXED TEAM SPRINT" : "Coed Team",
      "3 KM TEAM PURSUIT" : "Team Pursuit"
      
    },
    individualResults: [],
    individualResults2: [],
    individualResultName: "",
    showIndividualResults: false,
    showIndividualResults2: false,
    showLoader: false,
    showResultsRankings: false,
    showResultsSearch: true,
    showRankingsSearch: true,
    showReturnToResults: false,
    rank_discSelected: "Road:RR",
    discShow: false,
    discEShow: false,
    raceResults: [],
    raceResultsShow: false,
    results: [],
    toggleResults: true,
    toggleRankings: true,
    leftResults: [],
    leftResultsShow: false,
    working: false,
    error_msg: ""
  };

  var config = "";
  var query = "?";

  var rr = new Vue({
    el: '#rr-app',
    data: () => {
      return data;
    },
    beforeMount() {
      usacRRapi.get('/profile/')
        .then(function (response) {
          data.user_account = response.data;

        })
        .catch(function (error) {

        });
    },
    mounted() {

    },
    delimiters: ['[[', ']]'],
    filters: { },
    watch: {
      "rank_discSelected": function(val, oldVal){
        var ss = val.split(":");
        data.rr.rank_org = ss[0];
        data.rr.rank_disc = ss[1];
      },
      eventNameOrID: function(val) {
        if(data.eventNameOrID.length > 0) {
          data.eventNameOrIDError = false;
        }
      },
      nameOrLicense: function(val) {
        if(data.nameOrLicense.length > 0) {
          data.nameOrLicenseError = false;
        }
      },
      working: function(val) {
        if(val) {
          data.showLoader = true;
        }
        else {
          data.showLoader = false;
        }
      }
    },
    methods: {
      showForms: function() {
        rr.clearDataAndResults();
        data.showResultsSearch = true;
        data.showRankingsSearch = true;
        data.raceResultsShow = false;
      },
      hideForms: function() {
        data.showResultsSearch = false;
        data.showRankingsSearch = false;
      },
      clearDataAndResults: function() {
        data.raceResults = [];
        data.individualResults = [];
        data.individualResults2 = [];
        data.leftResults = [];
        data.discResults = [];
        data.leftResultsShow = false;
        data.raceResultsShow = false;
        data.showResultsRankings = false;
        data.showIndividualResults2 = false;
        data.showIndividualResults = false;
        data.showReturnToResults = false;
        data.discShow = false;
        data.error_msg = "";
      },
      returnToEventResults: function() {
        data.raceResultsShow = false;
        data.leftResultsShow = true;
        rr.footablez();
      },
      showEventRaces: function(eid, eventname) {
        document.getElementById('irr').scrollIntoView();
        data.showReturnToResults = true;
        data.raceResults = [];
        axios.get('./API/race-results/?results_race_id='+eid)
          .then(function (response) {
            rr.hideForms();
            data.currentEventName = eventname;
            data.raceResults = response.data;
            data.raceResultsShow = true;
            data.leftResultsShow = false;
            rr.footablez();
          })
          .catch(function (error) {
          });

      },
      showDisciplineRaces: function(eid) {
        data.working = true;
        axios.get('./API/races/?event_id=' + eid)
          .then(function (response) {
            data.leftResultsShow = false;
            data.discResults = response.data;
            data.discShow = true;
            data.working = false;
          });
          this.scrollIt();
      },
      scrollIt: function() {
        $('html,body').animate({scrollTop: $(".results-top").offset().top},'slow');
      },
       searchEventNameOrLicense: function() {
         if(data.nameOrLicense == "") {
           data.nameOrLicenseError = true;
           return false;
         }
         this.showReturnToResults = true;
         this.clearDataAndResults();
         this.hideForms();
         this.showReturnToResults = true;
        if(parseInt(data.nameOrLicense)) {
          axios.get('./API/user-results-search/?comp_id=' + data.nameOrLicense)
            .then(function (response) {
              data.individualResults2 = response.data;
              rr.footablez();
              data.showIndividualResults2 = true;
            });
        }
        else {
          this.requestRaceData('?rider_name='+data.nameOrLicense);
        }
      },
      searchEventNameOrID: function() {
        data.working = true;
        data.eventNameOrID = data.eventNameOrID.trim();
        if(data.eventNameOrID == "") {
          data.working = false;
          data.eventNameOrIDError = true;
          return false;
        }
        data.showReturnToResults = true;
        this.clearDataAndResults();
        this.hideForms();
        if(parseInt(data.eventNameOrID)) {
          this.requestRaceData('?event_id='+data.eventNameOrID);
        }
        else {
          this.requestEventData('?source=RR&name='+data.eventNameOrID);
        }        
      },
      requestEventData: function(query) {
        data.showReturnToResults = true;
        axios.get('./API/events/'+query)
          .then(function (response) {
            data.leftResults = response.data;
            var temp = data.leftResults;

            temp.sort((a, b) => {
              if (Date.parse(a.date_start) < Date.parse(b.date_start)) {
                 return 1;
              } else if (Date.parse(a.date_start) > Date.parse(b.date_start)) {
                 return -1;
              } else {
                 return 0;
              }
            });
            data.leftResults = temp;
            data.leftResultsShow = true;
            data.working = false;
          })
          .catch(function (error) {
            
          });
      },
      requestRaceData: function(query) {
        data.showReturnToResults = true;
        axios.get('./API/races/'+query)
          .then(function (response) {
            data.leftResults = response.data;
            data.leftResultsShow = true;
            data.working = false;
          })
          .catch(function (error) {

          });
          return true;
      },
      backToEvents: function() {
        data.discShow = false;
        data.leftResultsShow = true;
      },
      hideIndividualResults: function() {
        data.showIndividualResults = false;
        data.showIndividualResults2 = false;
        data.raceResultsShow = false;
        data.showResultsRankings = true;
        data.individualResults = [];
        data.individualResultName = "";
        rr.footablez();

      },
      hideIndividualResults2: function() {
        data.showIndividualResults2 = false;
        data.individualResults2 = [];
        this.showForms();
        rr.footablez();
      },
      footablez: function() {
        // if($('.individual-race-results')) {
        //   $('.individual-race-results').footable({
        //     calculateWidthOverride: function() {
        //       return { width: $(window).width() };
        //     }
        //   });
        // }
        // if($('.resultsrankings')) {
        //   $('.resultsrankings').footable({
        //     calculateWidthOverride: function() {
        //       return { width: $(window).width() };
        //     }
        //   });
        // }
        // if($('.race-results-table')) {
        //   $('.race-results-table').footable({
        //     calculateWidthOverride: function() {
        //       return { width: $(window).width() };
        //     }
        //   });
        // }
      },
      loadResults: function(comp_id, name) {
        data.working = true;
        data.showIndividualResults = true;
        data.showResultsRankings = false;
        data.individualResultName = name;
        data.raceResultsShow = false;
        data.leftResultsShow = false;
        data.showReturnToResults = true;

        axios.get('./API/user-results-search/?comp_id=' + comp_id)
          .then(function (response) {
            data.individualResults = response.data;
            data.working = false;
            $('html,body').animate({scrollTop: $(".results-top").offset().top - 100},'slow');
          })
          .catch(function (error) {
            
            data.working = false;
          });
          this.scrollIt();
      },
      genderConvert: function(gender) {
        switch (gender) {
          case "F":
            return "Women";
            break;
          case "M":
            return "Men";
            break;
          default:
            return "All";
            // console.log(value);
            //do something
        }
      },
      loadMoreResults: function() {
        data.rr.page_start += 500;

        var squery = $.param(data.rr);

        axios.get('./API/ranking-search/?' + squery)
          .then(function (response) {

            if(response.data.length > 0) {
              response.data.forEach(function(element, index) {
                data.results.push(element);
              });
            }
            data.working  = false;
          })
          .catch(function (error) {
            
            data.working  = false;
          });

      },
      search: function() {
        data.working = true;
        data.rr.page_start = 0;
        var squery = $.param(data.rr);
        data.error_msg = "";
        data.results = [];
        data.raceResultsShow = false;
        data.leftResultsShow = false;
        data.showResultsRankings = false;
        rr.clearDataAndResults();
        rr.hideForms();
        data.showResultsRankings = true;
        axios.get('./API/ranking-search/?' + squery)
          .then(function (response) {

            if(response.data.length > 0) {
              data.results = response.data;
              data.showReturnToResults = true;
            }
            else {
              data.showReturnToResults = false;
              data.showResultsRankings = false;
              rr.showForms();
              data.error_msg = "Your search returned 0 results.  Please check your input and try again.";
            }
            data.working  = false;
          })
          .catch(function (error) {
            
            data.working  = false;
          });
      },
      showDiscExpand: function(value) {
        data.discSelected = value;
      },
      discFullName: function(value){
        if (!value) return ''
        value = value.toString().toUpperCase();

        if(data.discLookup[value] != null && data.discLookup[value] != undefined) {
          return data.discLookup[value];
        }
        else {
          return "NA";
        }

      },
    },
  });
}
