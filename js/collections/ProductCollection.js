define(["Backbone", "BaseCollection", "models/ProductModel", "config"], function (Backbone, BaseColletion, ProductModel, cfg) {

    var ProductCollection = BaseColletion.extend({
        
        model: ProductModel,
        
        urlRoot: 'product',

        url: function () {
            var qs = "";            
            if (this.filterStatus)
                qs += "status=" + this.filterStatus;
            else if (this.InvtID)
                qs += "invtid=" + this.InvtID;
            if (this.headerID && this.siteID && this.key)
                qs += "headerid="+ this.headerID + "&siteid=" + this.siteID + "&search=" + this.key;
            else if (this.siteID && this.key)
                qs += "siteid=" + this.siteID + "&search=" + this.key;            
            else if (this.headerID && this.invtID)
                qs += "HeaderID=" + this.headerID + "&InvtID=" + this.invtID + "&IncludePrice=true";

            return cfg.getServiceUrl(this.urlRoot, qs);
        },

        fetchAndReset: function (method) {
            var self = this;
            return this.fetch({
                success: function (data) {                   
                    self.reset(data.models);
                },
                error: function () { console.log(arguments); }
            });
        },

        searchByInvtID: function (HeaderID, InvtID) {
            this.headerID = HeaderID;
            this.invtID = InvtID;
            return this.fetchAndReset("searchByInvtID(" + HeaderID + "," + InvtID +")");
        },

        searchProduct: function (siteid, key, headerid) {
            this.siteID = siteid;
            this.key = key;
            this.headerID = headerid
            return this.fetchAndReset("searchProduct(" + siteid + "," + key + "," + headerid +")");


            //var url = cfg.getServiceUrl(this.urlRoot, (headerid == '') ? 'siteid=' + siteid + '&search=' + key : 'headerid=' + headerid + '&siteid=' + siteid + '&search=' + key);

            //console.log('ProductCollection.searchProduct: ' + url);

            //var self = this;



            //$.getJSON(url, function (data) {

            //    console.log("ProductCollection.searchProduct success: " + data.length);

            //    self.reset(data);

            //  /*  $.mobile.loading('hide');*/

            //})

            //.fail(function (q, status, err) {

            //    console.log('response: ' + q.responseText, q.statusText);

            //    console.log('status: ' + status);

            //    console.log('err: ' + err);

            //    //$.mobile.loading('hide');
            //});

        }

        


    });



    return ProductCollection;



});