define(["i18n!nls/labels", "Backbone", "tpl", "config", "BaseView", "models/AccountModel", "models/LoginModel", "collections/LanguageCollection"]
    , function (i18n, Backbone, tpl, cfg, BaseView, AccountModel, LoginModel, LanguageCollection) {

    var LoginView = BaseView.extend({       

        viewTemplate: 'login',

        events: {
            "click #loginButton": "login"
        },

        // Renders all of the Category models on the UI
        render: function () {

            this.login = new LoginModel({ id: 1 });
            this.login.fetch();

            if (this.login || this.login.get("isRemember") != null) {
                
                var compiledTemplate = this.template({
                    i18n: i18n,
                    data: this.login.toJSON()
                });
                this.$el.html(compiledTemplate);
                return this;
                
            } else {
                this.login = null;
                
                $("#chkRemember").attr('checked', false);
                var compiledTemplate = this.template({
                    i18n: i18n,
                    data: null
                });
                this.$el.html(compiledTemplate);
                return this;
            }
            

           
        },

        login: function (event) {
            event.preventDefault(); 
            $('.alert-error').hide();
            var url = cfg.getServiceUrl("authtoken");
            var username = $('#userName').val();
            var password = $('#password').val();
            var isRemember = $('#chkRemember').is(':checked');

            if (isRemember) {

                if (this.login == null) {
                    this.login = new LoginModel({ id: 1 });
                    this.login.fetch();
                }
                this.login.set({ 
                    "username" : username,
                    "password" : password,
                    "isRemember" : true
                });

                this.login.save();
            }


            var self = this;

            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password));                    
                }
            })
            .done(function (data) {                
                if (data.error) {  // If there is an error, show the error messages
                    cfg.showAlert(data.error.text, null, i18n.message.error , i18n.button.oK);                    
                } else {
                    var account = new AccountModel({ id: 1 });
                    account.fetch();
                    account.set({
                        "userName": data.UserName,
                        "token": data.Token,
                        "salesPersonId": data.SalesPersonId,
                        "isLoggedIn": true,
                        "tokenDate" : new Date($.now())                      
                    });
					account.save();
					
					account = new AccountModel({ id: "1a" });
                    account.fetch();
                    account.set({
                        "userName": data.UserName,
                        "token": data.Token,
                        "salesPersonId": data.SalesPersonId,
                        "isLoggedIn": true,
                        "tokenDate" : new Date($.now())                      
                    });
					account.save();					
					
					var currentLanguageCode = localStorage.getItem('locale');
					if(currentLanguageCode == null) {
						var languageCollection = new LanguageCollection({ account: account });
						languageCollection.fetch({
							success: function (data) {
								_.each(languageCollection.models, function (language) {
									if(language.get('IsDefault') == true) {
										localStorage.setItem('locale', language.get('LanguageCode'));
										location.reload();
									}
								}, this);
							}
						}); 
					}
			
                    window.location.href = "#";
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {   
            	/// start
								
			    var account = new AccountModel({ id: '1a' });
					account.fetch();
                    account.set({
                        "id": 1                                              
                    });
                    account.save();
					
					var currentLanguageCode = localStorage.getItem('locale');
					if(currentLanguageCode == null) {
						var languageCollection = new LanguageCollection({ account: account });
						languageCollection.fetch({
							success: function (data) {
								_.each(languageCollection.models, function (language) {
									if(language.get('IsDefault') == true) {
										localStorage.setItem('locale', language.get('LanguageCode'));
										location.reload();
									}
								}, this);
							}
						}); 
					}
			
                    window.location.href = "#";
				
				/// end
				//console.log(jqXHR);
            	//console.log(textStatus);
            	//console.log(errorThrown);             
                //cfg.showAlert(i18n.message.pleaseProvideAValidUsernameAndPassword_, null, i18n.message.error, i18n.button.oK);               
            });
        }

    });

    return LoginView;
});