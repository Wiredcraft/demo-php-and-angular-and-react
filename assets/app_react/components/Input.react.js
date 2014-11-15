var React = require('react');
var FormStore = require('../stores/FormStore');
var FormActions = require('../actions/FormActions');

var Textarea = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {};
    },

    render: function() {
        switch (this.props.type) {
            case 'text':
                return (
                    <input
                        className={this.props.className}
                        id={this.props.id}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this._onChange}
                        value={this.state.value}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        className={this.props.className}
                        id={this.props.id}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this._onChange}
                        value={this.state.value}
                    />
                );
        }
    },

    _onChange: function(event) {
        var name = this.props.name
        var value = event.target.value;
        FormActions.updateText(name, value);
        this.setState({
            value: value
        });
    }

});

module.exports = Textarea;
