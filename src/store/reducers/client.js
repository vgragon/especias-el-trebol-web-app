import * as actions from './../actions/client';

function addNewClient(allClients, client) {
    return [Object.assign({}, client), ...allClients];
}

function loadClients(clients) {
    return clients.map(client => Object.assign({}, client));
}

function showClientDetail(allClients, clientToShowDetail) {
    return allClients.map(client => Object.assign({}, client, {detail: clientToShowDetail["_id"] === client["_id"]}));
}

function updateClient(allClients, updatedClient) {
    return allClients.map(employee => {
        let isClientToUpdate = updatedClient["_id"] === employee["_id"];
        if (isClientToUpdate) {
            return Object.assign({}, updatedClient);
        }
        return employee;
    });
}

function deleteClient(allClients, removeClientId) {
    return allClients.filter(client => client["_id"] !== removeClientId);
}

function clients(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_CLIENT:
            return addNewClient(state, action.payload);
        case actions.LOAD_CLIENTS:
            return loadClients(action.payload);
        case actions.SHOW_CLIENT_DETAIL:
            return showClientDetail(state, action.payload);
        case actions.UPDATE_CLIENT:
            return updateClient(state, action.payload);
        case actions.DELETE_CLIENT:
            return deleteClient(state, action.payload);
        default:
            return state
    }
}

export default clients;