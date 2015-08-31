import './style.less';
import Backbone from 'backbone';
import Marionette from 'marionette';
import tpl from './template.nunj';
import Link from 'behaviours/Link';
import transition from 'bootstrap/js/transition';
import collapse from 'bootstrap/js/collapse';

export default Marionette.ItemView.extend({

    template: tpl,

    attributes: {
        'data-view': 'Navbar'
    },

    behaviors: {
        link: {
            behaviorClass: Link
        }
    },

    onShow () {
        Backbone.$('body').addClass('with-navbar-fixed-top');
        this.historyListener = this.updateActiveLinkState.bind(this);

        Backbone.history.on('route', this.historyListener);
    },

    onClose () {
        Backbone.$('body').removeClass('with-navbar-fixed-top');
        Backbone.history.off('route', this.historyListener);
        delete this.historyListener;
    },

    updateActiveLinkState () {
        var path = window.location.pathname;
        this.$el.find('.navbar-nav .active').removeClass('active');
        this.$el.find(`.navbar-nav a[href="${path}"]`).closest('li').addClass('active');
    }

});
