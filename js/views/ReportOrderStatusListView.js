define(["Backbone", "tpl", "views/ReportOrderStatusListItemView"], function (Backbone, tpl, ReportOrderStatusListItemView) {

    var ReportOrderStatusListView = Backbone.View.extend({

        initialize: function () {            
            this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
            this.$el.empty();
            
            _.each(this.model.models, function (item) {
                
                $(this.el).append(new ReportOrderStatusListItemView({ model: item }).render().el);
            }, this);

            /*$('#ReportOrderStatusList').listview('refresh');*/
            return this;
        }

    });

    return ReportOrderStatusListView;
});