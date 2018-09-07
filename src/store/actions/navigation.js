/* action types*/
export const SET_ACTIVE_NAVIGATION = 'SET_ACTIVE_NAVIGATION';

/* action creators*/
export function setActiveNavigation(route) {
    return {type: SET_ACTIVE_NAVIGATION, payload: route};
}