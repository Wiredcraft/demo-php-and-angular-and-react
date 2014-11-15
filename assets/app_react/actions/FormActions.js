var AppDispatcher = require('../dispatcher/AppDispatcher');
var FormConstants = require('../constants/FormConstants');
var xhr = require('xhr');

// Define actions object
var FormActions = {};

// Update
FormActions.updateText = function(name, data) {
    AppDispatcher.handleViewAction({
        actionType: FormConstants.UPDATE_TEXT,
        name: name,
        data: data
    })
};

// Submit
FormActions.submit = function(url, data) {
    xhr({
        method: 'POST',
        uri: url,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }, function(err, resp, body) {
        AppDispatcher.handleServerAction({
            actionType: FormConstants.SUBMIT,
            data: body
        })
    });
};

module.exports = FormActions;
