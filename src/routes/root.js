import Marionette from 'marionette';

export default Marionette.AppRouter.extend({

    appRoutes: {
        '': 'home',
        'about': 'about',
        '404': 'notFound'
    }

});
