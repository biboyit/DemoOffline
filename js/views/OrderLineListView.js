define(["Backbone", "tpl", "views/OrderLineItemView"], function (Backbone, tpl, OrderLineItemView) {



    var OrderLineListView = Backbone.View.extend({



        initialize:function () {

            //this.model.bind("reset", this.render, this);

        },



        render: function (eventName) {

            this.$el.empty();
            _.each(this.model, function (orderLine) {

                this.$el.append(new OrderLineItemView({ model: orderLine }).render().el);

            }, this);

            return this;

        }



    });



    return OrderLineListView;

});