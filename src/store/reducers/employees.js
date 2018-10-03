import * as actions from './../actions/employee';

function addNewEmployee(allEmployees, employee) {
    return [Object.assign({}, employee, {fullName: `${employee.givenName} ${employee.familyName}`}), ...allEmployees];
}

function loadEmployees(allEmployees) {
    return allEmployees.map(employee => Object.assign({}, employee, {fullName: `${employee.givenName} ${employee.familyName}`}));
}

function showEmployeeDetail(allEmployees, employeeToShowDetail) {
    return allEmployees.map(employee => Object.assign({}, employee, {detail: employeeToShowDetail["_id"] === employee["_id"]}));
}

function updateEmployee(allEmployees, updatedEmployee) {
    return allEmployees.map(employee => {
        let isEmployeeToUpdate = updatedEmployee["_id"] === employee["_id"];
        if (isEmployeeToUpdate) {
            return Object.assign({}, updatedEmployee);
        }
        return employee;
    });
}

function deleteEmployee(allEmployee, removeEmployeeId) {
    return allEmployee.filter(employee => employee["_id"] !== removeEmployeeId);
}

function employees(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_EMPLOYEE:
            return addNewEmployee(state, action.payload);
        case actions.LOAD_EMPLOYEES:
            return loadEmployees(action.payload);
        case actions.SHOW_EMPLOYEE_DETAIL:
            return showEmployeeDetail(state, action.payload);
        case actions.UPDATE_EMPLOYEE:
            return updateEmployee(state, action.payload);
        case actions.DELETE_EMPLOYEE:
            return deleteEmployee(state, action.payload);
        default:
            return state
    }
}

export default employees;