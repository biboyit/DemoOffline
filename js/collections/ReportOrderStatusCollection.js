define(["Backbone", "BaseCollection", "models/ReportOrderStatusModel", "config"], function (Backbone, BaseCollection, ReportOrderStatusModel, cfg) {

    var ReportOrderStatusCollection = BaseCollection.extend({

        initialize: function (options) {
            options || (options = {});
            this.OrderNbr = options.OrderNbr;
            this.id = options.id;

            BaseCollection.prototype.initialize.call(this, options)
        },

        model: ReportOrderStatusModel,

        urlRoot: 'ReportOrderStatus',

        url: function () {            
           return cfg.getServiceUrl(this.urlRoot, (this.OrderNbr == '') ? "CustomerId=" + this.id : 'OrderNbr=' + this.OrderNbr);
        },

        fetchAndReset: function (method) {
            var self = this;
            return this.fetch({
                success: function (data) {
                    console.log("ReportOrderStatusCollection." + method + " success: " + data.models.length);
                    self.reset(data.models);
                },
                error: function () { console.log(arguments); }
            });
        },

        getReportByOrderNbr: function (orderNbr) {
            this.OrderNbr = orderNbr;
            return this.fetchAndReset("getReportByOrderNbr(" + orderNbr + ")");
        },

        getReportByCustomerID: function (customerID) {
            this.id = customerID;
            this.OrderNbr = '';
            return this.fetchAndReset("getReportByCustomerID(" + customerID + ")");
        }
    });

    return ReportOrderStatusCollection;

});