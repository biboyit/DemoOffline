define(["Backbone", "BaseCollection", "models/ReportStockOnHandModel", "config"], function (Backbone, BaseCollection, ReportStockOnHandModel, cfg) {

    var ReportStockOnHandCollection = BaseCollection.extend({

        initialize: function (options) {
            options || (options = {});
            this.SiteID = options.SiteID;
            this.InvtID = options.InvtID;

            BaseCollection.prototype.initialize.call(this, options)
        },

        model: ReportStockOnHandModel,

        urlRoot: 'ReportStockOnHand',

        url: function () {            
           return cfg.getServiceUrl(this.urlRoot,'SiteID=' + this.SiteID + '&InvtID=' + this.InvtID);
        },
       
    });

    return ReportStockOnHandCollection;

});