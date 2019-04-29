// Initialize the RedactorPlugins object if it doesn't exist
if ( !RedactorPlugins ) { var RedactorPlugins = {}; }

// clips
RedactorPlugins.clips = function()
{
    return {
        init: function()
        {
            var items = [
                ['Athlete Table', '<div class="experience-table"><img src="/images/olympicrings.png"/><h2 class="main-title">Title</h2><div class="grid-x grid-padding-x"><div class="cell medium-6"><table class="unstriped"><tbody><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div><div class="cell medium-6"><table class="unstriped"><tbody><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></tbody></table></div></div></div>'],
                ['Membership Landing Table', '<div class="membership-landing-table"><div class="grid-x grid-padding-x"><div class="cell small-12 medium-12 large-6 border-right"><div class="membership-h1">Ride</div><div class="membership-h2">Membership Features</div><div class="membership-feature-list"><ul><li>$25,000 supplemmental event insurance at fun rides, fondos, and gravel rides</li><li>24/7 roadside assistance</li><li>Limited edition t-shirt</li><li>USA cycling phone pouch and decal</li><li>12-month subscription from our partners at Bike Law</li><li>Partner discounts with Volkswagen, Training Peaks, Bike Flights, and more</li><li>Support USA Cycling</li></ul></div><div class="optional-features"><div class="optional-features-title">Optional Features</div><ul><li>Limited edition USA Cycling kit</li><li>10% off in the USA Cycling store</li></ul></div><a href="/membership/ride"><div class="get-membership-cta">Get a Ride Membership</div></a></div><div class="cell small-12 medium-12 large-6"><div class="membership-h1">Race</div><div class="membership-h2">Membership Features</div><div class="membership-feature-list"><ul><li>Unlimited USA Cycling racing</li><li>$25,000 supplemmental event insurance at races</li><li>Legal assistance from our partners at Bike Law</li><li>Partner discounts with Volkswagen, Training Peaks, Bike Flights, and more</li><li>Support USA Cycling</li></ul> </div><div class="optional-features"><div class="optional-features-title">Optional Features</div><ul><li>$25,000 supplemmental event insurance at fun rides, fondos, and gravel rides</li><li>24/7 roadside assistance</li><li>Limited edition USA Cycling kit</li><li>Limited edition t-shirt</li><li>USA cycling phone pouch and decal</li><li>12-month subscription to Bicycling Magazine</li><li>10% off in the USA Cycling store</li></ul></div><a href="/membership/race"><div class="get-membership-cta">Get a Race Membership</div></a></div></div></div>'],
                ['What Your Membership Supports','<div class="membership-support"><div class="usac-badge"><img src="/images/USACycling_Logo.png"/></div><div class="membership-support-title">What Your Membership Supports</div><div class="container"><div class="item"><div class="sub-title">Grow</div><div class="detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus, nibh a consectetur dignissim, augue quamvulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.  Sliad yues garher merse boure bouln louou woeruoi lmonouowe augue quam vulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.</div></div><div class="item"><div class="sub-title">Develop</div><div class="detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus, nibh a consectetur dignissim, augue quamvulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.  Sliad yues garher merse boure bouln louou woeruoi lmonouowe augue quam vulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.</div></div><div class="item"><div class="sub-title">Protect</div><div class="detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus, nibh a consectetur dignissim, augue quamvulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.  Sliad yues garher merse boure bouln louou woeruoi lmonouowe augue quam vulputate billy baonr roread lnad ouew ante, at consequat ipsum felis non felis.</div></div></div></div>'],
                ['Membership Comparison Table', '<div class="which_membership"><div class="which_membership_title">Which Ride Membership is Right for You?</div><div class="which_membership_subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div><table><tr><td class="image-cell"><image src="/images/USACycling_Logo.png"/></td><td><div class="beginners-fav">Beginner\'s Favorite</div><div class="col-head-title">Race</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Podium</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Podium Plus</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Ride</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Ride Plus</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Off-Road Ride</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td><td><div class="col-head-title">Off-Road Ride Plus</div><div class="col-head-subtitle">Enthusiast Cyclists</div><div class="col-head-price"><span class="usd">$</span>XXX</div><div class="col-head-per">/a year</div></td></tr><tr><td class="row-feature">Partner discounts with Volkswagen, Training Peaks, Bike Flights, and more<img class="info-icon" src="/images/info_icon.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td></tr><tr><td class="row-feature">Legal assistance from our partners at Bike Law<img class="info-icon" src="/images/info_icon.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td></tr><tr><td class="row-feature">Support for USA Cycling<img class="info-icon" src="/images/info_icon.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td></tr><tr><td class="row-feature">$25,000 supplemental medical insurance at all USA Cycling races<img class="info-icon" src="/images/info_icon.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td></td><td></td><td></td><td></td></tr><tr><td class="row-feature">$25,000 supplemental medical insurance at events<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td></td><td></td></tr><tr><td class="row-feature">24/7 roadside assistance<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td></td><td></td></tr><tr><td class="row-feature">Helivac and liability insurance<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td></td><td></td><td></td><td></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td></tr><tr><td class="row-feature">Limited edition USA Cycling T-shirt, phone pouch and decal<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td></td><td></td></tr><tr><td class="row-feature">12-month subscription to Bicycling magazine<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td><img src="/images/red_check.png"/></td><td></td><td></td></tr><tr><td class="row-feature">Limited edition USA Cycling jersey by ASSOS, value $129<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td></td><td><img src="/images/red_check.png"/></td><td></td><td><img src="/images/red_check.png"/></td><td></td><td></td></tr><tr><td class="row-feature">Limited edition USA Cycling off-road jersey<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td></td><td></td><td></td><td></td><td></td><td><img src="/images/red_check.png"/></td></tr><tr><td class="row-feature">10% off in the USA Cycling store<img class="info-icon" src="/images/info_icon.png"/></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td class="black-cell"></td><td colspan="7"><a class="cta button large secondary hero-cta" href="/join">Join Today</a></td></tr></table></div>']
            ];

            this.clips.template = $('<ul id="redactor-modal-list">');

            for (var i = 0; i < items.length; i++)
            {
                var li = $('<li>');
                var a = $('<a href="#" class="redactor-clips-link">').html(items[i][0]);
                var div = $('<div class="redactor-clips">').hide().html(items[i][1]);

                li.append(a);
                li.append(div);
                this.clips.template.append(li);
            }

            this.modal.addTemplate('clips', '<div class="modal-section">' + this.utils.getOuterHtml(this.clips.template) + '</div>');

            var button = this.button.add('clips', 'Clips');
            this.button.setIcon(button, '<i class="re-icon-clips"></i>');
            this.button.addCallback(button, this.clips.show);

        },
        show: function()
        {
            this.modal.load('clips', 'Insert Clips', 500);

            $('#redactor-modal-list').find('.redactor-clips-link').each($.proxy(this.clips.load, this));

            this.modal.show();
        },
        load: function(i,s)
        {
            $(s).on('click', $.proxy(function(e)
            {
                e.preventDefault();
                this.clips.insert($(s).next().html());

            }, this));
        },
        insert: function(html)
        {
            this.buffer.set();
            this.air.collapsedEnd();
            this.insert.html(html);
            this.modal.close();
        }
    };


};
