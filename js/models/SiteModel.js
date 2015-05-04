define(["Backbone", "BaseModel"], function (Backbone, BaseModel) {

    // The Model constructor
    var SiteModel = BaseModel.extend({

        urlRoot: "site",

    });

    // Returns the Model class
    return SiteModel;

});