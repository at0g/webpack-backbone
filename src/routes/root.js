import Marionette from 'marionette';

export default Marionette.AppRouter.extend({

    appRoutes: {
        '': 'showHome',
        'about': 'showAbout'
    }

});
