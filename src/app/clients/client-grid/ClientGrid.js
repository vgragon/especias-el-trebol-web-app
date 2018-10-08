import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as clientActions from "../../../store/actions/client";

import defaultCompanyImage from '../../../assets/images/default-company-300x300.jpg';
import './ClientGrid.css';

class ClientGrid extends Component {
    handleClick(history, match, client) {
        this.props.clientActions.showClientDetail(client);
        history.push(`${match.url}/${client["_id"]}`);
    }

    render() {
        let clientHTML = this.props.clients.map((client, index) => {
            let imageStyles = {
                backgroundImage: `url(${client.image || defaultCompanyImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            };

            return (
                <div className={"app-client-card"} key={index}
                     onClick={this.handleClick.bind(this, this.props.history, this.props.match, client)}>
                    <div style={imageStyles} className={"app-client-card__image"} aria-label="Client image"/>
                    <div className={"app-client-card__info"}>
                        <div className={"app-client-card__name"}>
                            <strong title={client.name}>{client.name}</strong>
                        </div>
                        <div className={"app-client-card__telephone"}>
                            <span>{client.telephoneNumber}</span>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className={"app-client-grid"}>{clientHTML}</div>
        )
    }
}

const mapStateToProps = state => ({
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    clientActions: bindActionCreators(clientActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientGrid));