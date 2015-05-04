define(["Backbone", "BackboneLocalStorage"], function (Backbone) {

    var AccountModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('account'),
		
        defaults: {
            userName: null,
            salesPersonId: null,
            token: null,
            isLoggedIn: false,
            tokenDate: null
        },

        initialize: function () {
        }

    });

    // Returns the Model class
    return AccountModel;

});