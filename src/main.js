import css from './main.less';
import $ from 'jquery';
import Marionette from 'marionette';
import Application from 'Application';

// Override the default Marionette renderer to call template.render() to work with nunjucks-loader templates.
Marionette.Renderer.render = function(template, data) {
    return template.render(data);
};


// Run the application once the DOM is ready
$(() => {
    let app = new Application();
    app.start();
});
