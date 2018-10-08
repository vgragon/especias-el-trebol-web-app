/* action types*/
export const ADD_NEW_CLIENT = 'ADD_NEW_CLIENT';
export const LOAD_CLIENTS = 'LOAD_CLIENTS';
export const SHOW_CLIENT_DETAIL = 'SHOW_CLIENT_DETAIL';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

/* action creators*/
export function addNewClient(client) {
    return {type: ADD_NEW_CLIENT, payload: client};
}

export function loadClients(clients = []) {
    return {type: LOAD_CLIENTS, payload: clients};
}

export function showClientDetail(clients = []) {
    return {type: SHOW_CLIENT_DETAIL, payload: clients};
}

export function updateClient(client) {
    return {type: UPDATE_CLIENT, payload: client};
}

export function deleteClient(id) {
    return {type: DELETE_CLIENT, payload: id};
}