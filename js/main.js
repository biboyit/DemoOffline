require.config({
    paths: {
        text: 'libs/require/text',
        domReady: 'libs/require/domReady',
        noext: 'libs/require/noext',
        underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone',        
        BackboneLocalStorage: 'libs/backbone/backbone-localStorage',
        jquery: 'libs/jquery/jquery-1.9.1.min',        
        Bootstrap: 'libs/bootstrap/js/bootstrap',        
        BaseRouter: "routers/BaseRouter",
        BaseModel: "models/BaseModel",
        BaseCollection: "collections/BaseCollection",
        BaseView: "views/BaseView",
        PageSlider: 'libs/custom/js/pageslider',
        PopOver: 'libs/custom/js/popover',        
        moment: 'libs/moment',
        async: 'libs/async',        
        WaitingPanel: 'libs/custom/js/waitingpanel',
        fries: 'libs/fries/fries',
        fastclick: 'libs/fastclick',
        i18n: "libs/i18n"
    },
    locale: localStorage.getItem('locale') || 'en-us',
    shim: {
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        PageSlider: {
            exports: 'PageSlider'
        },
        PopOver: {
            exports: 'PopOver'
        },     
        jqm: {
            deps: ['jquery']
        },
        Bootstrap: {
            deps: ['jquery']
        },
        BackboneLocalStorage: {
            deps: ['Backbone']
        },       
        WaitingPanel: {
            exports: 'WaitingPanel'
        },
       fries: {
            exports: 'fries'
        }
    }
});

require(['jquery', 'Backbone', 'fastclick', 'config', 'WaitingPanel'],
    function ($, Backbone, fastclick, cfg, WaitingPanel) {
        var isLoadingAdded = false;     
        $(document).ajaxStart(function () {
            if (!isLoadingAdded)
            {
                this.waitingpanel = new WaitingPanel();
                this.waitingpanel.addPanel($('body'), 'Fetching Data...');
                isLoadingAdded = true;
            }                
            
            this.waitingpanel.show();
        });

        $(document).ajaxStop(function () {
            this.waitingpanel.hide();
        });

        var libs = cfg.initBeforeDOMReady();
        require(libs, function () {

            require(["tpl"
                , "defaults"
                , "routers/Router"]
                , function (tpl, defaults, Router) {

                    function onTemplateReady() {
                        console.log('templates loaded.');                       
                        this.router = new Router();                        
                        Backbone.history.start();

                       // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                    }

                    function onDeviceReady() {
                        
                        if (cfg.isDevice()) {
                            if (parseFloat(window.device.version) === 7.0) {
                                document.body.style.marginTop = "20px";
                            }
                        }                        

                        tpl.loadTemplates(defaults.getTemplateNames(), onTemplateReady);

                        

                        document.addEventListener("backbutton", function (e) {
                            var hash = document.URL.substr(document.URL.indexOf('#') + 1)
                            console.log(hash);
                           
                            if (hash == "login") {
                                e.preventDefault();
                                console.log('logout');
                                navigator.app.exitApp();
                            }                         
                            else {
                                navigator.app.backHistory();
                            }
                        }, false);

                        var fastClick = new fastclick();
                        fastclick.attach(document.body);
                       // checkUpdate();
                    }

                    if (cfg.isDevice()) {
                        // This is running on a device so waiting for deviceready event
                        document.addEventListener('deviceready', onDeviceReady, false);
                        
                    } else {
                        // On desktop don't have to wait for anything
                        onDeviceReady(true);                       
                    }

                    function checkUpdate() {
                        var version = cfg.getVersion();
                        var platform = cfg.getPlatform();
                        var url = cfg.getCheckUpdateURL(platform);                        
                        var self = this;
                        
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: "json"
                        })
                        .error(function () {
                            console.log(["Failed to check latest version info"]);                            
                        })
                        .done(function (data) {
                            console.log(["Latest version info", data]);
                            if (data &&
                                data.Version != cfg.getVersion()) {  // If there is new version info
                                var msg = 'New version available. Please update now. Thank you.';
                                if (data.ReleaseInfo)
                                    msg += '\n\n' + data.ReleaseInfo;
                                if (data.ReleaseMessage)
                                    msg += '\n\n' + data.ReleaseMessage;

                                if (data.ForceUpdate) {
                                    navigator.notification.alert(msg,
                                        function () {
                                            navigator.app.loadUrl(data.UpdateURL, { openExternal: true });
                                            navigator.app.exitApp();
                                        },
                                        'New Update Available',
                                        'Update Now');
                                } else {
                                    navigator.notification.confirm(msg,
                                        function (button) {
                                            if (button == 2) {
                                                navigator.app.loadUrl(data.UpdateURL, { openExternal: true });
                                                navigator.app.exitApp();                                           
                                            }
                                        },
                                        'New Update Available',
                                        'Not Now,Update');
                                }
                            }
                        });
                    }

                });

        });

    }
);