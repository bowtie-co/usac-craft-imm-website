var ac,
    Account = {
        settings: {

        },
        init: function() {
            ac = this.settings;
            this.bindUIActions();
        },
        bindUIActions: function() {

          var messageState = this.readCookie('closed-message');

          if(messageState == 'closed') {
            $('#important-message').hide();
          }
          else {
            $('#important-message').show();
          }

          var messageState2 = this.readCookie('waiver-message');

          if(messageState2 == 'closed') {
            $('#important-message2').hide();
          }
          else {
            $('#important-message2').show();
          }

          $('.close-message2').on('click',function(){
            Account.setCookie('waiver-message', 'closed', 365);
            $('#important-message2').hide();
          });

          $('.close-message').on('click',function(){
            Account.setCookie('closed-message', 'closed', 365);
            $('#important-message').hide();
          });

          var tabName = Account.getParameterByName('tab');

          $('ul.tabs li').click(function(){
        		var tab_id = $(this).attr('data-tab');

            if(tab_id == 'tab-3') {
              Account.openNewTab('https://legacy.usacycling.org/myusac/index.php?pagename=mypage');
              return false;
            }

        		$('ul.tabs li').removeClass('current');
        		$('.tab-content').removeClass('current');

        		$(this).addClass('current');
        		$("#"+tab_id).addClass('current');
        	});
          $('.expand-profile').on('click', function() {
              if($('.user-panel').hasClass('active')) {
                $('.user-panel').removeClass('active');
                $('.expand-profile').html('+&nbsp;Expand Profile Details');
              }
              else {
                $('.user-panel').addClass('active');
                $('.expand-profile').html('-&nbsp;Collapse Profile Details');
              }

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
        },
        openNewTab: function(url) {
          var win = window.open(url, '_blank');
          win.focus();
        },
        setCookie: function(cookieName, cookieValue, nDays) {
          var today = new Date();
          var expire = new Date();

          if (!nDays)
              nDays=1;

          expire.setTime(today.getTime() + 3600000*24*nDays);
          document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
        },
        readCookie: function(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        }
    };
