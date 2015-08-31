import Backbone from 'backbone';
import Marionette from 'marionette';

export default Marionette.Behavior.extend({

    ui: {
        'link': 'a[href]'
    },

    events: {
        'click @ui.link': 'onLinkClick'
    },

    onLinkClick (evt) {
        evt.preventDefault();
        let href = Backbone.$(evt.currentTarget).attr('href');
        Backbone.history.navigate(href, { trigger: true });
    }

});
