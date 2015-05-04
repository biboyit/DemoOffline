define(["Backbone", "models/OrderAttachmentModel", "config"], function (Backbone, OrderAttachmentModel, cfg) {



    var OrderAttachmentCollection = Backbone.Collection.extend({



        model:OrderAttachmentModel,



        url: cfg.getServiceUrl("OrderAttachment"),    

    

        findByID:function (key) {

            var url = (key == '') ? this.url : this.url + '?headerid=' + key;

            console.log('OrderAttachmentCollection.findByID : ' + url);

            var self = this;



            $.getJSON(url, function (data) {

                console.log("OrderAttachmentCollection.findByID success: " + data.length);

                self.reset(data);

            })

            .fail(function (q, status, err) {

                console.log('response: ' + q.responseText, q.statusText);

                console.log('status: ' + status);

                console.log('err: ' + err);

            });

        }



    });



    return OrderAttachmentCollection;



});