// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/OrderListView", "config"], function (i18n, Backbone, tpl, BaseView, OrderListView, cfg) {

    // Extends Backbone.View
    var OrdersView = BaseView.extend({

        orderListSelector: 'ul#OrderList',
        
        initialize: function (options) {
            this.hideMenuPanel = options.hideMenuPanel || false;

            this.template = _.template(tpl.get('orders'));
           
        },

      
        events: {
            "click .filterByStatusMenuItem": "filterByStatus",
            "touchend .filterByStatusMenuItem": "filterByStatus",
            "keyup .search-query": "search",
            "click .search-query + a.ui-input-clear": "clearSearch",
            "click .hamburger-action" : "slidingMenu",
            "click #hamburger": "slidingMenu",
            "click #hamburger-overlay": "slidingMenu",
            "click .go-back": "goBack"
                                
        },

        // Renders all of the Category models on the UI
        render: function () {            
            var compiledTemplate = this.template({
                i18n: i18n,				
                data: this.model.toJSON()
            });
            this.$el.html(compiledTemplate);

            if (this.hideMenuPanel) {                
                this.$el.find("#mainmenu").hide();
            } else {
                this.$el.find("#submenu").hide();
            }

            this.listView = new OrderListView({ el: $(this.orderListSelector, this.el), model: this.model });
            this.listView.render(); 
          

            return this;
           
        },

        filterByStatus: function (evt) {
            console.log(evt);
            var status = $(evt.currentTarget).data('status');
            this.model.findBy(status);
            this.slidingMenu(evt);
           
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

    return OrdersView;
});