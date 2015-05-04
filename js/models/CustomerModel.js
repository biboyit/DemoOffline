define(["Backbone", "BaseModel"], function (Backbone, BaseModel) {

    // The Model constructor
    var CustomerModel = BaseModel.extend({

        urlRoot: "Customer"
        
    });

    // Returns the Model class
    return CustomerModel;
});