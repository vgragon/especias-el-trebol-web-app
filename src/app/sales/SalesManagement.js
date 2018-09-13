import React, {Component} from 'react';
import {connect} from 'react-redux';

import CaptureSales from "./capture-sales/CaptureSales";
import SalesHistory from "./sales-history/SalesHistory";

import './SalesManagement.css';

class SalesManagement extends Component {
    render() {
        return (
            <section className={"app-page app-sales-management"}>
                <div className={"app-capture-sales-container"}>
                    <CaptureSales/>
                </div>
                <div className={"app-sales-history-container"}>
                    <SalesHistory/>
                </div>
                <div className="clearfix"/>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {}
};

export default connect(
    mapStateToProps
)(SalesManagement);