define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/ReportOrderStatusDetailListView", "views/ReportOrderStatusStatusListView"], function (i18n, Backbone, tpl, BaseView, ReportOrderStatusDetailListView, ReportOrderStatusStatusListView) {

    var ReportOrderStatusDetailView = BaseView.extend({

        initialize: function (option) {
            this.template = _.template(tpl.get('report-order-status-detail'));
          
            this.detail = option.detail;
            this.total = option.total;
            this.statusUpdate = option.statusUpdate;
            
            if (this.total == null) {
                this.total = { 'TotalPrice': '', 'TotalQty': '', 'OrderNbr': '' };
            }
            
        },

        events: { 
            "click .go-back": "goBack"          
        },

        render: function () {
            $(this.el).html(this.template({ 
				i18n: i18n, 
				detail: this.detail, 
				total: this.total
			}));

            this.listView = new ReportOrderStatusDetailListView({ el: $('ul#OrderDetailList', this.el), model: this.detail });
            this.listView.render();

            this.statusListView = new ReportOrderStatusStatusListView({ el: $('ul#OrderStatusList', this.el), model: this.statusUpdate });
            this.statusListView.render();

            return this;

            
        }
    });

    return ReportOrderStatusDetailView;
});