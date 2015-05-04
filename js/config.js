define(["Backbone", "models/SettingsModel"], function (Backbone, SettingsModel) {

    var cfg = {        
        androidTemplateRootUrl: 'tpl/fries/',        
        iosTemplateRootUrl: 'tpl/ratchet/',
        blackBerry : 'tpl/bb10',
        staticFileServiceRootUrl: 'data/',
        
        initialize: function () {
            this._settings = new SettingsModel({ id: 1 });
            this._settings.fetch();
            console.log(['Startup settings', this._settings]);
        },

        getSettings: function () {
            if (this._settings == undefined)
                this.initialize();
            return this._settings;
        },    

        initBeforeDOMReady: function () {
                  
            if (this.getPlatform() == "Android") {
                this.loadCSS("js/libs/fries/themes/holo-dark/bootstrap-fries.css");
                this.loadCSS("js/libs/fries/themes/holo-dark/holo-dark.min.css");                
                this.loadCSS("js/libs/custom/css/pageslider.css");                          
                this.loadCSS("js/libs/custom/css/waitingpanel.css");                   
            }
            else if (this.getPlatform() == "iOS") {
                this.loadCSS("js/libs/ratchet/css/bootstrap-ratchet.css");
                this.loadCSS("js/libs/ratchet/css/ratchet.css");                
                this.loadCSS("js/libs/custom/css/pageslider.css");
            }
            else {
                this.loadCSS("js/libs/ratchet/css/bootstrap-ratchet.css");
                this.loadCSS("js/libs/ratchet/css/ratchet.css");
                this.loadCSS("js/libs/custom/css/pageslider.css");
                
            }
            
            var libs = '';
            
            if (this.getPlatform() == "Android")
                libs = ['PageSlider'];

            if (this.getPlatform() == "iOS")
                libs = ['PageSlider'];

            
            return libs;
        },

        getServiceUrl: function (method, options) {
            var settings = this.getSettings();
            var useWebApi = settings.get('useWebApi');
            var serviceRootUrl = settings.get('serviceRootUrl');

            if (useWebApi) {
                var url = serviceRootUrl + method;
                if (options)
                    url += '?' + options;
                console.log(url);
                return url;
            } else {
                var url = this.staticFileServiceRootUrl + method;
                if (options)
                    url += '.' + options;
                return url + ".json";
            }
        },

        getServiceImageUrl: function () {
            return this.getSettings().get("serviceImageUrl");
        },

        getVersion: function () {
            return this.getSettings().get("version");
        },

        getPlatform: function () {

            if (this.isDevice()) {                                    
                    return window.device.platform;                
            }
            else
                return "Android";
        },

        getCheckUpdateURL: function (platform) {
            var settings = this.getSettings();
            var serviceRootUrl = settings.get('serviceRootUrl').toLowerCase();
            if (serviceRootUrl.lastIndexOf('api') > -1)
                serviceRootUrl = serviceRootUrl.substring(0, serviceRootUrl.lastIndexOf('api'));
            if (serviceRootUrl.charAt(serviceRootUrl.length - 1) != '/')
                serviceRootUrl += '/';

            serviceRootUrl += 'appinfo-' + platform + '.json?t=' + (new Date().getTime());
            return serviceRootUrl;
        },

        isUserAgent: function (keyword) {
            var ua = navigator.userAgent.toLowerCase()
            return ua.indexOf(keyword) > -1
        },        

        loadCSS: function (filename) {
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("href", filename);
            if (typeof fileref != "undefined")
                $("head").append(fileref);
        },

        isDevice: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        },

        showAlert: function (message, callback, title, buttonName) {

            if (navigator.notification) {
                navigator.notification.alert(
                        message,
                        callback,
                        title,
                        buttonName
                    );
            }
            else {
                alert(message);
            }
        },

        showPrompt: function (message, callback, title, defaultText) {

            if (navigator.notification) {
                navigator.notification.prompt(
                       message,  // message
                       callback,                  // callback to invoke
                       title,            // title
                       ['submit', 'Exit'],             // buttonLabels ['Ok', 'Exit']
                       defaultText                 // defaultText
                   );
            }

        },

        showConfirm: function (message, callback, title, buttonLabels) {

            if (navigator.notification) {
                navigator.notification.confirm(
                        message,
                        callback,
                        title,
                        buttonLabels
                    );
            }
            else {
                confirm(message);
            }
        },
       
        loadUrl: function(url) {
            window.open(url,'_blank','location=yes');
        },

    };

    cfg.initialize();    
    return cfg;
});

