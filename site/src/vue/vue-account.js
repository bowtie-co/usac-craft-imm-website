if(document.getElementById("account-app")){

  const usacAPI2 = axios.create({
    baseURL: "/API",
    timeout: 150000,
    withCredentials: false
  });

  var data = {
    currentResultName: "",
    currentResultCity: "",
    currentResultState: "",
    currentResultDate: "",
    licenses: [],
    licenseFilterSelected: "all",
    licensesOrig: [],
    licensesComp: [],
    licenseMaster: {
      race: [],
      coach: [],
      mechanic: [],
      official: [],
      uci:[]
    },
    race_results: [],
    results: [],
    resultsError: false,
    rr: {
      rank_org: "",
      rank_disc: "",
      rank_discSelected: "",
      gender: "",
      category: "",
      state: "",
      age_min: "",
      age_max: "",
      page_start: 0,
      page_limit: 500
    },
    rankings: [],
    showRaceResults: false,
    showResultsRanking: true,
    tabOneLoad: true,
    uInfoLoad: true,
    uProfileLoaded: false,
    user_account: [],
    filterMessage: false,
    showApp: false
  };

  var acct = new Vue({
    el: '#account-app',
    data: () => {
      return data;
    },
    beforeCreate() {

    },
    mounted() {
      axios.get('/API/waiver/?xfg=293381')
        .then(function (response) {
          if(response.data == "" || response.data.detail == "Invalid username/password.") {
            $('.account-body').show();
          }
          else {
            location.href = "/waivers";
          }
        })
        .catch(function (error) { });

      usacAPI2.get('/profile/')
        .then(function (response) {
          data.user_account = response.data;

          //one more check for errrors or expired token
          if(!data.user_account.user_id) {
            location.href = '/API/logout';
          }

          data.uInfoLoad = false;
          data.uProfileLoaded = true;

          usacAPI2.get('/ranking/?comp_id=' + data.user_account.comp_id )
            .then(function (nextresponse) {

              if(nextresponse.data[0]) {
                data.rankings = nextresponse.data[0];
              }


              usacAPI2.get('/licenses/')
                .then(function (liscresponse) {
                  var temp = [];



                  //Active
                  liscresponse.data.forEach(function(element, index) {

                    var timestamp = Date.parse(element.date_exp);
                    if(isNaN(timestamp)==false){
                      var dateX = new Date(element.date_exp);
                      var years = moment().diff(dateX.toISOString(), 'years');

                      if (years < 4) {
                          if(Date.now() <= new Date(element.date_exp) && element.license_status == ''){
                            data.licenses.push(element);
                          }
                      }
                    }
                  });
                  //Pending
                  liscresponse.data.forEach(function(element, index) {
                    var timestamp = Date.parse(element.date_exp);
                    if(isNaN(timestamp)==false){
                      var dateX = new Date(element.date_exp);
                      var years = moment().diff(dateX.toISOString(), 'years');

                      if (years < 4) {
                        if(element.license_status == 'P') {
                          data.licenses.push(element);
                        }
                      }
                    }
                  });
                  //Suspended
                  liscresponse.data.forEach(function(element, index) {
                    var timestamp = Date.parse(element.date_exp);
                    if(isNaN(timestamp)==false){
                      var dateX = new Date(element.date_exp);
                      var years = moment().diff(dateX.toISOString(), 'years');

                      if (years < 4) {
                        if(element.license_status == 'S') {
                          data.licenses.push(element);
                        }
                      }
                    }
                  });
                  //Expired
                  liscresponse.data.forEach(function(element, index) {
                    var timestamp = Date.parse(element.date_exp);
                    if(isNaN(timestamp)==false){
                      var dateX = new Date(element.date_exp);
                      var years = moment().diff(dateX.toISOString(), 'years');
                      if (years < 4) {
                        if(Date.now() > new Date(element.date_exp) && element.license_status == ''){
                          data.licenses.push(element);
                        }
                      }
                    }
                  });



                  data.licensesOrig = data.licenses;

                  usacAPI2.get('/licensescomp/?comp_id=' + data.user_account.comp_id)
                  .then(function(liccompresponse) {


                    liccompresponse.data.forEach(function(element, index) {
                      if(element.section_header == 'TECHNICAL' && element.section_subtitle == 'OFFICIAL') {

                        //Lets set a default of no for these values.  If they are found
                        //we will use the values returned from the API.  This is structuring
                        //the data in a way thats more usable in the VIEW.
                        Vue.set(element, 'MOTOREF', "NO");
                        Vue.set(element, 'STARTER', "NO");
                        Vue.set(element, 'SECRETARY', "NO");

                        for (var key in element.categories) {
                          if(element.categories[key].MOTOREF) {
                            Vue.set(element, 'MOTOREF', element.categories[key].MOTOREF);
                          }
                          if(element.categories[key].STARTER) {
                            Vue.set(element, 'STARTER', element.categories[key].MOTOREF);
                          }
                          if(element.categories[key].SECRETARY) {
                            Vue.set(element, 'SECRETARY', element.categories[key].MOTOREF);
                          }
                        }
                      }
                    });

                    data.licensesComp = liccompresponse.data;

                  })
                  .catch(function(error){

                  });
                  usacAPI2.get('/user-results/')
                    .then(function (uresultsresponse) {
                      if(uresultsresponse.data.length > 0) {
                        data.resultsError = false;
                        data.results = uresultsresponse.data;
                        if($('.standings-table')) {
                          $('.standings-table').footable({
                            calculateWidthOverride: function() {
                              return { width: $(window).width() };
                            }
                          });
                        }
                      }
                      else {
                        data.resultsError = true;
                      }
                      data.tabOneLoad = false;
                    })
                    .catch(function (error) {
                      // console.log('user-results failed');
                      // //location.href = '/API/logout';
                    });

                })
                .catch(function (error) {
                  // //location.href = '/API/logout';
                  // console.log(error);
                });
            })
            .catch(function (error) {
              // console.log('ranking failed');
              // //location.href = '/API/logout';
            });
        })
        .catch(function (error) {
          // console.log('profile failed');
          //location.href = '/API/logout';
        });
    },
    delimiters: ['[[', ']]'],
    filters: { },
    watch: {
      "rr.rank_discSelected": function(val, oldVal){
        var ss = val.split(":");
        data.rr.rank_org = ss[0];
        data.rr.rank_disc = ss[1];
      },
      "licenseFilterSelected": function(val, oldVal){

        data.filterMessage = false;

        switch (val) {
          case "all":
            data.licenses = data.licensesOrig;
            break;
          case "active":
            data.licenses = [];
            data.licensesOrig.filter(function(prov){
              var fdate = new Date(prov.date_exp);
              if(Date.now() < fdate && prov.license_status == '') {
                data.licenses.push(prov);
              }
            });
            break;
          case "expired":
            data.licenses = [];
            data.licensesOrig.filter(function(prov){
              var fdate = new Date(prov.date_exp);
              if(Date.now() > fdate && prov.license_status == '') {
                data.licenses.push(prov);
              }
            });
            break;
          case "pending":
            data.licenses = [];
            data.licensesOrig.filter(function(prov){
              if(prov.license_status == 'P') {
                data.licenses.push(prov);
              }
            });
            break;
          case "suspended":
            data.licenses = [];
            data.licensesOrig.filter(function(prov){
              if(prov.license_status == 'S') {
                data.licenses.push(prov);
              }
            });
            break;
          default:
            //do something
            //console.log(value);
        }
        if(data.licenses.length == 0) {
          data.filterMessage = true;
        }
      }
    },
    methods: {
      convertYN: function(value) {
        if(value == 'Y') {
          return 'YES';
        }
        if(value == 'N') {
          return 'NO';
        }
        return value;
      },
      rankPerc: function(you, them) {
        return '(' + ((you/them)*100).toFixed(2) + '%)';
      },
      pendReason: function(pr) {
        return pr;
      },
      friendlyDate: function (value) {
        if (!value) return ''

        value = value.toString();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today  = new Date(value);
        return today.toLocaleDateString("en-US",options);
      },
      returnToResults: function() {
        data.showRaceResults = false;
        data.showResultsRanking = true;
      },
      catFullName: function(value){
        if (!value) return ''
        value = value.toString()

        switch (value) {
          case "rd":
            return "Road";
            break;
          case "tr":
            return "Track";
            break;
          case "ot":
            return "Observed Trials";
            break;
          case "mx":
            return "Mountain Cross";
            break;
          case "mt":
            return "Mountain";
            break;
          case "ncca":
            return "NCCA";
            break;
          case "xc":
            return "Cross Country";
            break;
          case "cx":
            return "Cyclocross";
            break;
          case "dh":
            return "Downhill";
            break;
          default:
            // console.log(value);
            //do something
        }
      },
      showResults: function(value) {
        data.race_results = [];
        usacAPI2.get('/race-results/?results_race_id=' + value)
          .then(function (response) {

            if(response.data.length > 0 ) {
              data.race_results = response.data;
              data.currentResultName = response.data[0].event_name;
              data.currentResultCity = response.data[0].race_city;
              data.currentResultState = response.data[0].race_state;
              data.currentResultDate = response.data[0].race_date;
              data.showRaceResults = true;
              data.showResultsRanking = false;
            }

            if(!data.resultsError) {
              if($('.race-results-table')) {
                $('.race-results-table').footable({
                  calculateWidthOverride: function() {
                    return { width: $(window).width() };
                  }
                });
              }
            }
          })
          .catch(function (error) {
            // console.log(error);
          });
      }
    },
  });
}
