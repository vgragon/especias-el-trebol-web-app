import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import SalesTable from "../sales-table/SalesTable";
import SalesFilters from "./../sales-filters/SalesFilters";

import * as salesActions from './../../../store/actions/sales';

import './SalesHistory.css';

class SalesHistory extends Component {
    render() {
        return (
            <div className={"app-sales__history"}>
                <div className={"padding-all-md"}>
                    <h2 className={"margin-bottom-md"}>Sales history</h2>
                    <div className={"app-sales-filters-container"}>
                        <SalesFilters/>
                    </div>
                    <div className={"app-sales__table-container"}>
                        <SalesTable/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/sales')
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(salesRecord => {
                    salesRecord.hidden = false;
                    return salesRecord;
                });
                this.props.salesActions.loadSales(json);
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapStateToProps = state => ({
    sales: state.sales
});

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesHistory);