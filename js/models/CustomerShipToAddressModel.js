define(["Backbone", "BaseModel", "config"], function (Backbone, BaseModel, cfg) {

    // The Model constructor
    var CustomerShipToAddressModel = BaseModel.extend({

        initialize: function (options) {
            options || (options = {});
            this.headerId = options.headerId;
            this.customerId = options.customerId;

            BaseModel.prototype.initialize.call(this, options)
        },

        urlRoot: 'CustomerShipToAddress',

        url: function () {
            var qs = "HeaderId=" + this.headerId;
            if (this.customerId && this.CustomerId != "")
                qs += "&CustomerID=" + this.customerId;
            return cfg.getServiceUrl(this.urlRoot, qs);
        }

    });

    // Returns the Model class
    return CustomerShipToAddressModel;

});