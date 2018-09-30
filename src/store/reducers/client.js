import * as actions from './../actions/client';

function addNewClient(allClients, client) {
    return [Object.assign({}, client), ...allClients];
}

function loadClients(clients) {
    return clients.map(client => Object.assign({}, client));
}

function clients(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_CLIENT:
            return addNewClient(state, action.payload);
        case actions.LOAD_CLIENTS:
            return loadClients(action.payload);
        default:
            return state
    }
}

export default clients;