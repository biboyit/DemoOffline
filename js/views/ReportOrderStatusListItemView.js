define(["i18n!nls/labels", "Backbone", "tpl", "config"], function (i18n, Backbone, tpl, cfg) {

    var ReportOrderStatusListItemView = Backbone.View.extend({

        tagName: "li",

        initialize: function () {
            this.template = _.template(tpl.get('report-order-status-list-item'));
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
            
			var compiledTemplate = this.template({
				i18n: i18n,
				data: this.model.toJSON()
			});
			this.$el.html(compiledTemplate);
            return this;
        }

    });

    return ReportOrderStatusListItemView;
});