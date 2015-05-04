define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/CustomerListView",  "config", "models/OrderModel",], function (i18n, Backbone, tpl, BaseView, CustomerListView, cfg, OrderModel) {

    var CustomerSelectorView = BaseView.extend({

        initialize: function ( option ) {
            this.template = _.template(tpl.get('customer-selector'));            
            this.headerid = option.headerid;            
            this.model = option.model;
            this.isnew = option.isnew;
            this.router = option.router;
            
         
            /*if (!cfg.isBB10ThemeEnabled()) {
                $(document).on("pagechange", function () {
                    $("form.ui-listview-filter").hide();
                });
            }*/
        },

        events: {
            "keyup .search-query": "search",
            "click .search-query + a.ui-input-clear": "clearSearch",
            "click ul#CustomerList li a": "selectCustomer", 
            "click .go-back": "goBack"            
        },

        render: function () {
            var compiledTemplate = this.template({
				i18n: i18n,
				data: this.model.toJSON()
			});
			this.$el.html(compiledTemplate);
            this.listView = new CustomerListView({ el: $('ul', this.el), model: this.model });
            this.listView.render();
            return this;
        },

        selectCustomer: function (e) {
         
            e.preventDefault();
            var custname = $(e.currentTarget).data("name");
            var custid = $(e.currentTarget).data("id");
           
            console.log(this.isnew);
            window.localStorage.setItem(custid, custname);
            
            if (this.isnew == 'true')
            {
                var neworder = new OrderModel({ account: this.router.account });
                neworder.url = cfg.getServiceUrl("Order", 'customerid=' + custid + '&customerordernumber=' + this.headerid);
                var self = this;
              

                neworder.fetch({
                    success: function (result) {

                        var order = result.toJSON();
                        var headerid = order.HeaderID;

                        self.router.navigate("order/" + headerid + '/' + custid, { trigger: true, silent: true });
                    }
                });     
            }                         
            else                
                this.router.navigate("order/" + this.headerid + '/' + custid, { trigger: true });
             
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
            var filter = $("ul#OrderList").prev().children(".ui-input-search").children("input");
            filter.val("");
            filter.trigger("change");
        }
    });

    return CustomerSelectorView;
});