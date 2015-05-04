define(["Backbone", "models/AccountModel", "config", "PageSlider"], 
  function (Backbone, AccountModel, cfg, PageSlider) {

    var BaseRouter = Backbone.Router.extend({

      initialize: function () {
        this.slider = new PageSlider($('body'));        
      },

      isAuthorized: function (options) {
        options = options || {};
        var navigateAfterAuthorization = options.navigateAfterAuthorization || true;
        this.account = new AccountModel({ id: 1 });
        this.account.fetch();

        if (!this.account || this.account.get("token") == null) {
          if (navigateAfterAuthorization)
            window.location.href = "#login";

          return false;
        } else {
         var tokenDate = new Date(this.account.get("tokenDate"));
         var tokenExpiredDate = new Date(this.account.get("tokenDate"));
         tokenExpiredDate = new Date(tokenExpiredDate.setHours(tokenExpiredDate.getHours() + 8));
         var currentDate = new Date($.now());

         if (tokenDate <= currentDate && currentDate <= tokenExpiredDate) {
           return true; 
         }
         else{
          window.location.href = "#login";
          return false;
        }
      }


    },

    changePage: function (page, options) {
      page.render();


          // this.waitingPanel.addPanel($(page.el));
    
           // $('body').append($(page.el));

           if (this.slider != null){
               this.slider.slidePage($(page.el));
          }       

         
          if (page.postRender)
            page.postRender();
        },

        sendAuthToken: function (xhr) {
          xhr.setRequestHeader("Authorization",
            "Basic " + window.btoa(this.account.get("token")));
        }
      });

return BaseRouter;

});