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

Run `gulp` to run the default development server and then navigate to [http://localhost:3000] with a web browser.

This task runs an express server that proxies the webpack-dev-server bundle and supports hot module replacement.
While the configuration is more complex than running `webpack-dev-server` directly, the express server provides
 additional options; such as proxying API requests, providing authentication, file uploads or websockets.


### Build preview

Run `gulp dev-build` to create an optimised build and then navigate to [http://localhost:3000] with a web browser.

This task uses the `webpack.dist.js` config file to create a production build and writes the built files to disk.
 The development express server then serves the files as static assets so they can be previewed.
As the task writes output stats to the terminal, it can be useful to see the final sizes of optimised bundles, along
 with providing a way to preview the bundle easily on a local server.

