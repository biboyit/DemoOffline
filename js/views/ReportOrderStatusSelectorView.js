define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/ReportOrderStatusListView"], function (i18n, Backbone, tpl, BaseView, ReportOrderStatusListView) {

    var ReportOrderStatusSelectorView = BaseView.extend({

        initialize: function (option) {
            this.template = _.template(tpl.get('report-order-status-selector'));
            this.model = option.model;
            this.custid = option.custid;
            this.custname = option.custname;
        },

        events: {  
            "click .go-back": "goBack"         
        },

        render: function () {
            $(this.el).html(this.template({
				i18n: i18n, 
				CustomerName: this.custname, 
				CustomerID: this.custid 
			}));
            console.log(this.model);
            this.listView = new ReportOrderStatusListView({ el: $('#ReportOrderStatusList', this.el), model: this.model });
            this.listView.render();
            return this;
        }
    });

    return ReportOrderStatusSelectorView;
});