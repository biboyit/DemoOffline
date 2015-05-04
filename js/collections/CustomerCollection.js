define(["Backbone", "BaseCollection", "models/CustomerModel", "config"], function (Backbone, BaseCollection, CustomerModel, cfg) {

    var CustomerCollection = BaseCollection.extend({
        
        model: CustomerModel,

        urlRoot: 'customer',
       
        url: function () {      
            return cfg.getServiceUrl(this.urlRoot);
        }

       
    });

    return CustomerCollection;

});