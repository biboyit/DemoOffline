define(["Backbone", "models/CustomerShipToAddressModel", "config"], function (Backbone, CustomerShipToAddressModel, cfg) {



    var CustomerShipToAddressCollection = Backbone.Collection.extend({



        model: CustomerShipToAddressModel,



        url: cfg.getServiceUrl('CustomerShipToAddress'),



        initialize: function (id) {

            console.log(this.url + "?headerid=" + id.id);

            this.url = this.url + "?headerid=" + id.id;

        }

    });



    return CustomerShipToAddressCollection;



});