define(["Backbone", "tpl", "views/CustomerListItemView"], function (Backbone, tpl, CustomerListItemView) {

    var CustomerListView = Backbone.View.extend({

        initialize: function () {
            this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
            this.$el.empty();

            this.routerId = this.model.routerId;
            var showIcon = (this.routerId == 'customer');
            _.each(this.model.models, function (item) {
                item.set('showIcon', showIcon);
                $(this.el).append(new CustomerListItemView({ model: item }).render().el);
            }, this);

           /* $('#CustomerList').listview('refresh');*/
            return this;
        }

    });

    return CustomerListView;
});