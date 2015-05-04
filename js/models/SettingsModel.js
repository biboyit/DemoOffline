define(["Backbone", "BackboneLocalStorage"], function (Backbone) {

    var SettingsModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('settings'),

        defaults: {
            useWebApi: true,
			//serviceRootUrl: 'http://172.17.0.132/xxxx/api/',
          serviceRootUrl: 'http://192.168.0.101/OrderingWEBAPI/api/',
           // serviceRootUrl: 'https://uat.ordering-m.my.brightstarcorp.com/orderingapi/api/',
            version: '3.0.0' 
        },

        initialize: function () {
        }

    });
    
    // Returns the Model class
    return SettingsModel;

});