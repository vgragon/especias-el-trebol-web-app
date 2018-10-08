import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as salesActions from "../../../store/actions/sales";

import './EmployeeFilters.css';

class EmployeeFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={"app-employee-filters"}>
                <h3>Filter by</h3>
                <div className={"app-sales-filter app-input-group"}>
                    <label className={"app-input-group__label"}>Name</label>
                    <input type={"text"} className={"app-input-group__input"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees.map(employee => employee.jobPosition),
    }
};

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeFilters);