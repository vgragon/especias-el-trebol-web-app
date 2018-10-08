import routes from './../../routes';

import * as actions from './../actions/navigation';

function setActiveNavigation(navigationItems, selectedItem) {
    return navigationItems.map(item => Object.assign({}, item, {active: item.path === selectedItem.path}));
}

function navigationItems(state = routes, action) {
    switch (action.type) {
        case actions.SET_ACTIVE_NAVIGATION:
            return setActiveNavigation(state, action.payload);
        default:
            return state
    }
}

export default navigationItems;