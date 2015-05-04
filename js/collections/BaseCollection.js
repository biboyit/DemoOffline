define(["Backbone"], function (Backbone) {

    var BaseCollection = Backbone.Collection.extend({
        initialize: function (options) {
            options || (options = {});
            this.account = options.account;
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

            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    return BaseCollection;

});