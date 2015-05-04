define(["Backbone", "BaseCollection", "models/OrderLineModel", "config"], function (Backbone, BaseCollection, OrderLineModel, cfg) {

    var OrderLineCollection = BaseCollection.extend({

        initialize: function (options) {
            options || (options = {});
            this.headerId = options.headerId;

            BaseCollection.prototype.initialize.call(this, options)
        },

        model: OrderLineModel,

        urlRoot: 'OrderDetail',
        
        url: function () {
            return cfg.getServiceUrl(this.urlRoot, (this.headerId == '') ? this.urlRoot : 'HeaderId=' + this.headerId);;
        }
    });

    return OrderLineCollection;
});