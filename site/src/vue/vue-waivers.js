if(document.getElementById("waiver-app")){
  const usacWVapi = axios.create({
    // baseURL: 'https://ccnbikes.com/rest/v2',
    baseURL: "/API",
    timeout: 100000,
    withCredentials: false
  });

  var data = {
    waiverContent: [],
    waiverID: "",
    user_account: [],
    user_age: 0
  };

  var wv = new Vue({
    el: '#waiver-app',
    data: () => {
      return data;
    },
    beforeMount() {

    },
    mounted() {
      axios.get('/API/waiver/?xfg=293381')
        .then(function (response) {

          if(response.length == 0) {
            location.href = "/account";
          }
          data.waiverContent = response.data[0];
          data.waiverID  = response.data[0].id;
          //Get Profile
          axios.get('/API/profile/')
            .then(function (presponse) {
              data.user_account = presponse.data;
              data.user_age = wv.calculateAge(presponse.data.dob);
              if(data.user_age < 19) {
                $('#waiver-data-form').hide();
                $('#waiver-underage').show();
              }
              $('#waiver-data-form').foundation();
            })
            .catch(function (error) {
              //location.href = '/API/logout';
            });
        })
        .catch(function (error) {

        });
        // $('#waiver-data-form').foundation();
        // Foundation.reInit('abide')
        // Foundation.reInit($('#waiver-data-form'));

    },
    updated() {
      // $(document).foundation.reInit('abide');
    },
    delimiters: ['[[', ']]'],
    filters: { },
    watch: {

    },
    methods: {
      formatHTML: function(html) {
        if(html != null && html != undefined) {
          html = html.replace(new RegExp('\r?\n','g'), '<br />');
        }
        return html;
      },
      calculateAge: function(birthday) {
        var years = moment().diff(birthday, 'years');
        return years;
      }
    },
  });
}
