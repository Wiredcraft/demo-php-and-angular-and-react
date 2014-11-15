# debug = require('debug')('carcass:app:render')

express = require('express')
uid = require('uid2')

# Transparently support JSX
require('node-jsx').install()
App = require('../../assets/app_react/app')

module.exports = app = express.Router()

# Render.
app.get('/', (req, res) ->
    res.send('') if not req.query.component?
    options = {
        type: req.query.type ? ''
        id: req.query.id ? ''
        name: req.query.name ? ''
        className: req.query.className ? ''
    }
    markup = App.renderToString(req.query.component, options)
    id = uid(7)
    res.send(
        '<div id="' + id + '">' + markup + '</div>' +
        '<script>
            App.render("' + id + '", "' + req.query.component + '", ' + JSON.stringify(options) + ');
        </script>'
    )
)
