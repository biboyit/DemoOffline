// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "views/OrderLineListView", "models/OrderModel", "config"], function (i18n, Backbone, tpl, BaseView, OrderLineListView, OrderModel, cfg) {

    // Extends Backbone.View
    var OrderView = BaseView.extend({

        initialize: function (option) {

            this.template = _.template(tpl.get('order'));
            this.order = option.order;
            this.customer = option.customers.toJSON();
            this.shipaddress = option.shipaddress;
            this.account = option.account;
            this.isEdit = false;            
            this.router = option.router;
        },


        events: {
            "change input": "change",
            "change select": "change",
            'click input#CustomerName': 'selectCustomer',
            'click a#CustomerName': 'selectCustomer',
            'click a#btnSave': 'updateOrder',
            'click ul#navbar a': 'showAttach',
            'click ul#navclick a': 'showAttach',
            'click a#btnAddProduct': 'addOrderLine',
            'click a#btnDelete': 'confirmDelete',
            'click a#btnSubmit': 'confirmSubmit',
            'click a#btnMore': 'showMenu',
            'click a#btnUpload': 'uploadAttachment',
            'focus input#Remarks': 'focusRemarks',
            'click div#btnBack': 'goBack',
            'click a#btnBack': 'goBack',
            'click a.CustomerName': 'selectCustomer',
            'touchend .shipToID-item': 'selectShipToID'
        },

        change: function (event) {

            this.isEdit = true;
        },

        selectShipToID: function (e) {


            $(this.el).find(".shipToID").text(e.target.text);
            $(this.el).find(".shipToID").trigger('click');
        },

        confirmDelete: function (button) {
            self = this;
            cfg.showConfirm(i18n.message.doYouWantToDeleteThisOrder_,
                function (button) {
                    if (button == 1)
                        self.deleteOrder();

                }, i18n.message.deleteOrder, i18n.button.yes_No);

        },

        confirmSubmit: function (button) {
            self = this;

            if (cfg.isDevice()) {
                cfg.showConfirm(i18n.message.doYouWantToSubmitThisOrder_,
                    function (button) {
                        console.log(button);
                        if (button == 1)
                            self.submitOrder();
                    }, i18n.message.submitOrder, i18n.button.yes_No);
            }
            else {
                self.submitOrder();
            }

        },

        goBack: function () {
            self = this;
            if ((this.isEdit) && (this.order.IsNew == false)) {
                cfg.showConfirm(i18n.message.doYouWantToSaveYourChanges_,
                    function (button) {
                        console.log(button);
                        if (button == 1) {
                            self.updateOrder();
                        }
                        else {
                            window.location.href = '#';
                        }
                    }, i18n.message.saveChanges, i18n.button.yes_No);
            }
            else {
                window.location.href = '#';
            }
        },

        updateOrder: function () {
            this.saveOrder(false, true);
        },

        submitOrder: function () {
            var totalItem = $(this.el).find("#OrderLineList li").size();
            var ShipToID = $(this.el).find("#ShipToID").val();
            var SiteID = $(this.el).find("#SiteID").val();

            if (SiteID == null || SiteID.length == 0) {
                cfg.showAlert(i18n.message.siteIDCannotBeEmpty, null, i18n.message.error, i18n.button.oK);
                return;
            }

            if (ShipToID.length == 0) {
                cfg.showAlert(i18n.message.shipToCannotBeEmpty, null, i18n.message.error, i18n.button.oK);

                return;
            }
            if (totalItem == 0) {
                cfg.showAlert(i18n.message.itemCannotBeEmpty, null, i18n.message.error, i18n.button.oK);
                return;
            }

            this.saveOrder(true, true);
        },

        saveOrder: function (iscompleted, redirect) {
            var order = new OrderModel({ account: this.account, id: this.order.HeaderID });
            var _orderdate = this.order._OrderDate;
            var _createddatetime = this.order._CreatedDateTime;
            order.toJSON();

            var token = this.account.get("token");
            console.log(token);
            console.log(window.btoa(token));

            var isEdit = this.isEdit;


            order.save(
            {

                id: this.order.HeaderID,
                CustomerID: (this.customer.CustomerID == '') ? this.order.CustomerID : this.customer.CustomerID,
                CustomerName: (this.customer.CustomerName == '') ? this.order.CustomerName : this.customer.CustomerName,
                CustomerOrderNumber: $(this.el).find("#CustomerOrderNumber").val(),
                HeaderID: this.order.HeaderID,
                Remarks: $(this.el).find("#Remarks").val(),
                SalesPersonID: this.order.SalesPersonID,
                ShipToID: $(this.el).find("#ShipToID").val(),
                SiteID: $(this.el).find("#SiteID").val(),
                ShipViaID: $(this.el).find("#ShipViaID").val(),
                IsCompleted: iscompleted,
                _OrderDate: _orderdate,
                _CreatedDateTime: _createddatetime,
                OrderAttachment: new Object({
                    Description: $(this.el).find("#OrderAttachment_Description").val(),
                    DocumentType: $(this.el).find("#OrderAttachment_DocumentType").val(),
                    ReferenceNbr: $(this.el).find("#OrderAttachment_ReferenceNbr").val(),
                })
            },
            {
                account: this.account,
                wait: true,
                success: function (model) {
                    if (redirect) {
                        cfg.showAlert(i18n.message.orderSavedSuccessfully, null, i18n.message.success, i18n.button.oK);

                        if ((iscompleted) || (isEdit))
                            window.location.href = '#';
                    }
                    else {
                        return true;
                    }
                },
                error: function (model, response) {
                    console.log(model);
                    console.log(response);
                    cfg.showAlert(i18n.message.anErrorOccurredWhileTryingToUpdateThisOrder, null, i18n.message.error, i18n.button.oK);
                }
            });

        },

        selectCustomer: function (event) {


            if (this.order.IsNew) {
                var custordnbr = $(this.el).find("#CustomerOrderNumber").val();

                if (custordnbr.length > 0)
                    window.location.href = '#orderselectcustomer/' + custordnbr + '/' + true;
                else
                    cfg.showAlert(i18n.message.pleaseEnterTheCustomerOrderNumber, null, i18n.message.error, i18n.button.oK);
            }
            else {
                window.location.href = '#orderselectcustomer/' + this.order.HeaderID + '/' + false;
            }
        },

        addOrderLine: function (event) {
            var siteid = $(this.el).find("#SiteID").val();
            var headerid = this.order.HeaderID;

            $.when(this.saveOrder(false, false)).done(function () {
                this.router.navigate('product/' + headerid + '/' + siteid, { trigger: true });
            });

        },

        showAttach: function (event) {
            var tab = $(event.target).parent().attr('id');

            tab = $.trim(tab);

            $(this.el).find("#detailtab").hide();
            $(this.el).find("#listtab").hide();
            $(this.el).find("#attachtab").hide();
            $(this.el).find("#btnSave").show();
            $(this.el).find("#btnAddProduct").hide();

            $(this.el).find("#tab1").removeClass("active");
            $(this.el).find("#tab2").removeClass("active");
            $(this.el).find("#tab3").removeClass("active");

            $(this.el).find("#detailtab").removeClass("active");
            $(this.el).find("#listtab").removeClass("active");
            $(this.el).find("#attachtab").removeClass("active");

            if (this.order.IsNew) {
                $(this.el).find("#btnSave").hide();
                $(this.el).find("#btnDelete").hide();
                $(this.el).find("#btnSubmit").hide();
                $(this.el).find("#btnAddProduct").hide();
                $(this.el).find("#aover").hide();

            }

            if (tab == "tab1") {
                $(this.el).find("#tab1").addClass("active");
                $(this.el).find("#detailtab").addClass("active");
                $(this.el).find("#detailtab").show();

                $(this.el).find("#btnAddProduct").hide();
            }
            else if (tab == "tab2") {
                var siteid = $(this.el).find("#SiteID").val();
                if (this.order.Status != "Draft") {
                    siteid = this.order.SiteID;
                    $(this.el).find("#OrderLineList > li > a").removeAttr('href');
                }

                if (this.order.IsNew) {
                    cfg.showAlert(i18n.message.pleaseSelectTheCustomerAndSiteID__CustomerCannotBeEmpty, null, i18n.message.error, i18n.button.oK);
                    $(this.el).find("#tab1").addClass("active");
                    $(this.el).find("#detailtab").addClass("active");
                    $(this.el).find("#detailtab").show();
                }
                else if (siteid == undefined) {
                    cfg.showAlert(i18n.message.pleaseSelectSiteID_, null, i18n.message.error, i18n.button.oK);
                    $(this.el).find("#tab1").addClass("active");
                    $(this.el).find("#detailtab").addClass("active");
                    $(this.el).find("#detailtab").show();
                }
                else if (this.order.Status == "Draft") {
                    $(this.el).find("#btnAddProduct").show();
                    $(this.el).find("#tab2").addClass("active");
                    $(this.el).find("#listtab").addClass("active");
                    $(this.el).find("#listtab").show();
                }
                else {

                    $(this.el).find("#tab2").addClass("active");
                    $(this.el).find("#listtab").addClass("active");
                    $(this.el).find("#listtab").show();


                }
            }
            else if (tab == "tab3") {
                if (this.order.IsNew) {
                    cfg.showAlert(i18n.message.pleaseSelectTheCustomer__CustomerCannotBeEmpty, null, i18n.message.error, i18n.button.oK);
                    $(this.el).find("#tab1").addClass("active");
                    $(this.el).find("#detailtab").addClass("active");
                    $(this.el).find("#detailtab").show();
                }
                else {
                    $(this.el).find("#tab3").addClass("active");
                    $(this.el).find("#attachtab").addClass("active");
                    $(this.el).find("#attachtab").show();

                }
            }

            //            $(this.el).find("#btnGroup").controlgroup("option", "corners", false);
        },
        // Renders all of the Category models on the UI
        render: function (eventName) {
          
            $(this.el).html(this.template({
                i18n: i18n,
                order: this.order,
                sites: this.order.Sites,
                shipaddress: this.shipaddress,
                customer: this.customer,
                shipvia: this.order.ShipVias
            }));

            $(this.el).find("#listtab").hide();
            $(this.el).find("#attachtab").hide();
            $(this.el).find("#btnAddProduct").hide();



            if (this.order.IsNew) {
                $(this.el).find("#btnSave").hide();
                $(this.el).find("#btnMore").hide();
                $(this.el).find("#btnDelete").hide();
                $(this.el).find("#btnSubmit").hide();
                $(this.el).find("#aover").hide();

            }
            this.listView = new OrderLineListView({ el: $('ul#OrderLineList', this.el), model: this.order.OrderItems });
            this.listView.render();

            if (!this.order.IsNew) {
                if (this.order.OrderItems.length > 0) {
                     
                    $(this.el).find("#SiteID").attr("disabled", true);
                 }
             }
            /* 
             if (cfg.isAndroidThemeEnabled()) {
                 $(this.el).find("#tab1").addClass("ui-active-tab");
             }
             */
            $(this.el).find("#tab1").addClass("active");
            $(this.el).find("#detailtab").addClass("active");
            $(this.el).find("#detailtab").show();

            return this;
        },


        deleteOrder: function (event) {
            var order = new OrderModel({ account: this.account, id: this.order.HeaderID });
            order.destroy({
                account: this.account,
                wait: true,
                success: function (model) {
                    window.location.href = '#';
                },
                error: function (model, response) {
                    console.log(model);
                    console.log(response);
                    cfg.showAlert(i18n.message.anErrorOccurredWhileTryingToDeleteThisOrder, null, i18n.message.error, i18n.button.oK);
                }
            });
        },

        showMenu: function () {

            $(this.el).find("#positionWindow").popup('open');
        },

        uploadAttachment: function () {
            var refordnbr = $(this.el).find("#OrderAttachment_ReferenceNbr").val();
            var self = this;
            if (refordnbr.length > 0) {

                $.when(this.saveOrder(false, false)).done(function () {
                    window.location.href = '#uploadorderfile/' + self.order.HeaderID + '/' + refordnbr;// this.router.navigate('product/' + headerid + '/' + siteid, { trigger: true });
                });
                //self.updateOrder();
               
            }
            else
                cfg.showAlert(i18n.message.pleaseEnterTheReferenceOrderNumber, null, i18n.message.error, i18n.button.oK);
        },

        focusRemarks: function (e) {
            e.preventDefault(); e.stopPropagation();
            window.scrollTo(0, 0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px. 
        }




    });

    return OrderView;
});