
define(["Backbone", "tpl"], function (Backbone, tpl) {

	var BaseView = Backbone.View.extend({

		initialize: function (options) {
			if(this.viewTemplate)
				this.template = _.template(tpl.get(this.viewTemplate));			
			

		},
		
		 events: {           
		     "click .go-back": "goBack"
        },

        goBack: function(e){
        	e.preventDefault();
        	console.log('goBack');
        	window.history.back();
        },

        slidingMenu: function (e) {
            e.preventDefault();
            var action = $('.hamburger-action'),
                hamburger = $('#hamburger'),
                content = $('#content'),
                overlay = $('#hamburger-overlay'),
                nav = $('nav');

            var contentWidth = content.width(),
                current = nav.css('left'),
                val = '0%',
                layer = 'block',
                opacity = 0.5,
                ham = -5;

            content.css('width', contentWidth);
            if (current === '0px') {
                val = '-70%';
                layer = 'none';
                opacity = 0;
                ham = 0;
            } else {
                overlay.css('display', layer);
            }

            nav.animate({ 'left': [val] }, {
                duration: 300
            });

            hamburger.animate({ 'left': [ham] }, {
                duration: 200
            });

            overlay.animate({ 'opacity': [opacity] }, {
                duration: 300,
                complete: function () {
                    overlay.css('display', layer);
                }
            });
        }


	});



	return BaseView;

});