define(["Backbone", "config"], function (Backbone, cfg) {

    // The Model constructor

    var OrderLineModel = Backbone.Model.extend({



        urlRoot: "OrderDetail",        

    

        initialize: function (id, detailid) {
            this.url = cfg.getServiceUrl(this.urlRoot, ((detailid == '') || (detailid == 'undefined')) ? "HeaderId=" + id : "HeaderId=" + id + "&DetailID=" + detailid);

            this.validators = {};
            
            this.validators.Price = function (value) {

                return value.length > 0 ? { isValid: true } : { isValid: false, message: "You must enter a price" };

            };

            this.validators.Quantity = function (value) {

                if (value.length > 0) {
                    if (value == 0) {
                        return { isValid: false, message: "Quantity cannot be 0" };
                    }
                    else {
                        return { isValid: true };
                    }

                }
                else {
                    return { isValid: false, message: "You must enter a quantity" };
                }            

            };

            //this.validators.Quantity = function (value) {

            //    return value == 0 ? { isValid: true } : { isValid: false, message: "Quantity cannot be 0" };

            //};

        },



        validateItem: function (key) {

            return (this.validators[key]) ? this.validators[key](this.get(key)) : { isValid: true };

        },



        validateAll: function () {



            var message = '';



            for (var key in this.validators) {

                if (this.validators.hasOwnProperty(key)) {

                    var check = this.validators[key](this.get(key));

                    if (check.isValid === false) {

                        message = check.message;
                        break;
                    }

                }

            }

            return _.size(message) > 0 ? { isValid: false, message: message } : { isValid: true };

        },



        defaults: {

            id: null,

            HeaderID: "",

            DetailID: "",

            InvtID: "",

            Price: "0",

            Quantity: "0"          

        }



    });



    // Returns the Model class

    return OrderLineModel;



});