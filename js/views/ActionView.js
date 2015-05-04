define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "models/ActionViewModel"]
    , function (i18n, Backbone, tpl, BaseView, ActionViewModel) {

    var ActionView = BaseView.extend({

        initialize: function () {
            this.template = _.template(tpl.get('action'));
        },

        render: function () {
			var compiledTemplate = this.template({
				i18n: i18n,
				data: this.model.toJSON()
			});
			this.$el.html(compiledTemplate);
            return this;
        }

    });

    return ActionView;
});