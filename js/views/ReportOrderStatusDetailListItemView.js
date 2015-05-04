define(["i18n!nls/labels", "Backbone", "tpl"], function (i18n, Backbone, tpl) {

    var ReportOrderStatusDetailListItemView = Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.template = _.template(tpl.get('report-order-status-detail-list-item'));
            //this.model.bind("change", this.render, this);
            //this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
            
            var compiledTemplate = this.template({
                i18n: i18n,
                data: this.model
            });
            return this;
        }

    });

    return ReportOrderStatusDetailListItemView;
});