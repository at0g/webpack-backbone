# Backbone.Marionette built with Webpack

This is an example of building a Backbone.Marionette app with webpack.

## Features

- Run the local development environment from an express server with support for hot module replacement
- Use lodash rather than underscore (Backbone dependency)
- Load jQuery (Backbone dependency) from googles CDN to make use of parallel downloads
- Split app code into a dedicated vendor chunk for long term caching
- Use nunjucks templates with marionette views rather than the default underscore templates
- Write modular css/less that is combined into a single styles.css file
- Sourcemaps for JS and CSS assets during development
- Production config based on default config, with additions/overrides where appropriate
- Support the Marionette chrome extension by exposing Marionette on the window object


## Installation

`npm install`

By default, build files will be created within a *public/build* directory and the local development server will run on
 [http://localhost:3000].
 These settings can be changed to suit the local environment - see the `config` directory for options..

## Workflow

### Default development workflow

Run `gulp` to run the default development server and then navigate to [localhost:3000](http://localhost:3000) with a web
 browser.

This task runs an express server that proxies the webpack-dev-server bundle and supports hot module replacement.
While the configuration is more complex than running `webpack-dev-server` directly, the express server provides
 additional options; such as proxying API requests, providing authentication, file uploads or websockets.


### Build preview

Run `gulp dev-build` to create an optimised build and then navigate to [localhost:3000](http://localhost:3000) with a
 web browser.

This task uses the `webpack.dist.js` config file to create a production build and writes the built files to disk.
 The development express server then serves the files as static assets so they can be previewed.
As the task writes output stats to the terminal, it can be useful to see the final sizes of optimised bundles, along
 with providing a way to preview the bundle easily on a local server.


## Project stucture

Source files are located in the `src` directory. Distribution files are written to `public/build`.

Note that `src` is declared as a modules root in the webpack config, allowing the `src` part of the path can be omitted.
 Eg. `src/main.js` can simply be referenced as `main`.

The projects source files are organised by component in most cases, rather than type - where suitable each component
 is a directory with its dependencies contained within, as opposed to separate `templates` and `css` directories.
 As an example, consider the `src/views/Navbar` directory.

When `views/Navbar` is imported or required in source code, webpack resolves the reference as
 `src/views/Navbar/index.js`, which exports the view constructor.

The dependencies of the Navbar (css and template) are declared within the same directory to keep the component as
 modular as possible - these dependencies are required by the index file, ensuring they are added to the build if the
 component is included. If the view is no longer included in the build, it's dependencies are omitted with no further
 work on behalf of the developer.


### A note on CSS

The webpack extract text plugin is used to combine CSS dependencies into an external css file. While this is generally
 a useful approach to bundling the CSS (as it's the only method to support sourcemaps), there are some gotchas to be
 aware of:

The CSS that makes up the file is bundled based on the order of module inclusion. What this means if that if a style
 declaration must be in a specific order, it may not behave as expected.

If multiple modules require the same resource, such as `bootstrap/less/forms.less`, each modules exported CSS will
 contain the rules (creating duplication). Referring back to the `Navbar` example, the `styles.less` file imports
 `forms.less` and `utilities.less` using `import (reference) 'path/to/file.less'` to mitigate the effect of this
 behaviour on the result files size.

