import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as employeeActions from "../../../store/actions/employee";

import employeesUtil from "./../utilities/EmployeeService";
import dbUtil from "../../../server";

import './CaptureEmployee.css';

class CaptureEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(propertyName, event) {
        let employeeData = {};
        employeeData[propertyName] = event.target.value;
        this.setState(employeeData)
    }

    handleSubmit($event) {
        $event.preventDefault();
        let data = {...this.state};

        let {isValid, errorMessage} = employeesUtil.isValid(data);

        if (isValid) {
            fetch(dbUtil.URLS.employees.create, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }).then(response => {
                return response.json();
            }).then(createdObject => {
                this.props.employeeActions.addNewEmployee(createdObject);
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    render() {
        return (
            <div className={"app-employee__capture"}>
                <div className={"padding-all-md"}>
                    <h2>Capture new employee</h2>
                    <form onSubmit={this.handleSubmit.bind(this)} className={"app-form"}>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Given name</label>
                            <input type="text" className={"app-input-group__input"} name={"givenName"}
                                   title={"Given name"} onChange={this.handleChange.bind(this, 'givenName')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Family name(s)</label>
                            <input type="text" className={"app-input-group__input"} name={"familyName"}
                                   title={"Family name"} onChange={this.handleChange.bind(this, 'familyName')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Job position</label>
                            <input type="text" className={"app-input-group__input"} name={"jobPosition"}
                                   title={"Job position"} onChange={this.handleChange.bind(this, 'jobPosition')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Telephone number</label>
                            <input type="text" className={"app-input-group__input"} name={"telephoneNumber"}
                                   title={"Telephone number"}
                                   onChange={this.handleChange.bind(this, 'telephoneNumber')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Email address</label>
                            <input type="text" className={"app-input-group__input"} name={"emailAddress"}
                                   title={"Email address"} onChange={this.handleChange.bind(this, 'emailAddress')}/>
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
    employees: state.employees
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CaptureEmployee);