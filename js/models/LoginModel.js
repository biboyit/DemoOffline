define(["Backbone", "BackboneLocalStorage"], function (Backbone) {

    var LoginModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('login'),

        defaults: {
            username: null,
            password: null,
            isRemember: false
        },

        initialize: function () {
        }

    });

    // Returns the Model class
    return LoginModel;

});