define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "config"], function (i18n, Backbone, tpl, BaseView, cfg) {

    var OrderLineAddItemView = BaseView.extend({
       
         initialize: function (option) {            
            this.template = _.template(tpl.get('orderline-add-item'));
            this.model = option.model;
            this.product = option.product;
            this.headerid = option.headerid;
            this.isedit = option.isedit;
        },

        render: function () {
            var compiledTemplate = this.template({
                i18n: i18n,
                item: this.model.toJSON(), 
				product: this.product 
            });
            this.$el.html(compiledTemplate);
			
            if (!this.isedit) {
                this.$el.find("a#delete").hide();
                
            }

            this.$el.find("#btnsubmit").hide();
            return this;
        },

        events: {
            "change": "change",
            "click #save": "beforeSave",
            "submit #form1": "beforeSave",
            "click #delete": "confirmDelete",
            "click .go-back": "goBack" 
        },

        change: function (event) {
            

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            
            this.model.set(change);

            // Run validation rule (if any) on changed item
            //var check = this.model.validateItem(target.id);
            //if (check.isValid === false) {
            //    cfg.showAlert(check.message, null, 'Error', 'OK');
            //} else {
            //   // alert(target.id);
            //}
            
        },

        beforeSave: function (e) {
            e.preventDefault();

            var price = $(this.el).find("#Price").val();
            var quantity = $(this.el).find("#Quantity").val();

            if (!$.isNumeric(price)) {
                cfg.showAlert(i18n.message.youMustEnterAPrice, null, i18n.message.error, i18n.button.oK);
                return false;
            }

            if (!$.isNumeric(quantity)) {
                cfg.showAlert(i18n.message.youMustEnterAQuantity, null, i18n.message.error, i18n.button.oK);
                return false;
            }
            else if (quantity == 0) {
                cfg.showAlert(i18n.message.quantityCannotBe0, null, i18n.message.error, i18n.button.oK);
                return false;
            }
          
            if (this.isedit === true)
                this.updateProduct();
            else
                this.saveProduct();
        },

        saveProduct: function () {
            var self = this;
            var headerid = this.headerid;
                        
            this.model.save(null, {
                success: function (model) {                                                    
                    window.location.href = '#order/' + headerid;                   
                },
                error: function () {
                    cfg.showAlert(i18n.message.anErrorOccurredWhileTryingToSaveThisItem, null, i18n.message.error, i18n.button.oK);
                }
            });
        },
        updateProduct: function () {
            var self = this;
            var headerid = this.headerid;

            this.model.save(this.model.toJSON(), {
                success: function (model) {                    
                    window.history.back();
                },
                error: function () {
                    cfg.showAlert(i18n.message.anErrorOccurredWhileTryingToUpdateThisItem, null, i18n.message.error, i18n.button.oK);                    
                }
            });
        },

        confirmDelete: function (button) {
            self = this;
            cfg.showConfirm(i18n.message.doYouWantToDeleteThisItem_,
                            function (button) {                               
                                    if (button == 1)
                                        self.deleteProduct();                                
                            }, i18n.message.deleteOrder, i18n.button.yes_No);

        },

        deleteProduct: function () {
            
            var headerid = this.headerid;
            
            this.model.destroy({
                success: function () {
                    window.location.href = '#order/' + headerid;
                },
                error: function () {
                    cfg.showAlert(i18n.message.anErrorOccurredWhileTryingToDeleteThisItem, null, i18n.message.error, i18n.button.oK);
                }
            });

        }
    });

    return OrderLineAddItemView;
});