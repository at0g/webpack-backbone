import domReady from 'detect-dom-ready';
import Marionette from 'marionette';
import Application from 'Application';
import RootView from 'views/Root';

// Override the Marionette renderer to call template.render so
// that it works with nunjucks-loader templates.
Marionette.Renderer.render = function(template, data) {
    return template.render(data);
};

// Write to the DOM once it's ready
domReady(() => {
    let app = new Application();
    app.rootView = new RootView().render();
    app.start();
});