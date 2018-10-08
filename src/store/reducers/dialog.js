import * as actions from './../actions/dialog';

function toggleDialog(dialog, visibility) {
    return Object.assign({}, dialog, {visibility});
}

function setDialogParams(dialog, params) {
    return Object.assign({}, dialog, {...params});
}

function clients(state = {visibility: false}, action) {
    switch (action.type) {
        case actions.TOGGLE_DIALOG:
            return toggleDialog(state, action.payload);
        case actions.SET_DIALOG_PARAMS:
            return setDialogParams(state, action.payload);
        default:
            return state
    }
}

export default clients;