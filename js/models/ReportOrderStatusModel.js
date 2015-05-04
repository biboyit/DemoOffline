define(["Backbone", "BaseModel", "config"], function (Backbone, BaseModel, cfg) {

    // The Model constructor
    var ReportOrderStatusModel = BaseModel.extend({

        urlRoot: "ReportOrderStatus",

        url: function () {
            return cfg.getServiceUrl(this.urlRoot, "CustomerId=" + this.id);
        }       
    });

    // Returns the Model class
    return ReportOrderStatusModel;
});