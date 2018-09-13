/* action types*/
export const ADD_NEW_EMPLOYEE = 'ADD_NEW_EMPLOYEE';
export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';

/* action creators*/
export function addNewEmployee(employee) {
    return {type: ADD_NEW_EMPLOYEE, payload: employee};
}

export function loadEmployees(employees = []) {
    return {type: LOAD_EMPLOYEES, payload: employees};
}