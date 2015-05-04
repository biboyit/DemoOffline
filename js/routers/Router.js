// Mobile Router
// =============

// Includes file dependencies
define(["Backbone", "BaseRouter",
    "../models/AccountModel",
    "../models/CustomerModel",
    "../models/OrderModel",
    "../models/OrderLineModel",
    "../models/OrderUploadAttachmentModel",
    "../models/ProductModel",    
    "../models/ReportOrderStatusModel",
    "../models/SiteModel",
    "../models/CustomerShipToAddressModel",
    "../models/LanguageModel",
    "../collections/CustomerCollection",   
    "../collections/LanguageCollection",
    "../collections/OrderCollection",
    "../collections/ProductCollection",
    "../collections/ReportOrderStatusCollection",
    "../collections/ReportStockOnHandCollection",
    "../views/ActionView",
    "../views/CustomersView",
    "../views/CustomerView",
    "../views/CustomerSelectorView",
    "../views/OrdersView",
    "../views/OrderView",
    "../views/OrderLineAddItemView",
    "../views/OrderUploadAttachmentView",    
    "../views/OrderAttachmentView",    
    "../views/LanguageView",
	"../views/LoginView",
    "../views/ProductSelectorView",    

    "../views/ReportOrderStatusSelectorView",
    "../views/ReportOrderStatusDetailView",
    "../views/ReportStockOnHandView",    
    "../views/ReportStockOnHandProductSelectorView",
    "../views/ReportStockOnHandDetailView",

    "../views/MapView",
    "../views/ReportView",
    "config"],
function (Backbone, BaseRouter
    , AccountModel
    , CustomerModel
    , OrderModel
    , OrderLineModel
    , OrderUploadAttachmentModel    
    , ProductModel
    , ReportOrderStatusModel
    , SiteModel
    , CustomerShipToAddressModel
    , LanguageModel

    , CustomerCollection
    , LanguageCollection
    , OrderCollection
    , ProductCollection
    , ReportOrderStatusCollection
    , ReportStockOnHandCollection
    , ActionView
    , CustomersView
    , CustomerView
    , CustomerSelectorView
    , OrdersView
    , OrderView
    , OrderLineAddItemView
    , OrderUploadAttachmentView
    , OrderAttachmentView  
    , LanguageView	
    , LoginView
    , ProductSelectorView
    
    , ReportOrderStatusSelectorView
    , ReportOrderStatusDetailView
    , ReportStockOnHandView    
    , ReportStockOnHandProductSelectorView
    , ReportStockOnHandDetailView

    , MapView
    , ReportView
    , cfg) {

    // Extends Backbone.Router
    var OrderRouter = BaseRouter.extend({

        // Backbone.js Routes
        routes: {
            "": "orders",
            "#": "orders",
            "home": "orders",
            "orders": "orders",
            "order/:id": "order",
            "customer/:customerId/orders": "customerOrders",
            "order/:id/:customerid" : "orderCustomer",
            "orderlineadditem/:headerid/:invtid": "orderLineAddItem",
            "orderlineedititem/:headerid/:detailid/:invtid": "orderLineEditItem",
            "orderselectcustomer/:headerid/:isnew": "orderSelectCustomer",
            "neworder": "newOrder",
            "createneworder/:customerordernumber/:customerid": "createNewOrder",
            "uploadorderfile/:id/:refnbr": "uploadOrderFile",
            "vieworderattachment/:id": "viewOrderAttachment",
			"language": "language",
			"language/:languageCode": "language",
            "login" : "login",
            "product/:headerid/:siteid": "productSelector",
            "customers": "customers",
            "customer": "customers",
            "customer/:id": "customer",
            "customer/:id(/map/:keyword)": "viewMap",
            "reports": "reports",
            "reportorderstatus": "reportOrderStatus",
            "reportorderstatus/:custid/:custname": "reportOrderStatusCustomer",
            "reportorderstatusdetail/:ordernbr": "reportOrderStatusDetail",
            "reportstockonhand": "reportStockOnHand",
            "reportstockonhandfind/:siteid/:search": "reportStockOnHandFind",
            "reportstockonhanddetail/:siteid/:invtid": "reportStockOnHandDetail",
            "logout" : "logout"
        },

        orders: function () {
            if (!this.isAuthorized()) return;          

            var self = this;

            this.salesPersonOrders = new OrderCollection({ account: this.account });
            this.salesPersonOrders.fetch({
                success: function (data) {                    
                    localStorage.setItem('orderss', JSON.stringify(self.salesPersonOrders.models));
                    self.ordersView = new OrdersView({ model: self.salesPersonOrders })
                    self.changePage(self.ordersView);
                },				
				error: function (){                    
                    var salesPersonOrders = new OrderCollection({ account: this.account });
                    var array = JSON.parse(localStorage.getItem('orderss'));

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
                        salesPersonOrders.add(Order);
                    };
                    salesPersonOrders.shift();                  
                    self.ordersView = new OrdersView({ model: salesPersonOrders })
                    self.changePage(self.ordersView);
				}
            });          
        },

        order: function (id) {
            if (!this.isAuthorized()) return;

            var order = new OrderModel({ account: this.account, id: id });
            var customerShipToAddress = new CustomerShipToAddressModel({ account: this.account, headerId: id, customerId: '' });
            var customers = new CustomerModel({ CustomerID: '', CustomerName: '' });
            var account = this.account;
            var self = this;

            $.when(order.fetch(), customers, account, customerShipToAddress.fetch()).done(
                function (orderresult, customerresult, accountresult, customershiptoaddressresult) {
                    var page = new OrderView({ order: orderresult[0], customers: customerresult, account: accountresult, shipaddress: customershiptoaddressresult[0], router: self });
                    self.changePage(page);
                });
        },

        customerOrders: function (customerId) {
            if (!this.isAuthorized()) return;
            var self = this;
            this.customerOrders = new OrderCollection({ account: this.account });
            this.customerOrders.findByCustomer(customerId)
                .done(function (data) {
                    self.changePage(new OrdersView({ model: self.customerOrders, hideMenuPanel: true }));
                });
        },

        orderCustomer: function (id, customerid) {
            if (!this.isAuthorized()) return;

            var custname = window.localStorage.getItem(customerid);
            console.log(custname);
            window.localStorage.removeItem(customerid); 
            
            var order = new OrderModel({ account: this.account, id: id });
            var customerShipToAddress = new CustomerShipToAddressModel({ account: this.account, headerId: id, customerId: customerid });
            var customers = new CustomerModel({ account: this.account, CustomerID: customerid, CustomerName: custname });

            var account = this.account;
            var self = this;           

            $.when(order.fetch(), customers, account, customerShipToAddress.fetch()).done(
                function (orderresult, customerresult, accountresult, customershiptoaddressresult) {
                    console.log(customerresult);
                    var page = new OrderView({ order: orderresult[0], customers: customerresult, account: accountresult, shipaddress: customershiptoaddressresult[0] });
                    self.changePage(page);
                });
        },

        orderLineAddItem: function (headerid, invtid) {
            if (!this.isAuthorized()) return;
            var self = this;

            console.log(this.account);
         
            this.productSearch = new ProductCollection({ account: this.account });
            this.productSearch.searchByInvtID(headerid, invtid)
                .done(function (data) {                    
                    var orderline = new OrderLineModel({ HeaderID: headerid, InvtID: invtid });
                    self.changePage(new OrderLineAddItemView({ model: orderline, product: data, headerid: headerid, isedit: false }));
                });        
        },

        orderLineEditItem: function (headerid, detailid,invtid) {  
            var orderline = new OrderLineModel(headerid, detailid);
            var self = this;

            this.productSearch = new ProductCollection({ account: this.account });
       
            $.when(orderline.fetch(), this.productSearch.searchByInvtID(headerid,invtid )).done(
               function (orderlineresult, productresult) {
                   
                   orderline = new OrderLineModel(orderlineresult[0][0], detailid);                   
                   self.changePage(new OrderLineAddItemView({ model: orderline, product: productresult[0], headerid: headerid, isedit: true }));

               });                    
        },

        orderSelectCustomer: function (headerid, isnew) {
            if (!this.isAuthorized()) return;
            var customers = new CustomerCollection({ account: this.account });            
            var account = this.account;
            var self = this;

            customers.fetch({
                success: function (data) {
                    console.log(data);                   
                    self.changePage(new CustomerSelectorView({ router: self, model: customers, headerid: headerid, isnew: isnew, account: account  }));
                }
            });

           // this.changePage(new CustomerSelectorView({ model: customers, headerid: headerid, isnew: isnew }));
        },

        newOrder: function () {
            if (!this.isAuthorized()) return;
            
            var order = new OrderModel({
                CustomerID: '',
                CustomerName: '',
                CustomerOrderNumber: '',
                HeaderID: null,
                OrderDate: '',
                Remarks: '',
                ShipToID: '',
                SiteID: '',
                Status: 'Draft',
                IsNew: true,
                OrderAttachment: new Object({
                    Description: '',
                    DocumentType: '',
                    ReferenceNbr: '',
                    CreatedDateTime: ''
                })
            });
            
            var customers = new CustomerModel('', '');
            var customerShipToAddress = new CustomerShipToAddressModel({ account: this.account, headerId: '', customerId: '' });
            
            var self = this;
            
            $.when(order.toJSON(), customers, customerShipToAddress.toJSON()).done(
                function (orderresult, customerresult, customerShipToAddress, customershiptoaddressresult) {
                    console.log(orderresult);
                    var page = new OrderView({ order: orderresult, customers: customerresult, shipaddress: customershiptoaddressresult });
                    self.changePage(page);
                });
        },

        createNewOrder: function (customerordernumber, customerid) {

            var custname = window.localStorage.getItem(customerid);
            window.localStorage.removeItem(customerid);

            var neworder = new OrderModel({ account: this.account });
            neworder.url = cfg.getServiceUrl("Order", 'customerid=' + customerid + '&customerordernumber=' + customerordernumber);
            var self = this;
            var account = this.account;

            neworder.fetch({
                success: function (result) {
                    
                    var order = result.toJSON();
                    var headerid = order.HeaderID;

                    console.log(account);
                    
                    var orderlist = new OrderLineCollection();                    
                    var sites = new SiteModel({ account: account });
                    var customerShipToAddress = new CustomerShipToAddressModel({ account: account, headerId: headerid, customerId: '' });
                    var customers = new CustomerModel({ CustomerID: '', CustomerName: '' });
                    var shipVia = new ShipViaModel({ account: this.account });

                    $.when(order, orderlist, sites.fetch(), customerShipToAddress.fetch(), customers, account, shipVia.fetch()).done(
                        function (orderresult, orderlistresult, siteresult, customershiptoaddressresult, customerresult, accountresult, shipviaresult) {
                            var page = new OrderView({ order: orderresult, list: orderlistresult, sites: siteresult[0], shipaddress: customershiptoaddressresult[0], customers: customerresult, account: accountresult, shipvia: shipviaresult[0] });
                            self.changePage(page);
                        });
                }
            });           
        },

        uploadOrderFile: function (id, refnbr) {
            var orderUpload = new OrderUploadAttachmentModel();
            this.changePage(new OrderUploadAttachmentView({ model: orderUpload, headerid: id, refnbr: refnbr }));
        },

        viewOrderAttachment : function(id){
            this.changePage(new OrderAttachmentView({ HeaderID: id }));
        },

        language: function (languageCode) {
            if (!this.isAuthorized()) return;          

            var self = this;
			if ((typeof languageCode) != 'undefined') {
				var locale = localStorage.getItem('locale');
				if (locale != languageCode) {
					localStorage.setItem('locale', languageCode);
					location.reload();
				}
			}
				
            this.languageCollection = new LanguageCollection({ account: this.account });
            this.languageCollection.fetch({
                success: function (data) {
                    localStorage.setItem("ListLanguage", JSON.stringify(self.languageCollection));
                    self.languageView = new LanguageView({ model: self.languageCollection })
                    self.changePage(self.languageView);
                },
                error: function (data) {
                    var languageCollection = new LanguageCollection({ account: this.account });
                    var array = JSON.parse(localStorage.getItem('ListLanguage'));

                    for (var i = 0; i < array.length; i++) {
                        var languages = new LanguageModel({ id: array[i].id });
                        languages.set({
                            "LanguageCode": array[i].LanguageCode,
                            "Name": array[i].Name,
                            "DisplayName": array[i].DisplayName,
                            "IsDefault": array[i].IsDefault,
                            "IsActive": array[i].IsActive,
                            "IsSelected": array[i].IsSelected
                        });
                        languageCollection.add(languages);
                    };
                    languageCollection.shift();
                    self.languageView = new LanguageView({ model: languageCollection })
                    self.changePage(self.languageView);
                }
            });          
        },
		
        login: function () {
            var loginView = new LoginView();
            this.changePage(loginView);
        },

        productSelector: function (headerid, siteid) {

            var products = new ProductCollection();
            var self = this;
            products.searchProduct(headerid, siteid, '');

            
            this.changePage(new ProductSelectorView({ model: products, headerid: headerid, siteid: siteid, router: this }));

        },

        customers: function () {
            if (!this.isAuthorized()) return;
            var self = this;
            this.customers = new CustomerCollection({ account: this.account });
            this.customers.fetch({
                success: function (data) {
                    localStorage.setItem('customerss', JSON.stringify(self.customers.models));
                    self.customersView = new CustomersView({ router: self, model: self.customers, routerid: 'customer' })
                    self.changePage(self.customersView);
                },
                error: function (data) {
                    var customers = new CustomerCollection({ account: this.account });
                    var array = JSON.parse(localStorage.getItem('customerss'));

                    for (var i = 0; i < array.length; i++) {
                        var customer = new CustomerModel({id: array[i].id });
                        customer.set({
                            "CustomerID": array[i].CustomerID,
                            "CustomerName": array[i].CustomerName,
                            "Address1": array[i].Address1,
                            "Address2": array[i].Address2,     
                            "City": array[i].City,
                            "State": array[i].State,
                            "Zip": array[i].Zip,
                            "Country": array[i].Country,
                            "SalesPersonID": array[i].SalesPersonID,
                            "TermsID": array[i].TermsID,
                            "Phone": array[i].Phone,
                            "Email": array[i].Email,
                            "PIC": array[i].PIC,
                            "Outstanding": array[i].Outstanding,
                            "Outstanding1": array[i].Outstanding1,
                            "Outstanding2": array[i].Outstanding2,
                            "Outstanding3": array[i].Outstanding3,
                            "Outstanding4": array[i].Outstanding4,
                            "IsExceedCreditLimit": array[i].IsExceedCreditLimit,
                            "IsOrderComplete": array[i].IsOrderComplete                            
                        });
                        customers.add(customer);
                    };
                    customers.shift();
                    self.customersView = new CustomersView({ router: self, model: customers, routerid: 'customer' })
                    self.changePage(self.customersView);
                }
            });
        },

        customer: function (id) {
            if (!this.isAuthorized()) return;
            var customer = new CustomerModel({ account: this.account, id: id });
            var self = this;
            customer.fetch({
                success: function (data) {
                    self.changePage(new CustomerView({ router: self, model: data, routerid: 'customer' }));
                }
            });
        },

        viewMap: function (id, keyword) {
            this.changePage(new MapView({ model: keyword }));
        },

        reports: function () {
            if (!this.isAuthorized()) return;

            this.changePage(new ReportView());
        },

        reportOrderStatus: function () {
            if (!this.isAuthorized()) return;
            var self = this;
            this.customers = new CustomerCollection({ account: this.account });
            this.customers.fetch({
                success: function (data) {
                    self.changePage(new CustomersView({ router: self, model: self.customers, routerid: 'report', hideMenuPanel: true }));
                },
                error: function () {
                    var customers = new CustomerCollection({ account: this.account });
                    var array = JSON.parse(localStorage.getItem('customerss'));

                    for (var i = 0; i < array.length; i++) {
                        var customer = new CustomerModel({id: array[i].id });
                        customer.set({
                            "CustomerID": array[i].CustomerID,
                            "CustomerName": array[i].CustomerName,
                            "Address1": array[i].Address1,
                            "Address2": array[i].Address2,     
                            "City": array[i].City,
                            "State": array[i].State,
                            "Zip": array[i].Zip,
                            "Country": array[i].Country,
                            "SalesPersonID": array[i].SalesPersonID,
                            "TermsID": array[i].TermsID,
                            "Phone": array[i].Phone,
                            "Email": array[i].Email,
                            "PIC": array[i].PIC,
                            "Outstanding": array[i].Outstanding,
                            "Outstanding1": array[i].Outstanding1,
                            "Outstanding2": array[i].Outstanding2,
                            "Outstanding3": array[i].Outstanding3,
                            "Outstanding4": array[i].Outstanding4,
                            "IsExceedCreditLimit": array[i].IsExceedCreditLimit,
                            "IsOrderComplete": array[i].IsOrderComplete                            
                        });
                        customers.add(customer);
                    };
                    customers.shift();
                    self.changePage(new CustomersView({ router: self, model: customers, routerid: 'report', hideMenuPanel: true }));  
                }
            });
        },

        reportOrderStatusCustomer: function (custid, custname) {
            if (!this.isAuthorized()) return;
            var self = this;
            this.reportOrderStatus = new ReportOrderStatusCollection({ account: this.account });

            this.reportOrderStatus.getReportByCustomerID(custid)
              .done(function (data) {
                  self.changePage(new ReportOrderStatusSelectorView({ router: self, model: self.reportOrderStatus, custid: custid, custname: custname }));

              });
        },

        reportOrderStatusDetail: function (orderNbr) {
            if (!this.isAuthorized()) return;
            var self = this;
            console.log(orderNbr);
            var reportOrderStatus = new ReportOrderStatusCollection({ account: this.account, OrderNbr: orderNbr });



            $.when(reportOrderStatus.fetch()).done(
             function (reportOrderStatusresult) {

                 var page = new ReportOrderStatusDetailView({ router: self, detail: reportOrderStatusresult.ReportOrderDetail, total: reportOrderStatusresult.ReportOrderDetailTotal, statusUpdate: reportOrderStatusresult.ReportOrderUpdateStatus });
                 self.changePage(page);
             });

        },

        reportStockOnHand: function () {
            if (!this.isAuthorized()) return;
            var sites = new SiteModel({ account: this.account });

            var self = this;

            $.when(sites.fetch()).done(
                function (siteresult) {
                    localStorage.setItem("siteresult", JSON.stringify(siteresult));
                    var page = new ReportStockOnHandView({ router: self, model: siteresult });
                    self.changePage(page);
                });
            $.when(sites.fetch()).fail(function () {
                var siteresult = JSON.parse(localStorage.getItem("siteresult"));
                var page = new ReportStockOnHandView({ router: self, model: siteresult });
                self.changePage(page);                
            });
        },

        reportStockOnHandFind: function (siteid, search) {
            if (!this.isAuthorized()) return;
            var self = this;
            this.productSearch = new ProductCollection({ account: this.account });
            this.productSearch.searchProduct(siteid, search, '')
                .done(function (data) {
                    self.changePage(new ReportStockOnHandProductSelectorView({ model: data }));                    
                });

            

           
        },

        reportStockOnHandDetail: function (siteid, invtid) {
            if (!this.isAuthorized()) return;
            var reportStockOnHand = new ReportStockOnHandCollection({ account: this.account, SiteID: siteid, InvtID: invtid });
            var product = new ProductModel({ id: invtid });

            var self = this;

            $.when(reportStockOnHand.fetch(), product.fetch()).done(
             function (reportStockOnHandresult, productresult) {
                 var page = new ReportStockOnHandDetailView({ router: self, detail: productresult[0], list: reportStockOnHandresult, siteid: siteid });
                 self.changePage(page);
             });

        },

        logout: function () {

            var self = this;
            var account = new AccountModel({ id: 1 });

            account.fetch();
            console.log('Signing out... ');

            account.destroy({
                success: function (model, response) {
                    console.log(['Signed out as: ', model]);
                    self.navigate("", { trigger: true, replace: true });
                }
            });

        },

        
    });

    // Returns the Router class
    return OrderRouter;

});