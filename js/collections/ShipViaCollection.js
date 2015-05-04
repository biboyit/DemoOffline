define(["Backbone", "models/ShipViaModel", "config"], function (Backbone, ShipViaModel, cfg) {


    var ShipViaCollection = Backbone.Collection.extend({

        model: ShipViaModel,

        urlRoot: 'shipvia',
       
        url: function () {      
            return cfg.getServiceUrl(this.urlRoot);
        }

    });



    return ShipViaCollection;



});