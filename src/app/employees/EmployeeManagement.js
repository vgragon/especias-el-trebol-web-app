import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as employeeActions from "../../store/actions/employee";

import CaptureEmployee from './capture-employee/CaptureEmployee';
import EmployeeCatalog from './employee-catalog/EmployeeCatalog';
import dbUtil from "../../server";

import './EmployeeManagement.css';

class EmployeeManagement extends Component {
    render() {
        return (
            <section className={"app-page app-employee-management"}>
                <div className={"app-capture-employee-container"}>
                    <CaptureEmployee/>
                </div>
                <div className={"app-employee-catalog-container"}>
                    <EmployeeCatalog/>
                </div>
                <div className="clearfix"/>
            </section>
        )
    }

    componentDidMount() {
        fetch(dbUtil.URLS.employees.read)
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(employee => {
                    return employee;
                });
                this.props.salesActions.loadEmployees(json);
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(employeeActions, dispatch)
});

export default connect(
    null,
    mapDispatchToProps
)(EmployeeManagement);