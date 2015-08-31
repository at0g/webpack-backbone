import css from './main.less';
import $ from 'jquery';
import Marionette from 'marionette';
import Application from 'Application';

// Override the default Marionette renderer to call template.render() to work with nunjucks-loader templates.
Marionette.Renderer.render = function(template, data) {
    return template.render(data);
};

// Normalise the URL, removing the trailing slash if present.
let path = window.location.pathname;
let hasTrailingSlash = /\/$/;
if (path.length > 1 && hasTrailingSlash.test(path)) {
    window.location.pathname = path.replace(hasTrailingSlash, '');
}


// Run the application once the DOM is ready
$(() => {
    let app = new Application();
    app.start();
});
