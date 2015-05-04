define(["Backbone", "BaseModel", "config"], function (Backbone, BaseModel, cfg) {

    // The Model constructor
    var ReportStockOnHandModel = BaseModel.extend({

        urlRoot: "ReportStockOnHandModel"

      
    });

    // Returns the Model class
    return ReportStockOnHandModel;
});