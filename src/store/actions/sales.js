/* action types*/
export const ADD_NEW_SALE = 'ADD_NEW_SALE';
export const LOAD_SALES = 'LOAD_SALES';
export const FILTER_BY = 'FILTER_BY';
export const SHOW_SALE_DETAIL = 'SHOW_SALE_DETAIL';
export const UPDATE_SALE = 'UPDATE_SALE';
export const DELETE_SALE = 'DELETE_SALE';

/* action creators*/
export function addNewSale(salesRecord) {
    return {type: ADD_NEW_SALE, payload: salesRecord};
}

export function loadSales(sales = []) {
    return {type: LOAD_SALES, payload: sales};
}

export function filterBy(criteria = {}) {
    return {type: FILTER_BY, payload: criteria};
}

export function showSaleDetail(saleRecord) {
    return {type: SHOW_SALE_DETAIL, payload: saleRecord};
}

export function updateSale(employee) {
    return {type: UPDATE_SALE, payload: employee};
}

export function deleteSale(id) {
    return {type: DELETE_SALE, payload: id};
}