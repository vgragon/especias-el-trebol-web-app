import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Dropdown from "../../common/dropdown/Dropdown";

import * as salesActions from "../../../store/actions/sales";
import * as employeeActions from "../../../store/actions/employee";
import * as clientActions from "../../../store/actions/client";

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
        let {employee, client, amount, date} = this.state;
        this.props.salesActions.addNewSale({employee, client, amount, date});
    }

    render() {
        return (
            <div className={"app-sales__capture"}>
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
                                  propertyWithID="id"
                                  propertyWithImage="image"
                                  propertyWithName="fullName"/>
                    </div>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Client</label>
                        <Dropdown options={this.props.clients}
                                  onSelect={this.handleSelect.bind(this, 'client')}
                                  selectedOption={this.state.client}
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
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/employees')
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(employee => {
                    employee.fullName = `${employee.givenName} ${employee.familyName}`;
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