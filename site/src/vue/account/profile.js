if (document.getElementById("profile-app")) {

  const usacProapi = axios.create({
    // baseURL: 'https://ccnbikes.com/rest/v2',
    baseURL: "/API",
    timeout: 100000,
    withCredentials: false
  });

  const renewLinksApi = axios.create({
    baseURL: '/craft-api/',
    timeout: 100000,
    withCredentials: false
  });

  var data = {
    linksRenew: [],
    raceRenew: "",
    rideRenew: "",
    coachRenew: "",
    officialRenew: "",
    mechanicRenew: "",
    directorRenew: "",
    driverRenew: "",
    userProfile: [],
    hashValue: "",
    licenses: [],
    results: [],
    race_results: [],
    rankings: [],
    licensesComp: [],
    activeLicenseCount: 0,
    expiredLicenseCount: 0,
    racerDynText: "",
    licenseTabSelect: "active",
    pendSelect: "",
    currentResultName: "",
    currentResultCity: "",
    currentResultState: "",
    currentResultDate: "",
    currentHTMLText: "",
    showRaceResults: false,
    showResultsRanking: true,
    showLoader: true,
    currentState: "profile",
    activeClass: 'active',
    activeTabClass: 'is-active',
    errorClass: '',
    revealAdmin: false,
    navList: [{
        displayName: 'Profile',
        stateName: 'profile',
        licenseType: ''
      },
      {
        displayName: 'Membership & Benefits',
        stateName: 'membership',
        licenseType: ''
      },
      {
        displayName: 'Licenses',
        stateName: 'licenses',
        licenseType: ''
      },
      {
        displayName: 'Events',
        stateName: 'events',
        licenseType: ''
      },
      {
        displayName: 'Racer Links',
        stateName: 'racer',
        licenseType: 'RX'
      },
      {
        displayName: 'Event Director Links',
        stateName: 'event-director',
        licenseType: 'D'
      },
      {
        displayName: 'Club Admin',
        stateName: 'club-admin',
        licenseType: 'CLUBADMIN'
      },
      {
        displayName: 'Official Links',
        stateName: 'official',
        licenseType: 'O'
      },
      {
        displayName: 'Coach Links',
        stateName: 'coach',
        licenseType: 'C'
      },
      {
        displayName: 'Pre-Coach',
        stateName: 'pre-coach',
        licenseType: 'PRECOACH'
      },
      {
        displayName: 'Technical Support Links',
        stateName: 'technical-support',
        licenseType: 'MV'
      },
      {
        displayName: 'Admin',
        stateName: 'admin',
        licenseType: 'ADMIN'
      },
    ],
    origNav: [],
    sortedNav: []
  };
  // TODO: intergrate nav list into Craft

  var ACCTprofile = new Vue({
    el: '#profile-app',
    data: () => {
      return data;
    },
    beforeMount() {

    },
    computed: {
      orderedNav: function() {
        var _tempArr = this.navList.slice();

        _tempArr.sort(function(a, b) {
          var nameA = a.displayName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.displayName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        return _tempArr;
      }
    },
    mounted() {

      // const { Printd } = window.printd;
      // this.d = new Printd();

      this.loadProfile();

      data.hashValue = window.location.hash.toLowerCase();
      data.origNav = data.navList;

      if (data.hashValue.length > 0) {
        data.currentState = data.hashValue.replace('#', '');
      }

      switch (data.currentState) {
        case 'profile':
          //this.loadProfile();
          data.showLoader = false;
          break;
        case 'membership':
          this.loadMembership();
          break;
        case 'licenses':
          //this.loadLicenses();
          break;
        case 'racer':
          this.getContentBySlug('account-racer');
          break;
        case 'club-admin':
          this.loadClubAdmin();
          break;
        case 'official':
          this.loadOfficial();
          break;
        case 'pre-coach':
          this.loadPreCoach();
          break;
        case 'coach':
          this.loadCoach();
          break;
        case 'technical-support':
          this.loadTechnicalSupport();
          break;
        default:
          //do nothing
      }
    },
    updated() {
      // $(document).foundation.reInit('abide');
      $('.license-details').each(function(i, obj) {
        var eid = $(obj).data('id');
        $('#print-license-details-' + eid).val($(obj).html());
      });

      $('.pend-details').each(function(i, obj) {
        var eid = $(obj).data('id');
        $('#print-pend-details-' + eid).val($(obj).html());
      });

    },
    delimiters: ['[[', ']]'],
    filters: {},
    watch: {
      //Current state will always contain which section of Account
      //the user is currently viewing.
      "currentState": function(val, oldVal) {

        // data.sortedNav = [];
        // data.navList = data.origNav;
        // //Active
        // data.navList.forEach(function(element, index) {
        //   if ( element.stateName == val ) {
        //     data.sortedNav.push(element);
        //   }
        // });
        // //Active
        // data.navList.forEach(function(element, index) {
        //   if ( element.stateName != val ) {
        //     data.sortedNav.push(element);
        //   }
        // });
        //
        // data.navList = data.sortedNav;

        data.racerDynText = "";
        this.scrollToTop();
        switch (val) {
          case 'profile':
            //this.loadProfile();
            data.showLoader = false;
            break;
          case 'membership':
            this.loadMembership();
            break;
          case 'event-director':
            this.loadEventDirector();
            break;
          case 'club-admin':
            this.loadClubAdmin();
            break;
          case 'racer':
            this.getContentBySlug('account-racer');
            break;
          case 'official':
            this.loadOfficial();
            break;
          case 'pre-coach':
            this.loadPreCoach();
            break;
          case 'coach':
            this.loadCoach();
            break;
          case 'technical-support':
            this.loadTechnicalSupport();
            break;
          case 'admin':
            location.href = $('#adUrl').val();
            break;
          default:
            //do nothing
        }
      }
    },
    methods: {
      rebindVals: function() {
        // $(document).foundation.reInit('abide');
        $('.license-details').each(function(i, obj) {
          var eid = $(obj).data('id');
          $('#print-license-details-' + eid).val($(obj).html());
        });

        $('.pend-details').each(function(i, obj) {
          var eid = $(obj).data('id');
          $('#print-pend-details-' + eid).val($(obj).html());
        });
      },
      loadLicenses: function() {
        data.showLoader = true;

        if (data.licenses === undefined || data.licenses.length == 0) {

          usacProapi.get('/licenses/')
            .then(function(liscresponse) {
              // data.licenses = liscresponse;
              liscresponse.data.forEach(function(element, index) {
                Vue.set(element, 'menuActive', false);

                if (element.licensetype == 'O') {

                  //Lets set a default of no for these values.  If they are found
                  //we will use the values returned from the API.  This is structuring
                  //the data in a way thats more usable in the VIEW.
                  Vue.set(element, 'MOTOREF', "NO");
                  Vue.set(element, 'STARTER', "NO");
                  Vue.set(element, 'SECRETARY', "NO");

                  for (var key in element.categories) {
                    if (element.categories[key].MOTOREF) {
                      Vue.set(element, 'MOTOREF', element.categories[key].MOTOREF);
                    }
                    if (element.categories[key].STARTER) {
                      Vue.set(element, 'STARTER', element.categories[key].MOTOREF);
                    }
                    if (element.categories[key].SECRETARY) {
                      Vue.set(element, 'SECRETARY', element.categories[key].MOTOREF);
                    }
                  }
                }

                var timestamp = Date.parse(element.date_exp);
                if (isNaN(timestamp) == false) {
                  var dateX = new Date(element.date_exp);
                  var years = moment().diff(dateX.toISOString(), 'years');

                  if (years < 4) {
                    if (Date.now() <= new Date(element.date_exp) && element.license_status == '') {
                      data.licenses.push(element);
                      data.activeLicenseCount += 1;
                    }
                    if (element.license_status == 'P') {
                      data.licenses.push(element);
                      data.activeLicenseCount += 1;
                    }
                    if (element.license_status == 'S') {
                      data.licenses.push(element);
                    }
                    if (Date.now() > new Date(element.date_exp) && element.license_status == '') {
                      data.expiredLicenseCount += 1;
                      data.licenses.push(element);
                    }
                  }
                }
              });
              usacProapi.get('/licensescomp/?comp_id=' + data.userProfile.comp_id)
                .then(function(liccompresponse2) {


                  liccompresponse2.data.forEach(function(element, index) {
                    Vue.set(element, 'menuActive', false);
                    if (element.licensetype == 'O') {

                      //Lets set a default of no for these values.  If they are found
                      //we will use the values returned from the API.  This is structuring
                      //the data in a way thats more usable in the VIEW.
                      Vue.set(element, 'MOTOREF', "NO");
                      Vue.set(element, 'STARTER', "NO");
                      Vue.set(element, 'SECRETARY', "NO");

                      for (var key in element.categories) {
                        if (element.categories[key].MOTOREF) {
                          Vue.set(element, 'MOTOREF', element.categories[key].MOTOREF);
                        }
                        if (element.categories[key].STARTER) {
                          Vue.set(element, 'STARTER', element.categories[key].MOTOREF);
                        }
                        if (element.categories[key].SECRETARY) {
                          Vue.set(element, 'SECRETARY', element.categories[key].MOTOREF);
                        }
                      }
                    }
                  });

                  data.licensesComp = liccompresponse2.data;
                  ACCTprofile.loadRacer();
                })
                .catch(function(error) {

                });
            })
            .catch(function(error) {

            });
        }

        data.showLoader = false;
      },
      formatPhone: function(val) {
        if (!val) {
          return "";
        }
        var USNumber = val.match(/(\d{3})(\d{3})(\d{4})/);
        USNumber = "(" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];

        return USNumber;
      },
      loadProfile: function() {
        if (data.userProfile === undefined || data.userProfile.length == 0) {
          usacProapi.get('/profile/')
            .then(function(profile) {
              data.userProfile = profile.data;


              if (data.userProfile.is_admin == "Y") {
                data.revealAdmin = true;
              }
              if (data.userProfile.code == 401 || !data.userProfile.comp_id) {
                location.href = '/API/logout';
              }

              ACCTprofile.waiverCheck();

            })
            .catch(function(error) {

            });
        }
      },
      catFullName: function(value) {
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
            return "Collegiate";
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

      getRenewLink: function(type) {
        renewLinksApi.get('renew-links.json')
          .then((response) => {
            data.linksRenew = response.data;
            data.raceRenew = response.data.data[0].race;
            data.rideRenew = response.data.data[0].ride;
            data.officialRenew = response.data.data[0].official;
            data.coachRenew = response.data.data[0].coach;
            data.mechanicRenew = response.data.data[0].mechanic;
            data.directorRenew = response.data.data[0].director;
            data.driverRenew = response.data.data[0].driver;
          })
        switch (type) {
          case "X":
            return data.rideRenew;
            break;
          case "O":
            return data.officialRenew;
            break;
          case "C":
            return data.coachRenew;
            break;
          case "M":
            return data.mechanicRenew;
            break;
          case "D":
            return data.directorRenew;
            break;
          case "V":
            return data.driverRenew;
            break;
          default:
            return data.raceRenew;
        }
      },
      getCatUpgrade: function(type) {
        switch (type) {
          case "ncca":
            return "https://legacy.usacycling.org/myusac/index.php?pagename=upgradedowngrade&type=ncca&compid=" + data.userProfile.comp_id;
            break;
          case "intlracer":
            return "https://legacy.usacycling.org/myusac/index.php?pagename=upgradedowngrade&type=intlracer&compid=" + data.userProfile.comp_id;
            break;
          case "usaracer":
            return "https://legacy.usacycling.org/myusac/index.php?pagename=upgradedowngrade&type=usaracer&compid=" + data.userProfile.comp_id;
            break;
          default:
            return "";
        }
      },
      loadRacer: function() {
        data.showLoader = true;
        this.getContentBySlug('account-racer');
        usacProapi.get('/user-results/')
          .then(function(uresultsresponse) {
            if (uresultsresponse.data.length > 0) {
              data.results = uresultsresponse.data;
              data.showLoader = false;

            } else {

            }

          })
          .catch(function(error) {

          });

        usacProapi.get('/ranking/?comp_id=' + data.userProfile.comp_id)
          .then(function(nextresponse) {
            if (nextresponse.data[0]) {
              data.rankings = nextresponse.data[0];
              //Populate the WYSIWYG craft data onto the page.
            }
          })
          .catch(function(error) {

          });

        data.showLoader = false;
      },
      loadMembership: function() {
        data.showLoader = true;
        var slugConvert = data.userProfile.memberships[0].membership.toLowerCase();
        var output = slugConvert.replace(/ /g, '-');
        var output2 = output.replace('($', '-');
        var output3 = output2.replace(')', '');

        this.getContentBySlug('account-membership-' + output3);
        data.showLoader = false;
      },
      loadEventDirector: function() {
        this.getContentBySlug('account-director');
      },
      loadClubAdmin: function() {
        this.getContentBySlug('account-club-admin');
      },
      loadOfficial: function() {
        this.getContentBySlug('account-official');
      },
      loadPreCoach: function() {
        this.getContentBySlug('account-pre-coach');
      },
      loadCoach: function() {
        this.getContentBySlug('account-coach');
      },
      loadTechnicalSupport: function() {
        this.getContentBySlug('account-technical-support');
      },
      getStatus: function(item) {
        if (Date.now() <= new Date(item.date_exp) && item.license_status == '') {
          return "active"
        }
        if (Date.now() > new Date(item.date_exp) && item.license_status == '') {
          return "expired";
        }
        if (item.license_status == 'P') {
          return "pending";
        }
        return "";
      },
      renewStatus: function(item) {
        var now = moment().format('YYYY-MM-DD');
        var expireDate = moment(item.date_exp).format('YYYY-MM-DD');
        var renewDate = moment(expireDate).subtract(31, 'days').format('YYYY-MM-DD');
        if (now >= renewDate && item.license_status == '') {
          return "renew";
        }
        return "";
      },
      outputStatus: function(item) {
        if (Date.now() <= new Date(item.date_exp) && item.license_status == '') {
          return "Active"
        }
        if (Date.now() > new Date(item.date_exp) && item.license_status == '') {
          return "Expired";
        }
        if (item.license_status == 'P') {
          return "Pending";
        }
        return "";
      },
      showResults: function(value) {
        data.race_results = [];
        usacProapi.get('/race-results/?results_race_id=' + value)
          .then(function(response) {

            if (response.data.length > 0) {
              data.race_results = response.data;
              data.currentResultName = response.data[0].event_name;
              data.currentResultCity = response.data[0].race_city;
              data.currentResultState = response.data[0].race_state;
              data.currentResultDate = response.data[0].race_date;
              data.showRaceResults = true;
              data.showResultsRanking = false;
              $('html,body').animate({
                scrollTop: $(".race-results-tab").offset().top
              }, 'slow');
            }
          })
          .catch(function(error) {
            // console.log(error);
          });
      },
      checkNavOption: function(licenseType) {
        var isPresent = false;
        var cAdminPresent = false;

        if (licenseType.length == 0) {
          return true;
        }

        data.licenses.forEach(function(element, index) {
          if (element.licensetype.includes(licenseType)) {
            isPresent = true;
          }
          if (licenseType == "RX" && element.licensetype == "") {
            isPresent = true;
          }
        });

        if (licenseType == "ADMIN") {
          if (data.userProfile.is_admin == "Y") {
            isPresent = true;
          } else {
            isPresent = false;
          }
        }
        if (licenseType == "CLUBADMIN") {
          if (data.userProfile.club_admin == "Y") {
            isPresent = true;
          } else {
            isPresent = false;
          }
        }
        if (licenseType == "PRECOACH") {
          if (data.userProfile.pre_coach == "Y") {
            isPresent = true;
          } else {
            isPresent = false;
          }
        }

        return isPresent;
      },
      friendlyDate: function(value) {
        if (!value) return ''

        value = value.toString();
        var options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        var today = new Date(value);
        return today.toLocaleDateString("en-US", options);
      },
      rankPerc: function(you, them) {
        return '(' + ((you / them) * 100).toFixed(2) + '%)';
      },
      returnToResults: function() {
        data.showRaceResults = false;
        data.showResultsRanking = true;
      },
      printDiv: function(divName, title, exp) {

        var licenseDetails = $(divName).html();

        // axios({
        //   method: 'post',
        //   url: '/API/print-license',
        //   data: "test",
        //   config: { headers: {'Content-Type': 'multipart/form-data' }}
        //   })
        //   .then(function (response) {
        //       //handle success
        //       console.log(response);
        //   })
        //   .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //   });


        // $(divName).print();
        // $(divName).print({
        //   globalStyles: true,
        //   mediaPrint: false,
        //   stylesheet: null,
        //   noPrintSelector: ".no-print",
        //   iframe: true,
        //   append: null,
        //   prepend: null,
        //   manuallyCopyFormValues: true,
        //   deferred: $.Deferred(),
        //   timeout: 750,
        //   title: null,
        //   doctype: '<!doctype html>'
        // });
      },
      getContentBySlug: function(slug) {
        data.racerDynText = "";

        axios.get('/inc/account/ajax/content?c=' + slug)
          .then(function(response) {
            data.racerDynText = response.data;
            return response.data;
          })
          .catch(function(error) {
            return "";
          });
      },
      scrollToTop: function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      waiverCheck: function() {

        usacProapi.get('/waiver/?xfg=293381')
          .then(function(response) {
            if (response.data == "" || response.data.detail == "Invalid username/password.") {

              ACCTprofile.loadLicenses();
            } else {
              location.href = "/waivers";
            }
          })
          .catch(function(error) {

          });
      },
      convertYN: function(value) {
        if (value == 'Y') {
          return 'YES';
        }
        if (value == 'N') {
          return 'NO';
        }
        return value;
      },
      getAge: function(value) {
        var dt = new Date(value);

        var tmpOut = (dt.getFullYear() - 1) + '-12-31';
        var years = moment().diff(tmpOut, 'years');
        return years;
      },
      getGender: function(value) {
        if (value == 'M') {
          return 'Male';
        } else if (value == 'F') {
          return 'Female';
        } else {
          return 'N/A';
        }
      },
      getExpiry: function(value) {
        if (value.memberships != null && value.memberships != undefined) {
          if (value.memberships.length > 0) {
            return value.memberships[0].expiry;
          }
        }
        return "N/A";
      },
      pendFilter: function(currentMenu) {
        if (data.pendSelect == currentMenu) {
          data.pendSelect = "";
        } else {
          data.pendSelect = currentMenu;
        }
      }
    },
  });
}
