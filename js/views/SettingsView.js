define(["Backbone", "tpl", "BaseView", "models/SettingsModel"]

    , function (Backbone, tpl, BaseView, SettingsModel) {



    var SettingsView = BaseView.extend({



        initialize: function (options) {

            this.router = options.router;

            this.template = _.template(tpl.get('settings'));

            console.log('Initializing Settings View');

        },



        events: {

            "click #cancel": "cancel",

            "click #save": "save"

        },



        render: function () {

            this.$el.html(this.template(this.model.toJSON()));

            return this;

        },



        cancel: function () {

            window.history.back();

        },



        save: function () {

            event.preventDefault();

            $('.alert-error').hide();

            var formValues = {

                useWebApi: ($('input[name=serviceType]:checked').val() == "WebService"),

                serviceUrl: $('#serviceUrl').val(),

                enableAndroidTheme: ($('#enableAndroidTheme').val() == "on"),

                enableBB10Theme: ($('#enableBB10Theme').val() == "on"),

                enableBootstrapTheme: ($('#enableBootstrapTheme').val() == "on"),

                simulateBB10: ($('#simulateBB10').val() == "on"),

                simulateAndroid: ($('#simulateAndroid').val() == "on")

            };



            console.log(['Saving settings...', formValues]);

            this.model.set({

                "useWebApi": formValues.useWebApi,

                "serviceRootUrl": formValues.serviceUrl,

                "enableAndroidTheme": formValues.enableAndroidTheme,

                "enableBB10Theme": formValues.enableBB10Theme,

                "enableBootstrapTheme": formValues.enableBootstrapTheme,

                "simulateBB10": formValues.simulateBB10,

                "simulateAndroid": formValues.simulateAndroid

            });



            this.model.save();

            console.log(this.model);

            this.router.navigate("", { trigger: true, replace: true });

        }



    });



    return SettingsView;

});