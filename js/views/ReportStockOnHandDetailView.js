define(["i18n!nls/labels", "Backbone", "tpl", "BaseView"], function (i18n, Backbone, tpl, BaseView) {

    var ReportOrderStatusDetailView = BaseView.extend({

        initialize: function (option) {
            this.template = _.template(tpl.get('report-stock-onhand-detail'));
          
            this.detail = option.detail;
            this.SiteID = option.siteid;
            this.list = option.list[0];
        },

        events: {          
            "click .go-back": "goBack" 
        },

        render: function () {
            $(this.el).html(this.template({
				i18n: i18n, 
				detail : this.detail, 
				SiteID : this.SiteID, 
				list: this.list
			}));
                                  
            return this;
        }
    });

    return ReportOrderStatusDetailView;
});