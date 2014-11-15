var React = require('react');
var App = {};

App.Input = React.createFactory(require('./components/Input.react'));
App.Submit = React.createFactory(require('./components/Submit.react'));
App.Result = React.createFactory(require('./components/Result.react'));

App.render = function(container, component, options) {
    if (null == options) options = {};
    return React.render(App[component](options), document.getElementById(container));
};

App.renderToString = function(component, options) {
    if (null == options) options = {};
    return React.renderToString(App[component](options));
};

module.exports = App;
