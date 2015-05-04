define(["jquery"], function ($) {

    var defaults = {

        templateNames: ['login'
        , 'language'
        , 'settings'
        , 'map'
        , 'action'
        , 'orders'
        , 'language-list-item'
        , 'order-list-item'
        , 'language-list-divider'
        , 'order-list-divider'
        , 'order'
        , 'orderline-list-item'
        , 'product-selector'
        , 'product-list-item'                
        , 'orderline-add-item'
        , 'customers'
        , 'customer'
        , 'customer-selector'
        , 'customer-list-item'
        , 'order-upload-attachment'
        , 'order-attachment'
        , 'report'
        , 'report-order-status-selector'
        , 'report-order-status-list-item'
        , 'report-order-status-detail'
        , 'report-order-status-detail-list-item'
        , 'report-order-status-status-list-item'
        , 'report-stock-onhand'
        , 'report-stock-onhand-product-selector'
        , 'report-stock-onhand-product-list-item'
        , 'report-stock-onhand-detail'
        ],

        getTemplateNames: function() {
            return this.templateNames;
        }

    };

    return defaults;
});