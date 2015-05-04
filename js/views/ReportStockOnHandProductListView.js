define(["Backbone", "tpl", "views/ReportStockOnHandProductListItemView"], function (Backbone, tpl, ReportStockOnHandProductListItemView) {

    var ReportStockOnHandProductListView = Backbone.View.extend({

        initialize: function () {            
         //  this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
            this.$el.empty();
            console.log(this.model);
            _.each(this.model, function (item) {
                
                $(this.el).append(new ReportStockOnHandProductListItemView({ model: item }).render().el);
            }, this);

           /* $('#ProductOnHandList').listview('refresh');*/
            return this;
        }

    });

    return ReportStockOnHandProductListView;
});