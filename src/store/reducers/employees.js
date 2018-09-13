import * as actions from './../actions/employee';

function addNewEmployee(allEmployees, employee) {
    return [{...employee}, ...allEmployees];
}

function loadEmployees(employee) {
    return [...employee];
}

function employees(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_EMPLOYEE:
            return addNewEmployee(state, action.payload);
        case actions.LOAD_EMPLOYEES:
            return loadEmployees(action.payload);
        default:
            return state
    }
}

export default employees;