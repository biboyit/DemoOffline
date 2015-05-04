define(["Backbone", "config"], function (Backbone, cfg) {
    var utils = {

        isOnline: function () {
            if (!cfg.isDevice())
                return true;

            return (navigator.connection.type != Connection.NONE);
        }

    };

    return utils;
});