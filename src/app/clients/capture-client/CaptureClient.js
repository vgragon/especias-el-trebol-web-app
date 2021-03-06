import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as clientActions from "../../../store/actions/client";

import clientsUtil from "../utilities/ClientService";
import dbUtil from "../../../server";

import './CaptureClient.css';

class CaptureClient extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            name: "",
            address: "",
            googleMapsUrl: "",
            telephoneNumber: "",
            emailAddress: ""
        };
    }

    handleChange(propertyName, event) {
        let salesData = {};
        salesData[propertyName] = event.target.value;
        this.setState(salesData)
    }

    handleSubmit($event) {
        $event.preventDefault();
        let data = {...this.state};

        let {isValid, errorMessage} = clientsUtil.isValid(data);

        if (isValid) {
            fetch(dbUtil.URLS.clients.create, {
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
                this.props.clientActions.addNewClient(createdObject);
                this.setState(this.getInitialState());
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    render() {
        return (
            <div className={"app-client__capture"}>
                <div className={"padding-all-md"}>
                    <h2>Capture new client</h2>
                    <form onSubmit={this.handleSubmit.bind(this)} className={"app-form"}>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Name</label>
                            <input type="text" className={"app-input-group__input"} name={"name"}
                                   value={this.state.name}
                                   title={"Name"} onChange={this.handleChange.bind(this, 'name')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Address</label>
                            <input type="text" className={"app-input-group__input"} name={"address"}
                                   value={this.state.address}
                                   title={"Address"} onChange={this.handleChange.bind(this, 'address')}/>
                        </div>
                        <div className={"app-input-group"}>
                            <label className={"app-input-group__label"}>Google Maps URL</label>
                            <input type="text" className={"app-input-group__input"} name={"googleMapsUrl"}
                                   value={this.state.googleMapsUrl}
                                   title={"Google Maps URL"} onChange={this.handleChange.bind(this, 'googleMapsUrl')}/>
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
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    clientActions: bindActionCreators(clientActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CaptureClient);