import css from './main.less';
import $ from 'jquery';
import Marionette from 'marionette';
import Application from 'Application';

// Override the default Marionette renderer to call template.render() to work with nunjucks-loader templates.
Marionette.Renderer.render = function(template, data) {
    return template.render(data);
};


// Normalise the location on home to match the home routes hash link.
if (window.location.pathname === '/' && !window.location.hash) {
    window.location.hash = '/';
}



// Run the application once the DOM is ready
$(() => {
    let app = new Application();
    app.start();
});
