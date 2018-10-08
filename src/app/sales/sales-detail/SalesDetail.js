import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import dbUtil from "../../../server";
import * as salesActions from "../../../store/actions/sales";
import * as dialogActions from "../../../store/actions/dialog";
import salesUtil from "../utilities/SalesService";

import Dropdown from './../../common/dropdown/Dropdown';

import './SalesDetail.css';

class SalesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            employee: undefined,
            client: undefined,
            amount: 0
        };
    }

    handleChange(propertyName, event) {
        let data = {};
        data[propertyName] = event.target.value;
        this.setState(data);
    }

    handleSelect(propertyName, value) {
        let salesData = {};
        salesData[propertyName] = value;
        this.setState(salesData)
    }

    handleSubmit() {
        let data = {...this.state};

        let {isValid, errorMessage} = salesUtil.isValid(data);

        if (isValid) {
            fetch(dbUtil.URLS.sales.update, {
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
                this.props.salesActions.updateSale(createdObject);
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    navigateToCatalog($event) {
        if (typeof $event !== "undefined") $event.preventDefault();
        this.props.salesActions.showSaleDetail({"_id": null});
        this.props.history.push("/sales");
    }

    getCatalogUrl(history) {
        let urlParts = history.location.pathname.split("/");
        urlParts.splice(-1);
        return urlParts.join("/");
    }

    handleClickOnDelete() {
        this.props.dialogActions.setDialogParams({
            title: "Delete employee",
            message: `<div class="margin-bottom-sm">Are you sure you want to delete this sales record:</div>`,
            callback: this.deleteSalesRecord.bind(this, this.state["_id"])
        });
        this.props.dialogActions.toggleDialog(true);
    }

    deleteSalesRecord(id) {
        fetch(dbUtil.URLS.sales.delete, {
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
        }).then(deletedSalesRecord => {
            this.props.salesActions.deleteSale(id);
            this.props.dialogActions.toggleDialog(false);
            this.navigateToCatalog();
        }); // parses response to JSON
    }

    render() {
        return (
            <div className={"app-sales-detail"}>
                <a className={"app-anchor"} href={this.getCatalogUrl(this.props.history, this.props.match)}
                   onClick={this.navigateToCatalog.bind(this)}>Back to table</a>
                <div className={"app-employee__info"}>

                    <div className={"app-input-group"}>
                        <label className={"app-input-group__label"}>Date</label>
                        <input type="date" className={"app-input-group__input"} name={"date"}
                               value={this.state.date}
                               title={"Date"} onChange={this.handleChange.bind(this, 'date')}/>
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
                        <input type="number" className={"app-input-group__input"} name={"amount"}
                               value={this.state.amount} title={"Sales amount"}
                               onChange={this.handleChange.bind(this, 'amount')}/>
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
        fetch(dbUtil.URLS.sales.read)
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(sale => {
                    return sale;
                });
                this.props.salesActions.loadSales(json);
                let salesId = this.props.match.params.id;
                let sale = this.props.sales.find(sale => sale["_id"] === salesId);
                this.setState({...sale});
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapStateToProps = state => ({
    sales: state.sales
});

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesDetail));