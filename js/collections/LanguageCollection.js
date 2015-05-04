// Category Model
// ==============

// Includes file dependencies
define(["Backbone", "BaseCollection", "models/LanguageModel", "config"], function (Backbone, BaseCollection, LanguageModel, cfg) {

    var LanguageCollection = BaseCollection.extend({

        model: LanguageModel,

        urlRoot: 'Language',

        url: function () {
            var qs = "";
            return cfg.getServiceUrl(this.urlRoot, qs);
        },

        fetchAndReset: function (method) {
            var self = this;
            return this.fetch({
                success: function (data) {
                    console.log("LanguageCollection." + method + " success: " + data.models.length);
                    self.reset(data.models);
                },
                error: function () { console.log(arguments); }
            });
        }

    });

    return LanguageCollection;

});