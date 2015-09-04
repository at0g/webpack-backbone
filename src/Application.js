import Backbone from 'backbone';
import Marionette from 'marionette';
import AppRouter from 'routes/root';
import RootLayout from 'layouts/Root';

export default Marionette.Application.extend({

    initialize () {
        this.rootView = new RootLayout().render();

        this.router = new AppRouter({
            controller: this
        });
    },

    onStart () {
        let routeExists = Backbone.history.start({ pushState: false });
        if (!routeExists) {
            Backbone.history.navigate('/404', { replace: true, trigger: true });
        }
    },

    home () {
        require.ensure([], () => {
            var BasicPage = require('views/BasicPage');
            var homeView = new BasicPage({
                model: new Backbone.Model({
                    title: 'Home page'
                })
            });
            this.rootView.content.show(homeView);
        });
    },

    about () {
        require.ensure([], () => {
            var BasicPage = require('views/BasicPage');
            var aboutView = new BasicPage({
                model: new Backbone.Model({
                    title: 'About page'
                })
            });
            this.rootView.content.show(aboutView);
        });
    },

    notFound () {
        require.ensure([], () => {
            var BasicPage = require('views/BasicPage');
            var notFoundView = new BasicPage({
                model: new Backbone.Model({
                    title: '404 - Not found'
                })
            });
            this.rootView.content.show(notFoundView);
        });
    }

});
