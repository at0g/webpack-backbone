import Backbone from 'backbone';
import Marionette from 'marionette';
import AppRouter from 'routes/root';

export default Marionette.Application.extend({

    initialize () {
        this.router = new AppRouter({
            controller: this
        });
    },

    onStart () {
        Backbone.history.start({ pushState: true });
    },

    showHome () {
        console.log('show home page');
    },

    showAbout () {
        console.log('show about page');
    }

});
