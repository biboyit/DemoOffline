define(["Backbone", "config"], function (Backbone, cfg) {

    // The Model constructor
    var OrderUploadAttachmentModel = Backbone.Model.extend({

        urlRoot: "OrderAttachment",
    
        initialize:function () {
            this.url = cfg.getServiceUrl(this.urlRoot, "HeaderId=" + this.id);
        }

    });

    // Returns the Model class
    return OrderUploadAttachmentModel;

});