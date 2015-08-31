import Backbone from 'backbone';
import Marionette from 'marionette';
import AppRouter from 'routes/root';
import RootLayout from 'layouts/Root';

export default Marionette.Application.extend({

    initialize () {
        this.rootView = new RootLayout().render()

        this.router = new AppRouter({
            controller: this
        });
    },

    onStart () {
        Backbone.history.start({ pushState: true });
    },

    showHome () {
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

    showAbout () {
        require.ensure([], () => {
            var BasicPage = require('views/BasicPage');
            var aboutView = new BasicPage({
                model: new Backbone.Model({
                    title: 'About page'
                })
            });
            this.rootView.content.show(aboutView);
        });
    }

});
