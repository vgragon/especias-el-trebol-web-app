import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as clientActions from "../../../store/actions/client";

import ClientGrid from '../client-grid/ClientGrid';
import ClientFilters from '../client-filters/ClientFilters';

import './ClientCatalog.css';

class ClientCatalog extends Component {
    render() {
        return (
            <div className={"app-client-catalog"}>
                <div className={"padding-all-md"}>
                    <h2 className={"margin-bottom-md"}>Client catalog</h2>
                    <div className={"app-client-filters-container"}>
                        <ClientFilters/>
                    </div>
                    <div className={"app-client__table-container"}>
                        <ClientGrid/>
                    </div>
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
)(ClientCatalog);