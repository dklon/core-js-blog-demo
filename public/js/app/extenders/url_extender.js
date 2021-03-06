define([
    'core/app'
], function(app) {

    var extender = {
        apply: function(viewModel, defn) {
            if (defn.view) {
                viewModel.viewUrl = ko.observable(app.nav.urlFor(viewModel));
            }
            if (defn.edit) {
                viewModel.editUrl = ko.observable(app.nav.urlFor(viewModel, 'edit'));
            }
            if (defn.email) {
                viewModel.emailUrl = ko.computed(function() {
                    return "mailto:" + viewModel.email();
                }, this);
            }
        }
    };
    
    app.core.defineExtender('urlExtender', extender);

});