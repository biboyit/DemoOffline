// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "i18n!nls/momentLang", "Backbone", "tpl", "moment", "views/OrderListItemView"], function (i18n, momentLang, Backbone, tpl, moment, OrderListItemView) {

    // Extends Backbone.View
    var OrderListView = Backbone.View.extend({

        initialize: function () {
            this.template = _.template(tpl.get('order-list-divider'));
            this.model.bind("reset", this.render, this);
        },

        render:function (eventName) {
            $(this.el).empty();
            var todayDivider, yesterdayDivider, twoDaysAgoDivider, olderDivider = false;
			var locale = localStorage.getItem('locale');
			if(locale != null) {
				moment.lang(locale, momentLang);
				moment.lang(locale);
			}
			
            var today = moment();
            var yesterday = moment().subtract('days', 1);
            var twoDaysAgo = moment().subtract('days', 2);
            _.each(this.model.models, function (order) {
                var orderDate = moment(order.get('OrderDate', i18n.time.orderFormat || 'YYYY-MM-DD HH:mm:ss'));
                order.set('OrderDateFromNow', orderDate.fromNow());

                if (today.isSame(orderDate, "day")) {
                    if (!todayDivider) {
                        $(this.el).append(this.template({ title: i18n.title.today }));
                        todayDivider = true;
                    }
                } else if (yesterday.isSame(orderDate, "day")) {
                    if (!yesterdayDivider) {
                        $(this.el).append(this.template({ title: i18n.title.yesterday }));
                        yesterdayDivider = true;
                    }
                } else if (twoDaysAgo.isSame(orderDate, "day") && !twoDaysAgoDivider) {
                    if (!twoDaysAgoDivider) {
                        $(this.el).append(this.template({ title: twoDaysAgo.format('dddd') }));
                        twoDaysAgoDivider = true;
                    }
                } else if (!olderDivider) {
                    $(this.el).append(this.template({ title: i18n.title.earlier }));
                    olderDivider = true;
                }

                $(this.el).append(new OrderListItemView({model:order}).render().el);
            }, this);
           
            return this;
        }

    });

    return OrderListView;
});