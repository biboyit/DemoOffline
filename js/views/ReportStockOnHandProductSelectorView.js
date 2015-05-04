define(["i18n!nls/labels", "Backbone", "tpl", "config", "BaseView", "views/ReportStockOnHandProductListView"],
    function (i18n, Backbone, tpl, cfg, BaseView, ReportStockOnHandProductListView) {

    var ReportStockOnHandProductSelectorView = BaseView.extend({

        initialize: function (option) {
            this.template = _.template(tpl.get('report-stock-onhand-product-selector'));
            this.model = option.model;

            

           /* if (!cfg.isBB10ThemeEnabled()) {
                $(document).on("pagechange", function () {
                    $("form.ui-listview-filter").hide();
                });
            }*/
        },

        events: {
            "keyup .search-query": "search",
            "click .search-query + a.ui-input-clear": "clearSearch",
            "click .go-back": "goBack" 
        },

        render: function () {
            var compiledTemplate = this.template({
                i18n: i18n,
                data: this.model
            });
            this.$el.html(compiledTemplate);
            
            this.listView = new ReportStockOnHandProductListView({ el: $('ul', this.el), model: this.model });
            this.listView.render();
            return this;
        },

        search: function (e) {
            e.preventDefault();
            var valThis = $('.search-query').val();
            $('.list>li').each(function (child) {

                var text = $(this).children().data('name') + ' ' + $(this).children().data('id');

                if (text) {
                    $(this).show();                 
                    (text.toLowerCase().indexOf(valThis.toLowerCase()) !== -1) ? $(this).show() : $(this).hide();
                }

            });
        },

        clearSearch: function (event) {
            var filter = $(this.listViewSelector).prev().children(".ui-input-search").children("input");
            filter.val("");
            filter.trigger("change");
        }
    });

    return ReportStockOnHandProductSelectorView;
});