import {combineReducers} from 'redux';

import navigationItems from './navigation';
import sales from './sales';
import employees from './employees';
import clients from './client';
import dialog from './dialog';

export default combineReducers({
    navigationItems,
    sales,
    employees,
    clients,
    dialog
});