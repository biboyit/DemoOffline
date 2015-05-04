define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "libs/gmaps"]
    , function (i18n, Backbone, tpl, BaseView, GMaps) {

    var MapView = BaseView.extend({
        
        initialize: function () {
            this.template = _.template(tpl.get('map'));
            this.$el.html(this.template(this.model));
        },

        events: {
            "keyup .search-query": "search",
            "click .search-query + a.ui-input-clear": "clearSearch",
            "click .go-back": "goBack" 
        },
        
        getRealContentHeight: function () {
            var header = this.$el.find("div[data-role='header']:visible");
            var footer = this.$el.find("div[data-role='footer']:visible");
            var content = this.$el.find("div[data-role='content']:visible:visible");
            var viewport_height = $(window).height();

            var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
            if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
                content_height -= (content.outerHeight() - content.height());
            } 
            return content_height;
        },

        postRender: function() {
            var mapEl = this.$el.find('#map');
            this.map = new GMaps({
                el: mapEl[0],
                lat: 3.683373,
                lng: 101.99707
            });

            var self = this;
            this.$el.find('#search').val(this.model);
            this.getGeocode(this.model, function (status, latlng) {
                if (status == 'OK') {
                    self.setMapLocation(latlng, self.model);
                } else {
                    self.$el.find('#message').html(status);
                }
            });
        },

        getGeocode: function(keyword, callback) {
            GMaps.geocode({
                address: keyword.replace('null', ''),
                callback: function (results, status) {
                    console.log('Geocode status: ' + status);
                    var latlng = results[0].geometry.location;
                    if (status == 'OK') {
                        callback(status, latlng);
                    } else {
                        callback(status);
                    }
                }
            });
        },

        render: function () {
            console.log('Render map: ' + this.model);
			var compiledTemplate = this.template({
				i18n: i18n,
				data: this.model
			});
			this.$el.html(compiledTemplate);
            return this;
        },

        setMapLocation: function (latlng, keyword) {
            console.log(['setMapLocation geometry location: ', latlng]);
            this.$el.find('#map').css('height', this.getRealContentHeight());
            this.$el.find('#map').css('width', '100%');
            this.map.refresh();
            this.map.setCenter(latlng.lat(), latlng.lng());
            this.map.removeMarkers();
            this.map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng(),
                infoWindow: {
                    content: '<strong>' + keyword + '</strong>'
                }
            });
            this.map.refresh();
        },

        search: function (event) {
            if(event.keyCode != 13) return;
            var self = this;
            var keyword = $('.search-query').val();
            if (keyword.length <= 2) return;
            console.log('Search map: ' + keyword);
            this.getGeocode(keyword, function (status, latlng) {
                if (status == 'OK') {
                    self.setMapLocation(latlng, keyword);
                } else {
                    self.$el.find('#message').html(status);
                }
            });
        },

        clearSearch: function (event) {
            var self = this;
            var keyword = this.model;
            this.getGeocode(keyword, function (status, latlng) {
                if (status == 'OK') {
                    self.setMapLocation(latlng, keyword);
                } else {
                    self.$el.find('#message').html(status);
                }
            });
        }
    });

    return MapView;
});