import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as employeeActions from "../../../store/actions/employee";

import EmployeeGrid from '../employee-grid/EmployeeGrid';
import EmployeeFilters from '../employee-filters/EmployeeFilters';

import './EmployeeCatalog.css';

class EmployeeCatalog extends Component {
    render() {
        return (
            <div className={"app-employee-catalog"}>
                <div className={"padding-all-md"}>
                    <h2 className={"margin-bottom-md"}>Employee catalog</h2>
                    <div className={"app-employee-filters-container"}>
                        <EmployeeFilters/>
                    </div>
                    <div className={"app-employee__table-container"}>
                        <EmployeeGrid/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employees
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeCatalog);