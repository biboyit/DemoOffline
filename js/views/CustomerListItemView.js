define(["Backbone", "tpl"], function (Backbone, tpl) {

    var CustomerListItemView = Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.template = _.template(tpl.get('customer-list-item'));     
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return CustomerListItemView;
});