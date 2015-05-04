define(["Backbone", "tpl", "views/ProductListItemView"], function (Backbone, tpl, ProductListItemView) {



    var ProductListView = Backbone.View.extend({



        initialize: function () {

            this.model.bind("reset", this.render, this);

        },



        render: function (eventName) {

            this.$el.empty();

            _.each(this.model.models, function (item) {

                $(this.el).append(new ProductListItemView({ model: item }).render().el);

            }, this);



/*            $('#ProductList').listview('refresh');*/

            return this;

        }



    });



    return ProductListView;

});