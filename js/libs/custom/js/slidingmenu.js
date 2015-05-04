function SlidingMenu(){

	var viewport,
	page,
	pageContent,
	slidingMenu,
	slidingMenuContent,
	isMenuOpen = false,
	visiblePageMargin = 55,
	maximumMenuWith = 500,
	blocker;

	this.openMenu = function () {
		page = $('.page');     
        slidingMenu  = $("#slidingMenu");
        slidingMenuContent =$("#slidingMenuContent");
        blocker = $(".blocker");

        viewport = {
        	width  : $(window).width(),
        	height : $(window).height()
        };

        var menuWidth = viewport.width - visiblePageMargin;

        if(viewport.width > (maximumMenuWith+visiblePageMargin) ){
        	menuWidth = maximumMenuWith;    
        } 

        slidingMenu.show();
        blocker.show();

        this.adjustHeight(slidingMenu,page, slidingMenuContent, blocker);
        
        page.removeClass('page-center');
        page.addClass('slide-left');
        page.css({left: menuWidth + "px"});
        console.log(menuWidth);        
        slidingMenu.css({left: -menuWidth+"px" , width: menuWidth+"px"});
        slidingMenuContent.css({width: menuWidth+"px"});

	}

	this.adjustHeight = function(slidingMenu, page, slidingMenuContent, blocker)
	{
		var menuHeight = slidingMenu.height();
		var pageHeight = page.height();
		var MenuContentHeight = slidingMenuContent.height();

        //to avoid overflow block on Android < 2.3
        if(pageHeight < menuHeight){
        	slidingMenu.css("height",MenuContentHeight+"px");   
        	page.css("height",MenuContentHeight+"px");  
        	blocker.css("height",MenuContentHeight+"px"); 
        } 
        else{
        	blocker.css("height",pageHeight+"px"); 
        	slidingMenu.css("height",pageHeight+"px");
        }     
    }

    this.closeMenu =function(){
    	page = $('.page');     
        slidingMenu  = $("#slidingMenu");
        slidingMenuContent =$("#slidingMenuContent");
        blocker = $(".blocker");

        page.css({left: "0px"});

        slidingMenu.hide();
        blocker.hide();
    	
    }

    this.addSlidingMenu = function(page){
        console.log(page);
    }

}