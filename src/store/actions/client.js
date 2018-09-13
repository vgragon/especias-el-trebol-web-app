/* action types*/
export const ADD_NEW_CLIENT = 'ADD_NEW_CLIENT';
export const LOAD_CLIENTS = 'LOAD_CLIENTS';

/* action creators*/
export function addNewClient(client) {
    return {type: ADD_NEW_CLIENT, payload: client};
}

export function loadClients(clients = []) {
    return {type: LOAD_CLIENTS, payload: clients};
}