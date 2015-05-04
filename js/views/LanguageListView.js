// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "views/LanguageListItemView"], function (i18n, Backbone, tpl, LanguageListItemView) {

    // Extends Backbone.View
    var LanguageListView = Backbone.View.extend({

        initialize: function () {
            this.template = _.template(tpl.get('language-list-divider'));
            this.model.bind("reset", this.render, this);
        },

        render:function (eventName) {
            $(this.el).empty();
			var currentLanguageCode = localStorage.getItem('locale');
            _.each(this.model.models, function (language) {
				language.set('DisplayName', i18n.language[language.get('Name')]);
				if(currentLanguageCode == null) {
					language.set('IsSelected', language.get('IsDefault'));
					if(language.get('IsSelected') == true) {
						localStorage.setItem('locale', language.get('LanguageCode'));
					}
				}
				else if(language.get('LanguageCode') == currentLanguageCode) {
					language.set('IsSelected', true);
				} else {
					language.set('IsSelected', false);
				}
                $(this.el).append(new LanguageListItemView({model:language}).render().el);
            }, this);
           
            return this;
        }

    });

    return LanguageListView;
});