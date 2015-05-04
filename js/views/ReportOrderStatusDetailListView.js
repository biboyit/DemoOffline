define(["i18n!nls/labels", "Backbone", "tpl", "views/ReportOrderStatusDetailListItemView"], function (i18n, Backbone, tpl, ReportOrderStatusDetailListItemView) {

    var ReportOrderStatusDetailListView = Backbone.View.extend({

        initialize: function () {            
            //this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
            this.$el.empty();
            _.each(this.model, function (item) {
                
                $(this.el).append('<li class="list-divider">' + i18n.li.orderDetails + '</li>');
                $(this.el).append(new ReportOrderStatusDetailListItemView({ model: item }).render().el);
            }, this);

           /* $('ul#OrderDetailList').listview('refresh');*/
            return this;
        }

    });

    return ReportOrderStatusDetailListView;
});