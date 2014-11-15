var App, app, express, uid;

express = require('express');

uid = require('uid2');

require('node-jsx').install();

App = require('../../assets/app_react/app');

module.exports = app = express.Router();

app.get('/', function(req, res) {
  var id, markup, options, _ref, _ref1, _ref2, _ref3;
  if (req.query.component == null) {
    res.send('');
  }
  options = {
    type: (_ref = req.query.type) != null ? _ref : '',
    id: (_ref1 = req.query.id) != null ? _ref1 : '',
    name: (_ref2 = req.query.name) != null ? _ref2 : '',
    className: (_ref3 = req.query.className) != null ? _ref3 : ''
  };
  markup = App.renderToString(req.query.component, options);
  id = uid(7);
  return res.send('<div id="' + id + '">' + markup + '</div>' + '<script> App.render("' + id + '", "' + req.query.component + '", ' + JSON.stringify(options) + '); </script>');
});
