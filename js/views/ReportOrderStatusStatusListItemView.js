define(["i18n!nls/labels", "Backbone", "tpl"], function (i18n, Backbone, tpl) {

    var ReportOrderStatusStatusListItemView = Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.template = _.template(tpl.get('report-order-status-status-list-item'));
            //this.model.bind("change", this.render, this);
            //this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
            var compiledTemplate = this.template({
                i18n: i18n,
                data: this.model
            });
            this.$el.html(compiledTemplate);
            return this;
        }

    });

    return ReportOrderStatusStatusListItemView;
});