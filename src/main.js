import domReady from 'detect-dom-ready';

domReady(() => {
    var message = document.createElement('p');
    message.innerHTML = 'Hello - you\'ve connected to an express app that proxies the webpack-dev-server';
    document.body.appendChild(message);
});