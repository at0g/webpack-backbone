import css from './style.less';
import Marionette from 'marionette';
import tpl from './template.nunj';

export default Marionette.LayoutView.extend({

    el: 'body',

    template: tpl,

    regions: {
        header: '[data-region="root-header"]',
        content: '[data-region="root-content"]',
        footer: '[data-region="root-footer"]'
    }

});
