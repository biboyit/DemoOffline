// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView"], function (i18n, Backbone, tpl, BaseView) {

    // Extends Backbone.View
    var ReportView = BaseView.extend({

        // The View Constructor
        initialize: function () {          
            this.template = _.template(tpl.get('report'));        
        },

        events: {           
            "click .hamburger-action": "slidingMenu",
            "click #hamburger": "slidingMenu",
            "click #hamburger-overlay": "slidingMenu"
        },      
      
        render: function (eventName) {
            $(this.el).html(this.template({
				i18n: i18n
			}));
          
            return this;
        }

    });

    return ReportView;
});