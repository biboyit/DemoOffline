// Model
// ==============

// Includes file dependencies
define(["Backbone", "BaseModel"], function (Backbone, BaseModel) {

    // The Model constructor
    var LanguageModel = BaseModel.extend({

        urlRoot: "GetLanguageDefault",

        defaults: {
            Id: null,
            LanguageCode: '',
            Name:'',
			DisplayName: '',
            IsDefault:false,
            IsActive:false,
			IsSelected: false
        },
    });

    // Returns the Model class
    return LanguageModel;
});