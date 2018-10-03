import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import dbUtil from "../../../server";
import * as employeeActions from "../../../store/actions/employee";
import * as dialogActions from "../../../store/actions/dialog";
import employeesUtil from "../utilities/EmployeeService";

import defaultPersonImage from '../../../assets/images/default-person-300x300.jpg';
import './EmployeeDetail.css';

class EmployeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            givenName: "",
            familyName: "",
            jobPosition: "",
            telephoneNumber: "",
            emailAddress: "",
        };
    }

    handleChange(propertyName, event) {
        let data = {};
        data[propertyName] = event.target.value;
        this.setState(data);
    }

    handleSubmit() {
        let data = {...this.state};

        let {isValid, errorMessage} = employeesUtil.isValid(data);

        if (isValid) {
            fetch(dbUtil.URLS.employees.update, {
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
                this.props.employeeActions.updateEmployee(createdObject);
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    navigateToCatalog($event) {
        if (typeof $event !== "undefined") $event.preventDefault();
        this.props.employeeActions.showEmployeeDetail({"_id": null});
        this.props.history.push("/employees");
    }

    getCatalogUrl(history) {
        let urlParts = history.location.pathname.split("/");
        urlParts.splice(-1);
        return urlParts.join("/");
    }

    handleClickOnDelete() {
        this.props.dialogActions.setDialogParams({
            title: "Delete employee",
            message: `<div class="margin-bottom-sm">Are you sure you want to delete the following employee:</div> <strong>${this.state.givenName} ${this.state.familyName}</strong>`,
            callback: this.deleteEmployee.bind(this, this.state["_id"])
        });
        this.props.dialogActions.toggleDialog(true);
    }

    deleteEmployee(id) {
        fetch(dbUtil.URLS.employees.delete, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({id}), // body data type must match "Content-Type" header
        }).then(response => {
            return response.json();
        }).then(deletedEmployee => {
            this.props.employeeActions.deleteEmployee(id);
            this.props.dialogActions.toggleDialog(false);
            this.navigateToCatalog();
        }); // parses response to JSON
    }

    render() {
        let imageStyles = {
            backgroundImage: `url(${this.state.image || defaultPersonImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        };

        return (
            <div className={"app-employee-detail"}>
                <a className={"app-anchor"} href={this.getCatalogUrl(this.props.history, this.props.match)}
                   onClick={this.navigateToCatalog.bind(this)}>Back to catalog</a>
                <div style={imageStyles} className={"app-employee__image"} aria-label="Employee image"/>
                <div className={"app-employee__info"}>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Given name</label>
                        <input type="text" className={"app-input-group__input"} name={"givenName"}
                               value={this.state.givenName}
                               title={"Given name"} onChange={this.handleChange.bind(this, 'givenName')}/>
                    </div>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Family name(s)</label>
                        <input type="text" className={"app-input-group__input"} name={"familyName"}
                               value={this.state.familyName}
                               title={"Family name"} onChange={this.handleChange.bind(this, 'familyName')}/>
                    </div>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Job position</label>
                        <input type="text" className={"app-input-group__input"} name={"jobPosition"}
                               value={this.state.jobPosition}
                               title={"Job position"} onChange={this.handleChange.bind(this, 'jobPosition')}/>
                    </div>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Telephone number</label>
                        <input type="text" className={"app-input-group__input"} name={"telephoneNumber"}
                               value={this.state.telephoneNumber} title={"Telephone number"}
                               onChange={this.handleChange.bind(this, 'telephoneNumber')}/>
                    </div>
                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Email address</label>
                        <input type="text" className={"app-input-group__input"} name={"emailAddress"}
                               value={this.state.emailAddress}
                               title={"Email address"} onChange={this.handleChange.bind(this, 'emailAddress')}/>
                    </div>
                    <div className={"margin-top-md"}>
                        <button className={"app-button app-button--primary app-button--update-employee"}
                                onClick={this.handleSubmit.bind(this)}>Update
                        </button>
                        <button className={"app-button app-button--danger app-button--delete-employee margin-left-md"}
                                onClick={this.handleClickOnDelete.bind(this)}>Delete
                        </button>
                    </div>
                </div>
            </div>
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
                this.props.employeeActions.loadEmployees(json);
                let employeeID = this.props.match.params.id;
                let employee = this.props.employees.find(employee => employee["_id"] === employeeID);
                this.setState({...employee});
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapStateToProps = state => ({
    employees: state.employees
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail));