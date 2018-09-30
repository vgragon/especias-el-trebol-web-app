/* action types*/
export const ADD_NEW_SALE = 'ADD_NEW_SALE';
export const LOAD_SALES = 'LOAD_SALES';
export const FILTER_BY = 'FILTER_BY';

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