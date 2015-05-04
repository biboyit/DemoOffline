define(["Backbone", "tpl"], function (Backbone, tpl) {

    var ReportStockOnHandProductListItemView = Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.template = _.template(tpl.get('report-stock-onhand-product-list-item'));
           // this.model.bind("change", this.render, this);
            //this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {

            this.$el.html(this.template(this.model));
            return this;
        }


    });

    return ReportStockOnHandProductListItemView;
});