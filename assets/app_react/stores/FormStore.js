var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FormConstants = require('../constants/FormConstants');
var assign = require('object-assign');

// Define initial data points
var _data = {};
var _result = null;

// Extend FormStore with EventEmitter to add eventing capabilities
var FormStore = assign({}, EventEmitter.prototype, {

    // Return form data
    getData: function() {
        return _data;
    },

    // Return submit result
    getResult: function() {
        return _result;
    },

    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case FormConstants.UPDATE_TEXT:
            _data[action.name] = action.data
            break;

        case FormConstants.SUBMIT:
            _result = action.data
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    FormStore.emitChange();

    return true;
});

module.exports = FormStore;
