define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/ProductListView"], function (i18n, Backbone, tpl, BaseView, ProductListView) {



    var ProductSelectorView = BaseView.extend({



        initialize: function ( option ) {

            this.template = _.template(tpl.get('product-selector'));

            this.siteid = option.siteid;

            this.headerid = option.headerid;

            this.model = option.model;

            this.router = option.router;

        },



        events: {

            "keyup .search-query": "search",

            "keyup .ui-input-text": "search",
          
            "click .go-back": "goBack",

            "click ul#ProductList li a": "selectProduct",

        },



        render: function () {

            var compiledTemplate = this.template({
                i18n: i18n,
                data: this.model.toJSON()
            });
            this.$el.html(compiledTemplate);
            this.listView = new ProductListView({ el: $('ul', this.el), model: this.model });
            this.listView.render();
            return this;
        },

        selectProduct: function (e) {
            e.preventDefault();

            var headerID = $(e.currentTarget).data("id");
            var invtID = $(e.currentTarget).data("name");
            var routerid = this.routerid;

            this.router.navigate("orderlineadditem/ " + headerID + "/" + invtID, { trigger: true });
        },


        search: _.debounce(function (event) {

            var key = $('.search-query').val();

            console.log('search ' + this.headerid);

            if (key.length > 1) {

               /* $.mobile.loading('show');*/

                this.model.searchProduct(this.siteid, key, this.headerid);

            }

        }, 800)



    });



    return ProductSelectorView;

});