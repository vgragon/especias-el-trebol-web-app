/* action types*/
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export const SET_DIALOG_PARAMS = 'SET_DIALOG_PARAMS';

/* action creators*/
export function toggleDialog(visibility = false) {
    return {type: TOGGLE_DIALOG, payload: visibility};
}

export function setDialogParams(params = {}) {
    return {type: SET_DIALOG_PARAMS, payload: params};
}