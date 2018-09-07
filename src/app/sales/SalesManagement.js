import React, {Component} from 'react';
import {connect} from 'react-redux';

import './SalesManagement.css';

class SalesManagement extends Component {
    render() {
        return (
            <section className={"app-page app-sales-management"}>
                Sales Management
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