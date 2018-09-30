import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Dropdown from "../../common/dropdown/Dropdown";

import * as salesActions from "../../../store/actions/sales";
import * as employeeActions from "../../../store/actions/employee";
import * as clientActions from "../../../store/actions/client";
import dbUtil from './../../../server/index';

import salesUtil from '../utilities/SalesService';

import './CaptureSales.css';

class CaptureSales extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSelect(propertyName, value) {
        let salesData = {};
        salesData[propertyName] = value;
        this.setState(salesData)
    }

    handleChange(propertyName, event) {
        let salesData = {};
        salesData[propertyName] = event.target.value;
        this.setState(salesData)
    }

    handleSubmit($event) {
        $event.preventDefault();
        let data = {...this.state};

        let {isValid, errorMessage} = salesUtil.isValid(data);

        if (isValid) {
            let salesData = {};
            salesData.date = data.date;
            salesData.amount = data.amount;
            salesData.employeeId = data.employee["_id"];
            salesData.clientId = data.client["_id"];

            fetch(dbUtil.URLS.sales.create, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(salesData), // body data type must match "Content-Type" header
            }).then(response => {
                debugger;
                this.props.salesActions.addNewSale(response.json());
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    render() {
        return (
            <div className={"app-sales__capture"}>
                <div className={"padding-all-md"}>
                    <h2>Capture new sale</h2>
                    <form onSubmit={this.handleSubmit.bind(this)} className={"app-form"}>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Date</label>
                            <input type="date" name="date" className={"app-input-group__input"}
                                   onChange={this.handleChange.bind(this, 'date')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Employee</label>
                            <Dropdown options={this.props.employees}
                                      onSelect={this.handleSelect.bind(this, 'employee')}
                                      selectedOption={this.state.employee}
                                      placeholderOption={{_id: 'DEFAULT', fullName: 'Select an option'}}
                                      propertyWithID="_id"
                                      propertyWithImage="image"
                                      propertyWithName="fullName"/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Client</label>
                            <Dropdown options={this.props.clients}
                                      onSelect={this.handleSelect.bind(this, 'client')}
                                      selectedOption={this.state.client}
                                      placeholderOption={{id: 'DEFAULT', name: 'Select an option'}}
                                      propertyWithID="id"
                                      propertyWithImage="image"
                                      propertyWithName="name"/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Amount (MXN)</label>
                            <input type="number" name="amount" className={"app-input-group__input"}
                                   onChange={this.handleChange.bind(this, 'amount')}/>
                        </div>
                        <div className={"app-form__submit"}>
                            <div className={"float-left"}>
                                <button className={"app-button app-button--primary"}>Capture</button>
                            </div>
                            <div className={"clearfix"}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employees,
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
    employeeActions: bindActionCreators(employeeActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CaptureSales);