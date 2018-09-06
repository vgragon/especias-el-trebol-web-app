import routes from './../../routes';

const SET_NAVIGATION_ITEMS = "SET_NAVIGATION_ITEMS";

function setNavigationItems(items) {
    return items.map(item => Object.assign({}, item));
}

function navigationItems(state = routes, action) {
    switch (action.type) {
        case SET_NAVIGATION_ITEMS:
            return setNavigationItems(action.payload.items);
        default:
            return state
    }
}

export default navigationItems;