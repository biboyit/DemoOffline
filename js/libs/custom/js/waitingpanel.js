function WaitingPanel(){

    var titleText = 'Please Wait';

    this.addPanel = function(page, message){
        page.append('<div class="waitings"><div id="my-waiting" class="waiting"><header class="waiting-title-region"><h1 class="title">' + titleText +'</h1></header><div class="waiting-content"><div class="inset"><p><img src="img/ajax-loader.gif" /> ' + message +'</p></div></div></div></div>');

    }

    this.center = function(target){
        var width = target.width(),
        height = target.height();

        var left = (window.innerWidth / 2) - (width / 2),
        top = (window.innerHeight / 2) - (height / 2);

        target.css({left: left + 'px', top: top + 'px'});
    }

    this.show = function(){        
        var self = $('#my-waiting');
        
       this.center(self);

        self.parent().addClass('on'); 

        self.parent().off('webkitTransitionEnd');
        self.parent().on('webkitTransitionEnd', onTransitionEnd);

        setTimeout((function () {
            self.parent().addClass('fade-in'); // Sets opacity to 1
            }).bind(this), 2000);

        function onTransitionEnd() {
                self.parent().off('webkitTransitionEnd', onTransitionEnd);
                self.addClass('on');
                self.addClass('push');

                $('.waitings').bind('touchend', (function(e) {
                  if (e.target === $('.waitings')) {                  
                    this.hide();
                }
            }).bind(this), false);
        }
    }

    this.hide = function(){
        var self = $('#my-waiting');

      self.removeClass('push');
      self.parent().removeClass('on');     
      self.parent().removeClass('pop');

      self.bind('webkitAnimationEnd', onAnimationEnd);

      $('.waitings').off('touchend');

      function onAnimationEnd() {
        self.off('webkitAnimationEnd', onAnimationEnd);
        self.removeClass('pop');
        self.parent().removeClass('fade-in');
        self.parent().off('webkitTransitionEnd', onTransitionEnd);
      }

      function onTransitionEnd() {
        self.parent().off('webkitTransitionEnd', onTransitionEnd);
        self.parent().removeClass('on');
      }

    }

}