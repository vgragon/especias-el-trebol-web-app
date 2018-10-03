import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import * as clientActions from "../../../store/actions/client";
import * as dialogActions from "../../../store/actions/dialog";
import dbUtil from "../../../server";
import clientsUtil from "../../clients/utilities/ClientService";

import defaultCompanyImage from '../../../assets/images/default-company-300x300.jpg';
import './ClientDetail.css';

class ClientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            googleMapsUrl: "",
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

        let {isValid, errorMessage} = clientsUtil.isValid(data);

        if (isValid) {
            fetch(dbUtil.URLS.clients.update, {
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
            }).then(updatedClient => {
                this.props.clientActions.updateClient(updatedClient);
            }); // parses response to JSON
        } else {
            console.error(errorMessage);
        }
    }

    navigateToCatalog($event) {
        if (typeof $event !== "undefined") $event.preventDefault();
        this.props.clientActions.showClientDetail({"_id": null});
        this.props.history.push("/clients");
    }

    getCatalogUrl(history) {
        let urlParts = history.location.pathname.split("/");
        urlParts.splice(-1);
        return urlParts.join("/");
    }

    handleClickOnDelete() {
        this.props.dialogActions.setDialogParams({
            title: "Delete client",
            message: `<div class="margin-bottom-sm">Are you sure you want to delete the following client:</div> <strong>${this.state.name}</strong>`,
            callback: this.deleteClient.bind(this, this.state["_id"])
        });
        this.props.dialogActions.toggleDialog(true);
    }

    deleteClient(id) {
        fetch(dbUtil.URLS.clients.delete, {
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
        }).then(deletedClient => {
            this.props.clientActions.deleteClient(id);
            this.props.dialogActions.toggleDialog(false);
            this.navigateToCatalog();
        }); // parses response to JSON
    }

    render() {
        let imageStyles = {
            backgroundImage: `url(${this.state.image || defaultCompanyImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        };

        return (
            <div className={"app-client-detail"}>
                <a className={"app-anchor"} href={this.getCatalogUrl(this.props.history, this.props.match)}
                   onClick={this.navigateToCatalog.bind(this)}>Back to catalog</a>
                <div style={imageStyles} className={"app-client__image"} aria-label="Employee image"/>
                <div className={"app-client__info"}>
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
                    <div className={"margin-top-md"}>
                        <button className={"app-button app-button--primary app-button--update-client"}
                                onClick={this.handleSubmit.bind(this)}>Update
                        </button>
                        <button className={"app-button app-button--danger app-button--delete-client margin-left-md"}
                                onClick={this.handleClickOnDelete.bind(this)}>Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        fetch(dbUtil.URLS.clients.read)
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(client => {
                    return client;
                });
                this.props.clientActions.loadClients(json);
                let clientID = this.props.match.params.id;
                let client = this.props.clients.find(client => client["_id"] === clientID);
                this.setState({...client});
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapStateToProps = state => ({
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    clientActions: bindActionCreators(clientActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientDetail));