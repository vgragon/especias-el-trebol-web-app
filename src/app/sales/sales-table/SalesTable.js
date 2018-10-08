import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";

import * as salesActions from './../../../store/actions/sales';

import moment from 'moment';

import './SalesTable.css';

class SalesTable extends Component {
    handleClick(history, match, employee) {
        this.props.salesActions.showSaleDetail(employee);
        history.push(`${match.url}/${employee["_id"]}`);
    }

    render() {
        let tableRecords = this.props.sales.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }).map((saleRecord, index) => {
            if (saleRecord.hidden) return null;
            return (
                <tr className={"app-table__row"} key={index} onClick={this.handleClick.bind(this, this.props.history, this.props.match, saleRecord)}>
                    <td className={"app-table__cell"}>{moment(saleRecord.date).format('MMM DD, YYYY')}</td>
                    <td className={"app-table__cell"}>{saleRecord.employee.givenName} {saleRecord.employee.familyName}</td>
                    <td className={"app-table__cell"}>{saleRecord.client.name}</td>
                    <td className={"app-table__cell"}>$ {saleRecord.formattedAmount}</td>
                </tr>
            )
        });

        return (
            <table className={"app-table"}>
                <thead className={"app-table__head"}>
                <tr className={"app-table__row"}>
                    <th className={"app-table__cell--header"}>Date</th>
                    <th className={"app-table__cell--header"}>Employee</th>
                    <th className={"app-table__cell--header"}>Client</th>
                    <th className={"app-table__cell--header"}>Amount (MXN)</th>
                </tr>
                </thead>
                <tbody className={"app-table__body"}>
                {tableRecords}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    sales: state.sales
});

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesTable));