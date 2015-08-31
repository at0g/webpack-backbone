import './styles.less';
import Marionette from 'marionette';
import animationEnd from 'utils/animation-end';

export default Marionette.Region.extend({

    viewStack: [],

    attachHtml (view) {

        if (this.viewStack.length) {

            this.viewStack.forEach((previousView) => {
                previousView.$el
                    .removeClass('fader--fade-in')
                    .addClass('fader--fade-out');
            });

            view.$el
                .one(animationEnd, () => {
                    // When the animation ends, iterate through the viewStack and destroy any previous views.
                    // Doing the view clean up when the new view has transitioned in is preferable, as:
                    // a) it provides a "source of truth" for what should be displayed at this point in time
                    // b) it gives as a single point to clean up old views if there are multiples in the view stack,
                    //    which can occur if the user navigates faster than the animation duration.
                    this.viewStack.forEach((previousView, i) => {
                        // The last item is the current view, so don't destroy it.
                        if (i < this.viewStack.length - 1) {
                            previousView.destroy();
                        }
                    });
                })
                .addClass('fader--fade-in');
        }
        // Add the current view to the top of the viewstack
        this.viewStack.push(view);

        // Add a handler to remove the viewstack reference when the view is destroyed.
        // Note that this handler allows view cleanup to run if the view is destroyed from outside of this region.
        view.onBeforeDestroy = () => {
            this.viewStack.splice(this.viewStack.indexOf(view), 1);
        };

        // Append the new view to the DOM
        this.$el.append(view.el);

        return this;
    },

    show (view, options = { preventDestroy: true }) {
        // Call "super", passing the preventDestroy option by default.
        Marionette.Region.prototype.show.call(this, view, options);

        // Append an additional attribute (required for css/presentation hooks)
        this.$el.attr('data-region-type', 'Fader');

        return this;
    }

});
