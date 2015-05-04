define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/CustomerListView", "config"], function (i18n, Backbone, tpl, BaseView, CustomerListView, cfg) {
    var CustomersView = BaseView.extend({

        listViewSelector: 'ul#CustomerList',

        initialize: function (options) {
            this.router = options.router;
            this.routerid = options.routerid;
            this.hideMenuPanel = options.hideMenuPanel || false;
            this.template = _.template(tpl.get('customers'));
            
           /* if (!cfg.isBB10ThemeEnabled()) {
                $(document).on("pagechange", function () {
                    $("form.ui-listview-filter").hide();
                });
            }*/
        },

        events: {
            "keyup .search-query": "search",
            "click .search-query + a.ui-input-clear": "clearSearch",
            "click ul#CustomerList li a": "selectCustomer",
            "click .hamburger-action": "slidingMenu",
            "click #hamburger": "slidingMenu",
            "click #hamburger-overlay": "slidingMenu",
            "click .go-back": "goBack"
        },

        render: function () {
            var m = this.model;
            m.routerId = this.routerid;
			var compiledTemplate = this.template({
				i18n: i18n,
				data: m
			});
			this.$el.html(compiledTemplate);

            if (this.hideMenuPanel) {
                this.$el.find("#mainmenu").hide();
            } else {
                this.$el.find("#submenu").hide();
            }

            this.listView = new CustomerListView({ el: $(this.listViewSelector, this.el), model: m });
            this.listView.render();

            return this;
        },
      
        selectCustomer: function (e) {
            var custid = $(e.currentTarget).data("id");
            var custname = $(e.currentTarget).data("name");
            var routerid = this.routerid;

            if (routerid == 'customer')
                this.router.navigate("customer/" + custid, { trigger: true });
            else if (routerid == 'report')
                this.router.navigate("reportorderstatus/" + custid + '/' + custname, { trigger: true });
        },

        search: function (e) {
            e.preventDefault();
            var valThis = $('.search-query').val();
            $('.list>li').each(function (child) {

                var text = $(this).children().data('name') + ' ' + $(this).children().data('id');

                if (text) {
                    $(this).show();
                    /* var id = $(this).data("id");
                  var text = $(this).text().toLowerCase();*/

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

    return CustomersView;
});