import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as clientActions from "../../store/actions/client";

import CaptureClient from './capture-client/CaptureClient';
import ClientCatalog from './client-catalog/ClientCatalog';


import './ClientManagement.css';


class ClientManagement extends Component {
    render() {
        return (
            <section className={"app-page app-client-management"}>
                <div className={"app-capture-client-container"}>
                    <CaptureClient/>
                </div>
                <div className={"app-client-catalog-container"}>
                    <ClientCatalog/>
                </div>
                <div className="clearfix"/>
            </section>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/clients')
            .then(response => {
                return response.json()
            })
            .then(json => {
                json = json.map(client => {
                    return client;
                });
                this.props.clientActions.loadClients(json);
            }).catch(ex => {
            console.log('parsing failed', ex)
        });
    }
}

const mapDispatchToProps = (dispatch) => ({
    clientActions: bindActionCreators(clientActions, dispatch)
});

export default connect(
    null,
    mapDispatchToProps
)(ClientManagement);