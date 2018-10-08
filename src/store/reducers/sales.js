import * as actions from './../actions/sales';
import formatterUtilities from "../../app/common/utilities/formatter";

function addNewSale(allSalesRecords, salesRecord) {
    return [Object.assign({}, {...salesRecord}, {
        hidden: false,
        formattedAmount: formatterUtilities.formatNumber("CURRENCY", salesRecord.amount)
    }), ...allSalesRecords];
}

function loadSales(salesRecords = []) {
    return salesRecords.map(record => {
        record.hidden = false;
        record.employee.fullName = `${record.employee.givenName} ${record.employee.familyName}`;
        record.formattedAmount = formatterUtilities.formatNumber("CURRENCY", record.amount);
        return record;
    });
}

function filterBy(salesRecords = [], {filterProperty, identifierProperty, id}) {
    return salesRecords.map(record => {
        record.hidden = typeof id === "undefined" ? false : record[filterProperty][identifierProperty] !== id;
        return record;
    });
}

function sales(state = [], action) {
    switch (action.type) {
        case actions.ADD_NEW_SALE:
            return addNewSale(state, action.payload);
        case actions.LOAD_SALES:
            return loadSales(action.payload);
        case actions.FILTER_BY:
            return filterBy(state, action.payload);
        default:
            return state;
    }
}

export default sales;