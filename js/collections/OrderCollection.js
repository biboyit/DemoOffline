// Category Model
// ==============

// Includes file dependencies
define(["Backbone", "BaseCollection", "models/OrderModel", "config"], function (Backbone, BaseCollection, OrderModel, cfg) {

    var OrderCollection = BaseCollection.extend({        

        model: OrderModel,

        urlRoot: 'Order',

        url: function () {
            var qs = "";
            if (this.filterStatus)
                qs += "status=" + this.filterStatus;
            if (this.customerId)
                qs += ((qs.length > 0) ? "&" : "") + "search=" + this.customerId;			
            return cfg.getServiceUrl(this.urlRoot, qs);
        },

        fetchAndReset: function (method) {
            var self = this;
            return this.fetch({
                success: function (data) {
                    localStorage.setItem('orderss_' + method, JSON.stringify(data.models));
                    console.log("OrderCollection." + method + " success: " + data.models.length);
                    self.reset(data.models);
                },
                error: function () { 
                    var data = new OrderCollection({ account: this.account });
                    var array = JSON.parse(localStorage.getItem('orderss_' + method));

                    for (var i = 0; i < array.length; i++) {
                        var Order = new OrderModel({id: array[i].id });
                        Order.set({                            
                            "CustomerID": array[i].CustomerID,
                            "CustomerName": array[i].CustomerName,
                            "CustomerOrderNumber": array[i].CustomerOrderNumber,
                            "HeaderID": array[i].HeaderID,
                            "OrderDate": array[i].OrderDate,
                            "Remarks": array[i].Remarks,
                            "SalesPersonID": array[i].SalesPersonID,
                            "ShipToID": array[i].ShipToID,
                            "SiteID": array[i].SiteID,
                            "Status": array[i].Status
                        });
                        data.add(Order);
                    };
                    data.shift();
                    console.log("OrderCollection." + method + " success: " + data.models.length);
                    self.reset(data.models);
                }
            });
        },

        findByCustomer: function (customerId) {
            this.customerId = customerId;
            return this.fetchAndReset("findByCustomer(" + customerId + ")");
        },

        findBy: function (status) {
            this.filterStatus = status;
            return this.fetchAndReset("findBy(" + status + ")");
        },

        getNewOrderID: function (salesPersonId, customerOrderNumber) {
            var url = cfg.getServiceUrl(this.urlRoot, 'salesPersonId=' + salesPersonId + '&customerOrdernumber=' + customerOrderNumber);
            console.log('getNewOrderID: ' + url);
            var self = this;
            $.getJSON(url, function (data) {
                console.log("getNewOrderID success: " + data.length);
                self.reset(data);
            })
            .fail(function (q, status, err) {
                console.log('response: ' + q.responseText, q.statusText);
                console.log('status: ' + status);
                console.log('err: ' + err);
            });         
        }

    });

    return OrderCollection;

});