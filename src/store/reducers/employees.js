import * as actions from './../actions/employee';

function addNewEmployee(allEmployees, employee) {
    return [Object.assign({}, employee, {fullName: `${employee.givenName} ${employee.familyName}`}), ...allEmployees];
}

function loadEmployees(employee) {
    return employee.map(employee => Object.assign({}, employee, {fullName: `${employee.givenName} ${employee.familyName}`}));
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