var React = require('react');
var FormStore = require('../stores/FormStore');
var FormActions = require('../actions/FormActions');

var Submit = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function() {
        return <button onClick={this._onSubmit} className="btn btn-primary">Submit</button>;
    },

    _onSubmit: function(event) {
        event.preventDefault();
        FormActions.submit('/rest/', {
            form: FormStore.getData()
        });
    }

});

module.exports = Submit;
