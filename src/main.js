import css from './main.less';
import domReady from 'detect-dom-ready';
import Marionette from 'marionette';
import Application from 'Application';
import RootLayout from 'layouts/Root';

// Override the default Marionette renderer to call template.render() to work with nunjucks-loader templates.
Marionette.Renderer.render = function(template, data) {
    return template.render(data);
};

// Render the rootView to the body once the DOM is ready.
domReady(() => {
    let app = new Application();
    app.rootView = new RootLayout().render();
    app.start();
});
