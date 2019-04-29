// Initialize the RedactorPlugins object if it doesn't exist
if ( !RedactorPlugins ) { var RedactorPlugins = {}; }

// fontcolor
RedactorPlugins.fontcolor = function()
{
    return {
        init: function()
        {
            var colors = ['#E0E5E5','#B8BFC2','#4A4A4A','#0a0a0a','#fefefe','#031E41','#d60b30'];


            var $button = this.button.add('fontcolor', 'Text Color');
            this.button.setIcon($button, '<i class="re-icon-fontcolor"></i>');

            var $dropdown = this.button.addDropdown($button);
            $dropdown.attr('rel', 'fontcolor');
            $dropdown.width(242);

            var $selector = $('<div style="overflow: hidden; text-align: center;">');
            var $selectorText = $('<span rel="text" class="re-dropdown-box-selector-font" style="background: #eee; float: left; padding: 8px 0; cursor: pointer; font-size: 12px; width: 100%;">Text</span>');
            //var $selectorBack = $('<span rel="back" class="re-dropdown-box-selector-font" style="float: left; padding: 8px 0; cursor: pointer; font-size: 12px; width: 50%;">Highlight</span>');

            $selector.append($selectorText);
            //$selector.append($selectorBack);

            $dropdown.append($selector);

            this.fontcolor.buildPicker($dropdown, 'textcolor', colors);
            //this.fontcolor.buildPicker($dropdown, 'backcolor', colors);

            $selectorText.on('mousedown', function(e)
            {
                e.preventDefault();

                $dropdown.find('.re-dropdown-box-selector-font').css('background', 'none');
                //$dropdown.find('.re-dropdown-box-backcolor').hide();
                $dropdown.find('.re-dropdown-box-textcolor').show();

                $(this).css('background', '#eee');
            });

            //$selectorBack.on('mousedown', function(e)
            //{
            //    e.preventDefault();
            //
            //    $dropdown.find('.re-dropdown-box-selector-font').css('background', 'none');
            //    $dropdown.find('.re-dropdown-box-textcolor').hide();
            //    $dropdown.find('.re-dropdown-box-backcolor').show();
            //
            //    $(this).css('background', '#eee');
            //});

        },
        buildPicker: function($dropdown, name, colors)
        {
            var $box = $('<div class="re-dropdown-box-' + name + '">');
            var rule = (name == 'backcolor') ? 'background-color' : 'color';
            var len = colors.length;
            var self = this;
            var func = function(e)
            {
                e.preventDefault();
                self.fontcolor.set($(this).data('rule'), $(this).attr('rel'));
            };

            for (var z = 0; z < len; z++)
            {
                var color = colors[z];

                var $swatch = $('<a rel="' + color + '" data-rule="' + rule +'" href="#" style="float: left; box-sizing: border-box; font-size: 0; border: 2px solid #fff; padding: 0; margin: 0; width: 22px; height: 22px;"></a>');
                $swatch.css('background-color', color);
                $swatch.on('mousedown', func);

                $box.append($swatch);
            }

            var $elNone = $('<a href="#" style="display: block; clear: both; padding: 8px 5px; box-sizing: border-box; font-size: 12px; line-height: 1;"></a>').html(this.lang.get('none'));
            $elNone.on('mousedown', $.proxy(function(e)
            {
                e.preventDefault();
                this.fontcolor.remove(rule);

            }, this));

            $box.append($elNone);
            $dropdown.append($box);

            if (name == 'backcolor')
            {
                $box.hide();
            }
        },
        set: function(rule, type)
        {
            this.inline.format('span', 'style', rule + ': ' + type + ';');
            this.dropdown.hide();
        },
        remove: function(rule)
        {
            this.inline.removeStyleRule(rule);
            this.dropdown.hide();
        }
    };

};