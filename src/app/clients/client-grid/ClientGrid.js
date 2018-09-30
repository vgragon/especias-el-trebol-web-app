import React, {Component} from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as clientActions from "../../../store/actions/client";

import defaultPersonImage from '../../../assets/images/default-person-300x300.jpg';

import './ClientGrid.css';

class ClientGrid extends Component {
    render() {
        let clientHTML = this.props.clients.map((client, index) => {
            let imageStyles = {
                backgroundImage: `url(${client.image || defaultPersonImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            };

            return (
                <div className={"app-client-card"} key={index}>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientGrid);