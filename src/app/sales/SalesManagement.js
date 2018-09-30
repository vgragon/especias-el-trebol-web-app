import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as salesActions from "../../store/actions/sales";
import * as clientActions from "../../store/actions/client";
import * as employeeActions from "../../store/actions/employee";

import CaptureSales from "./capture-sales/CaptureSales";
import SalesHistory from "./sales-history/SalesHistory";

import './SalesManagement.css';

class SalesManagement extends Component {
    render() {
        return (
            <section className={"app-page app-sales-management"}>
                <div className={"app-capture-sales-container"}>
                    <CaptureSales/>
                </div>
                <div className={"app-sales-history-container"}>
                    <SalesHistory/>
                </div>
                <div className="clearfix"/>
            </section>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/employees')
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(employee => {
                    return employee;
                });
                this.props.employeeActions.loadEmployees(json);
            }).catch(ex => {
            console.log('parsing failed', ex)
        });

        fetch('http://localhost:3000/clients')
            .then(response => {
                return response.json()
            })
            .then(json => {
                this.props.clientActions.loadClients(json);
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
    employeeActions: bindActionCreators(employeeActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch)
});

export default connect(
    null,
    mapDispatchToProps
)(SalesManagement);