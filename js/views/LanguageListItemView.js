define(["i18n!nls/labels", "Backbone", "tpl"], function (i18n, Backbone, tpl) {



    var OrderListItemView = Backbone.View.extend({



        tagName: "li",

       



        initialize: function () {

            this.template = _.template(tpl.get('language-list-item'));     

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

        },



        events: {

          
        },


        toggleControls: function () {

            if (this.controlsOpen)

                this.closeControls()

            else

                this.openControls();

        },



        openControls: function () {

            this.controlsOpen = true;

            this.$el.addClass('controls-open')

        },



        closeControls: function () {

            this.controlsOpen = false;

            this.$el.removeClass('controls-open');

        }





    });



    return OrderListItemView;

});