import Marionette from 'marionette';
import tpl from './template.nunj';

export default Marionette.LayoutView.extend({

    el: 'body',

    template: tpl,

    className: 'root-view'

});
