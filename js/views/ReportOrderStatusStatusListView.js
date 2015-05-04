define(["i18n!nls/labels", "Backbone", "tpl", "views/ReportOrderStatusStatusListItemView"], function (i18n, Backbone, tpl, ReportOrderStatusStatusListItemView) {

    var ReportOrderStatusStatusListView = Backbone.View.extend({

        initialize: function () {            
            //this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
            this.$el.empty();
            _.each(this.model, function (item) {
                
                $(this.el).append('<li class="list-divider">' + i18n.li.orderStatus + '</li>');
                $(this.el).append(new ReportOrderStatusStatusListItemView({ model: item }).render().el);
            }, this);

           /* $('ul#OrderDetailList').listview('refresh');*/
            return this;
        }

    });

    return ReportOrderStatusStatusListView;
});