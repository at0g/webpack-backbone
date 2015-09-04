import Marionette from 'marionette';
import tpl from './template.nunj';

export default Marionette.ItemView.extend({

    attributes: {
        'data-view': 'BasicPage',
        class: 'basic-page'
    },

    template: tpl

});
