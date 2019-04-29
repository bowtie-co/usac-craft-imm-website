var ul,
    UserLogin = {
        settings: {
            username: "",
            password: "",
            tokenData: "",
            progressID: "",
            waivers: []
        },
        init: function() {
            ul = this.settings;
            this.bindUIActions();

        },
        bindUIActions: function() {
          var red_url = UserLogin.getParameterByName('Return_URL');
          if(document.getElementById("login-form")){
            axios.get('/API/profile/')
              .then(function (response) {
                if(response.data.first_name) {
                  // if(UserLogin.waiversPresent()) {
                  //   location.href = "/waivers";
                  // }
                  if(red_url) {
                    location.href = red_url;
                  }
                  else {
                    location.href = "/account";
                  }
                }
              })
              .catch(function (error) {

              });
              $('input').keypress(function (e) {
                if (e.which == 13) {
                  e.preventDefault();
                  UserLogin.loginUser();
                  return false;    //<---- Add this line
                }
              });
          }

          $(document).on('invalid.zf.abide', function (e) {
            $('.login-progress').hide();
          });

          $(".btn-login-action").on("click",function(e){
            e.preventDefault();
            UserLogin.loginUser();
          });
        },
        waiversPresent: function() {
          axios.get('/API/waiver/?xfg=293381')
            .then(function (response) {
              if(response.data[0].id == "" || response.data[0].id == undefined || response.data.detail == "Invalid username/password.") {
                return false;
              }
              else {
                location.href = "/waivers";
                return true;
              }
            })
            .catch(function (error) {
              return false;
            });
        },
        loginUser: function() {
          var red_url = UserLogin.getParameterByName('Return_URL');
          $('.log-in-form').foundation('validateForm');

          UserLogin.username = $("#username").val();
          UserLogin.password = $("#password").val();

          $('.error-msg').hide();
          $('.error-msg').html("");

          $('.btn-search-text').toggleClass('active');
          $('.loader').toggleClass('active');

          $.ajax({
            method: "POST",
            url: "./API/login/",
            xhrFields: {
              withCredentials: false
            },
            data: { username: UserLogin.username, password: UserLogin.password }
          })
          .done(function( response ) {
            var oj = JSON.parse(response);
            if(oj.access_token) {
              if(UserLogin.waiversPresent() == true) {
              }
              else if(red_url) {
                location.href = red_url;
              }
              else {
                location.href = "/account";
              }
            }
            else {
              $('.btn-search-text').toggleClass('active');
              $('.loader').toggleClass('active');
              $('.error-msg').html('Invalid username and/or password.');
              $('.error-msg').show();
            }
          })
          .fail(function(){
            $('.loader').toggleClass('active');
            $('.btn-search-text').toggleClass('active');
            $('.error-msg').html('Invalid username and/or password.');
            $('.error-msg').show();
          });
        },
        getParameterByName: function(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    };
