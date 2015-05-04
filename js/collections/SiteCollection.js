define(["Backbone", "models/SiteModel", "config"], function (Backbone, SiteModel, cfg) {



    var SiteCollection = Backbone.Collection.extend({



        model: SiteModel,



        urlRoot: "site",
      
        findBySalesPerson: function (key) {

            var url = (key == '') ? cfg.getServiceUrl(this.urlRoot) : cfg.getServiceUrl(this.urlRoot, 'salesPersonId=' + key);

            console.log('SiteCollection.findBySalesPerson: ' + key);

            var self = this;



            $.getJSON(url, function (data) {

                console.log("SiteCollection.findBySalesPerson success: " + data.length);

                self.reset(data);

            })

            .fail(function (q, status, err) {

                console.log('response: ' + q.responseText, q.statusText);

                console.log('status: ' + status);

                console.log('err: ' + err);

            });

        }



    });



    return SiteCollection;



});