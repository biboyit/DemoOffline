// Model
// ==============

// Includes file dependencies
define(["Backbone", "BaseModel", "BackboneLocalStorage"], function (Backbone, BaseModel) {

    // The Model constructor
    var OrderModel = BaseModel.extend({

        urlRoot: "Order",

        defaults: {
            id: null,
            CustomerID: '',
            CustomerName:'',
            CustomerOrderNumber:'',
            HeaderID:'',
            OrderDate: '',
            Remarks: '',
            SalesPersonID: '',
            ShipToID: '',
            SiteID: '',
            Status:''
        },
    });

    // Returns the Model class
    return OrderModel;
});