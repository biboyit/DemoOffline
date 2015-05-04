define(["i18n!nls/labels", "Backbone", "tpl", "BaseView"], function (i18n, Backbone, tpl, BaseView) {

    var CustomerView = BaseView.extend({

        initialize: function (options) {
            this.router = options.router;
            this.template = _.template(tpl.get('customer'));
        },

        events: {
            "click a.tabLink": "changeTab",
            "click .go-back": "goBack" 
        },

        render: function () {
            this.model.set('mapSearchKeyword', encodeURIComponent(this.model.get('Address1') + ' '
                + this.model.get('Address2') + ' '
                + this.model.get('City') + ' '
                + this.model.get('Zip') + ' '
                + this.model.get('State') + ' '
                + this.model.get('Country')));

			var compiledTemplate = this.template({
				i18n: i18n,
				data: this.model.toJSON()
			});
			this.$el.html(compiledTemplate);
            this.$el.find("div[data-role='content'] div").hide();
            this.$el.find("div#address").show();
            this.$el.find("#tabLinkAddress").addClass("ui-btn-active");
            return this;
        },

        changeTab: function (e) {
            e.preventDefault();
            var name = $(e.currentTarget).attr('href');
            var $content = $(name);
            $content.siblings().hide();
            $content.show();
        }

    });

    return CustomerView;
});