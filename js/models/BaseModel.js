define(["Backbone", "config"], function (Backbone, cfg) {

    // The Model constructor
    var BaseModel = Backbone.Model.extend({

        initialize: function (options) {
            options || (options = {});
            this.account = options.account;
            this.id = options.id;
        },

        url: function () {
            return cfg.getServiceUrl(this.urlRoot, (this.id) ? "id=" + this.id : "");
        },

        fetch: function (options) {
            options || (options = {});

            if (this.account) {
                var token = this.account.get("token");
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader("Authorization",
                        "Basic " + window.btoa(token));
                };
            }

            return Backbone.Model.prototype.fetch.call(this, options);
        },

        destroy: function (options) {
            options || (options = {});

            if (this.account) {
                var token = this.account.get("token");
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader("Authorization",
                        "Basic " + window.btoa(token));
                };
            }

            return Backbone.Model.prototype.destroy.call(this, options);
        },


        save: function (attrs, options) {
            attrs = attrs || this.toJSON();
            options = options || {};

            if (this.account) {
                var token = this.account.get("token");
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader("Authorization",
                        "Basic " + window.btoa(token));
                };
            }

            Backbone.Model.prototype.save.call(this, attrs, options);
        } 
    });

    // Returns the Model class
    return BaseModel;
});