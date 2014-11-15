var React = require('react');
var FormStore = require('../stores/FormStore');

var Result = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        FormStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FormStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return <pre>{this.state.data}</pre>;
    },

    _onChange: function() {
        this.setState({
            data: FormStore.getResult()
        });
    }

});

module.exports = Result;
