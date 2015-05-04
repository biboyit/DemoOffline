define(["jquery", "config"], function ($, config) {

    var tpl = {
        // Hash of preloaded templates for the app
        templates: {},

        // Recursively pre-load all the templates for the app.
        // This implementation should be changed in a production environment. All the template files should be
        // concatenated in a single file.
        loadTemplates: function (names, callback) {
            var that = this;

            var templateRootUrl = '';

            if (config.getPlatform() == "Android")
                templateRootUrl = config.androidTemplateRootUrl;
            else if (config.getPlatform() == "iOS")
                templateRootUrl = config.iosTemplateRootUrl;
            
            var loadTemplate = function (rootUrl, index) {
                var name = names[index];
                var url = rootUrl + name + '.html'
                console.log('Loading template: ' + url);
                $.ajax({
                    url: url,
                    dataType: "html",
                    async: false,
                    success: function (data) {
                        that.templates[name] = data;
                        index++;
                        if (index < names.length) {
                            loadTemplate(templateRootUrl, index);
                        } else {
                            callback();
                        }
                    },
                    error: function (data) {
                        console.log(['Failed to load template', data]);
                        if (templateRootUrl != defaultTemplateRootUrl)
                            loadTemplate(defaultTemplateRootUrl, index);
                    }
                });
            }

            loadTemplate(templateRootUrl, 0);
        },

        // Get template by name from hash of preloaded templates
        get: function (name) {
            return this.templates[name];
        }
    };

    return tpl;
});