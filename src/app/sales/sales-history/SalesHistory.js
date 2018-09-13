import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import SalesTable from "../sales-table/SalesTable";

import * as salesActions from './../../../store/actions/sales';

import formatterUtilities from './../../common/utilities/formatter';

import './SalesHistory.css';

class SalesHistory extends Component {
    render() {
        return (
            <div className={"app-sales__history"}>
                <h2 className={"margin-bottom-sm"}>Sales history</h2>
                <div className={"app-sales__table-container"}>
                    <SalesTable/>
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
                    salesRecord.formattedAmount = formatterUtilities.formatNumber("CURRENCY", salesRecord.amount);
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