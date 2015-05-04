
define(["Backbone", "BaseModel", "config"], function (Backbone, BaseModel, cfg) {

    // The Model constructor
    var ProductModel = BaseModel.extend({

        urlRoot: "product",

        url: function (InvtID) {
            return cfg.getServiceUrl(this.urlRoot, "InvtID=" + this.id);
        }
      
    });

    // Returns the Model class
    return ProductModel;
});