import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as salesActions from "../../../store/actions/sales";
import * as employeeActions from "../../../store/actions/employee";
import * as clientActions from "../../../store/actions/client";

import Dropdown from "../../common/dropdown/Dropdown";

import moment from 'moment';

import './SalesFilters.css';

class SalesFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSelect(propertyName, value) {
        let salesData = {};
        salesData[propertyName] = value;
        this.setState(salesData);
        let valueForFilter = value ? value["_id"] : undefined;
        this.props.salesActions.filterBy({filterProperty: propertyName, id: valueForFilter, identifierProperty: "_id"});
    }

    render() {
        return (
            <div className={"app-sales-filters"}>
                <h3>Filter by</h3>
                <div className={"app-sales-filter app-input-group"}>
                    <label className={"app-input-group__label"}>Employee</label>
                    <Dropdown options={this.props.employees}
                              onSelect={this.handleSelect.bind(this, 'employee')}
                              selectedOption={this.state.employee}
                              placeholderOption={{_id: 'DEFAULT', fullName: 'Select an option'}}
                              propertyWithID="_id"
                              propertyWithImage="image"
                              propertyWithName="fullName"/>
                </div>
                <div className={"app-sales-filter app-input-group"}>
                    <label className={"app-input-group__label"}>Client</label>
                    <Dropdown options={this.props.clients}
                              onSelect={this.handleSelect.bind(this, 'client')}
                              selectedOption={this.state.client}
                              placeholderOption={{id: 'DEFAULT', name: 'Select an option'}}
                              propertyWithID="id"
                              propertyWithImage="image"
                              propertyWithName="name"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dates: state.sales.map(salesRecord => moment(salesRecord.date).toDate()),
        employees: state.employees.sort((a, b) => {
            if (a.givenName < b.givenName) return -1;
            if (a.givenName > b.givenName) return 1;
            return 0;
        }),
        clients: state.clients.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
    }
};

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SalesFilters);