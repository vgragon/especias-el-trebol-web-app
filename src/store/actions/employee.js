/* action types*/
export const ADD_NEW_EMPLOYEE = 'ADD_NEW_EMPLOYEE';
export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
export const SHOW_EMPLOYEE_DETAIL = 'SHOW_EMPLOYEE_DETAIL';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

/* action creators*/
export function addNewEmployee(employee) {
    return {type: ADD_NEW_EMPLOYEE, payload: employee};
}

export function loadEmployees(employees = []) {
    return {type: LOAD_EMPLOYEES, payload: employees};
}

export function showEmployeeDetail(employee) {
    return {type: SHOW_EMPLOYEE_DETAIL, payload: employee};
}

export function updateEmployee(employee) {
    return {type: UPDATE_EMPLOYEE, payload: employee};
}

export function deleteEmployee(id) {
    return {type: DELETE_EMPLOYEE, payload: id};
}