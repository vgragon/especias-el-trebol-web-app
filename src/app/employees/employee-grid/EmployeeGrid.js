import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";

import * as employeeActions from "../../../store/actions/employee";

import defaultPersonImage from '../../../assets/images/default-person-300x300.jpg';

import './EmployeeGrid.css';

class EmployeeGrid extends Component {
    handleClick(history, match, employee) {
        this.props.employeeActions.showEmployeeDetail(employee);
        history.push(`${match.url}/${employee["_id"]}`);
    }

    render() {
        let employeesHTML = this.props.employees.sort((a, b) => {
            if (a.givenName < b.givenName) return -1;
            if (a.givenName > b.givenName) return 1;
            return 0;
        }).map((employee, index) => {
            let imageStyles = {
                backgroundImage: `url(${employee.image || defaultPersonImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            };

            return (
                <div className={"app-employee-card"} key={index}
                     onClick={this.handleClick.bind(this, this.props.history, this.props.match, employee)}>
                    <div style={imageStyles} className={"app-employee-card__image"} aria-label="Employee image"/>
                    <div className={"app-employee-card__info"}>
                        <div className={"app-employee-card__name"}>
                            <strong title={employee.fullName}>{employee.fullName}</strong>
                        </div>
                        <div className={"app-employee-card__position"}>
                            <span>{employee.jobPosition}</span>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className={"app-employee-grid"}>{employeesHTML}</div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employees
});

const mapDispatchToProps = (dispatch) => ({
    employeeActions: bindActionCreators(employeeActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeGrid));