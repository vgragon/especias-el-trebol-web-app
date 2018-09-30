import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as salesActions from "../../../store/actions/sales";

import './ClientFilters.css';

class ClientFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={"app-client-filters"}>
                <h3>Filter by</h3>
                <div className={"app-sales-filter app-input-group"}>
                    <label className={"app-input-group__label"}>Name</label>
                    <input type={"text"} className={"app-input-group__input"}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    salesActions: bindActionCreators(salesActions, dispatch),
});


export default connect(
    null,
    mapDispatchToProps
)(ClientFilters);