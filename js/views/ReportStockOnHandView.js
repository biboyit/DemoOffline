// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "config"], function (i18n, Backbone, tpl, BaseView, cfg) {

    // Extends Backbone.View
    var ReportStockOnHandView = BaseView.extend({

        initialize: function (options) {
            this.router = options.router;
            this.model = options.model;
            this.template = _.template(tpl.get('report-stock-onhand'));
        },

        events: {           
            "click #btnNext": "searchProduct",
            "click .go-back": "goBack" 
        },      
      
        render: function (eventName) {   
          
            $(this.el).html(this.template({
				i18n: i18n, 
				sites: this.model
			}));

            return this;
        },

        searchProduct: function () {
            
            var search = $(this.el).find("#description").val()
            var siteid = $(this.el).find("#SiteID").val();

            if (search.length == 0)
                cfg.showAlert(i18n.message.stockCannotBeEmpty, null, i18n.message.error, i18n.button.oK);
            else
                this.router.navigate("reportstockonhandfind/" + siteid + '/' + search, { trigger: true });
        }

    });

    return ReportStockOnHandView;
});