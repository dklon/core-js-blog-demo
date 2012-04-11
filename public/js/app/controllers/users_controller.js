define([
    'core/app',
    'app/models/user',
    'text!app/templates/users/view-user.htm',
    'text!app/templates/users/edit-user.htm',
    'text!app/templates/blogs/blog-list.htm',
    'text!app/templates/blogs/blog-post-list.htm'
], function(app, User, viewUserTmpl, editUserTmpl, blogListTmpl, blogPostListTmpl) {


    app.core.define('UsersModule', function(sandbox) {
        var module = {
            //"@Router.ready": function(router) {
                // router.registerController(this);
                // this.publish('ready', [this]);
            //},
            
            "!!Application.controller()": {
                routes: {
                    "users/new":            "new_user",
                    "users/:user_id/view":  "view_user",
                    "users/:user_id/edit":  "edit_user"
                },
                
                templates: {
                    'view-user-tmpl': $(viewUserTmpl),
                    'edit-user-tmpl': $(editUserTmpl),
                    'blog-list-tmpl': $(blogListTmpl),
                    'blog-post-list-tmpl': $(blogPostListTmpl)
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            
            new_user: function() {
                var user = new User();
                
                user.submit = function() {
                    user.save(function(user) {
                        app.auth.signin(user.user_name(), null, function(user) {
                            app.nav.to('/users/' + user.id() + '/view');
                        });
                    });
                };
                
                user.cancel = function() {
                    app.nav.to('/');
                };
                
                app.tmpl.renderPage('edit-user-tmpl', user);
            },
            
            view_user: function(user_id) {
                app.tmpl.renderPage('view-user-tmpl', new User().load(user_id));
            },
            
            edit_user: function(user_id) {
                var user = new User().load(user_id);
                
                user.submit = function() {
                    user.save(function() {
                        app.nav.to("/users/" + user.id() + "/view");
                    }, { recursive: false });
                };
                
                user.cancel = function() {
                    // TODO: maybe move toward an app.urlFor(user) kinda paradigm?
                    app.nav.to(user.viewHref());
                };
                
                app.tmpl.renderPage('edit-user-tmpl', user);
            }
        };
        
        return module;
    });

});
