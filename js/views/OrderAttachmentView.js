// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "config"], function (i18n, Backbone, tpl, BaseView, cfg) {

    // Extends Backbone.View
    var OrderAttachmentView = BaseView.extend({

        // The View Constructor
        initialize: function (option) {
            
            this.template = _.template(tpl.get('order-attachment'));
            this.HeaderID = option.HeaderID;
                       
        },

        events: {                 
            "click .go-back": "goBack"          
        },
       
        // Renders all of the Category models on the UI
        render: function (eventName) {
            $(this.el).html(this.template({
				i18n: i18n, 
                attachmenturl : cfg.getServiceUrl("OrderAttachment") + '?HeaderID=' + this.HeaderID
            }));

         
            return this;
        }

    });

    return OrderAttachmentView;
});