import * as actions from './../actions/sales';

function addNewSale(allSalesRecords, salesRecord) {
    return [{...salesRecord}, ...allSalesRecords];
}

function loadSales(salesRecords = []) {
    return [...salesRecords];
}

function sales(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_SALE:
            return addNewSale(state, action.payload);
        case actions.LOAD_SALES:
            return loadSales(action.payload);
        default:
            return state
    }
}

export default sales;