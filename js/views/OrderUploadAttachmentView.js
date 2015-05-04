// Category View
// =============

// Includes file dependencies
define(["i18n!nls/labels", "Backbone", "tpl", "BaseView", "models/OrderUploadAttachmentModel", "config"], function (i18n, Backbone, tpl, BaseView, OrderUploadAttachmentModel, cfg) {

    // Extends Backbone.View
    var OrderView = BaseView.extend({

        // The View Constructor
        initialize: function (option) {
            this.template = _.template(tpl.get('order-upload-attachment'));
            this.model = option.model;
            this.headerid = option.headerid;
            this.refnbr = option.refnbr;

            this.waitingpanel = $('.waitings');
            console.log(this.waitingpanel);



        },

        events: {
            'click a#btnTakePicture': 'takePicture',
            'click a#btnSelectPicture': 'selectPicture',
            'click a#btnUpload': 'uploadPicture',
            'click a#btnUploadBB': 'uploadPictureBB',
            "click .go-back": "goBack"
        },

        render: function (eventName) {
            var compiledTemplate = this.template({
                i18n: i18n,
                data: this.model.toJSON()
            });
            this.$el.html(compiledTemplate);

            // if (cfg.isBB10ThemeEnabled()) {
            //     $(this.el).find("#btnUpload").hide();
            //     $(this.el).find("#btnSelectPicture").hide();
            // }
            // else if (cfg.isAndroidThemeEnabled()) {
            //     $(this.el).find("#btnUploadBB").hide();
            // }


        },

        takePicture: function () {
            var img = $(this.el).find("#camera_image");

            navigator.camera.getPicture(
            function (uri) {

                img.attr('src', uri);


            },
            function (e) {
                cfg.showAlert(i18n.message.errorGettingPicture__X.replace(/%1s/, e), null, i18n.message.error, i18n.button.oK);
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI });
        },

        selectPicture: function () {
            var img = $(this.el).find("#camera_image");

            navigator.camera.getPicture(
           function (uri) {

               img.attr('src', uri);

           },
           function (e) {
               cfg.showAlert(i18n.message.errorGettingPicture__X.replace(/%1s/, e), null, i18n.message.error, i18n.button.oK);
           },
           { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, mediaType: navigator.camera.MediaType.ALLMEDIA });
        },

        uploadPicture: function () {
            this.waitingpanel.addClass('on');
            // Get URI of picture to upload

            var img = $(this.el).find("#camera_image");

            var headerid = this.headerid;
            var refnbr = this.refnbr;
            var self = this;

            var imageURI = img.attr('src');

            //if (!imageURI) {

            //    cfg.showAlert("Take picture or select picture from library first.", null, 'Error', 'OK');                
            //    return;
            //}

            // Verify server has been entered            

            server = cfg.getServiceUrl("OrderAttachment")//, "HeaderId=" + headerid);
            if (server) {
                self.waitingpanel.addClass('on');
                // Specify transfer options
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = false;

                var params = new Object();
                params.headerid = headerid;
                params.referencenbr = refnbr;

                options.params = params;

                // Transfer picture to server
                var ft = new FileTransfer();

                ft.upload(imageURI, encodeURI(server), function (r) {
                    self.waitingpanel.removeClass('on');
                    self.waitingpanel.addClass('fade-in');
                    console.log('successful');
                    cfg.showAlert(i18n.message.uploadSuccessful__X_BytesUploaded_.replace(/%1d/, r.bytesSent), null, i18n.message.success, i18n.button.oK);
                }, function (error) {
                    self.waitingpanel.removeClass('on');
                    self.waitingpanel.addClass('fade-in');
                    cfg.showAlert(i18n.message.uploadFailed__Code___X___Y___Z.replace(/%1s/, error.code).replace(/%2s/, error.source).replace(/%3s/,error.target), null, i18n.message.error, i18n.button.oK);
                }, options, true);
            }
        },

        uploadPictureBB: function () {
            try {
                // Get URI of picture to upload

                var img = $(this.el).find("#camera_image");

                var headerid = this.headerid;
                var refnbr = this.refnbr;


                var imageURI = img.attr('src');

                if (!imageURI) {
                    showAlert(i18n.message.takePictureFirst_, null, i18n.message.error, i18n.button.oK);
                    return;
                }
                server = cfg.getServiceUrl("OrderAttachment");

                parameters = { headerid: headerid, referencenbr: refnbr };
                options = {
                    fileKey: "file",
                    fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
                    mimeType: "image/jpeg",
                    params: parameters,
                    chunkedMode: false
                };

                blackberry.io.filetransfer.upload(imageURI
                    ,
                    server, //use address of server where you are uploading
                    function (r) {

                        cfg.showAlert(i18n.message.uploadSuccessful__X_BytesUploaded_.replace(/%1s/, r.bytesSent), null, i18n.message.error, i18n.button.oK);
                        //alert("Upload successful");
                        //console.log("Bytes sent: " + result.bytesSent);
                        //console.log("Response code: " + result.responseCode);
                        //console.log("Response: " + result.response);
                    },
                    function (error) {

                        cfg.showAlert(i18n.message.uploadFailed__Code___X___Y___Z.replace(/%1s/, error.code).replace(/%2s/, error.source).replace(/%3s/, error.target), null, i18n.message.error, i18n.button.oK);
                        //console.log("Error code: " + result.code);
                        //console.log("Source: " + result.source);
                        //console.log("Target: " + result.target);
                        //console.log("HTTP Status: " + result.http_status);
                    }
                    ,
                   options
                );
            }
            catch (e) {

                cfg.showAlert(i18n.message.exceptionInUpload__X.replace(/%1s/, e), null, i18n.message.error, i18n.button.oK);
            }
        }
    });

    return OrderView;
});