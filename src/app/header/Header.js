import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

import Navigation from './../navigation/Navigation';

import './Header.css';

class Header extends Component {
    render() {
        let activeRoute = this.props.routes.find(item => item.path === this.props.location.pathname);
        let activeRouteName = activeRoute ? activeRoute.name : "";

        return (
            <header className={"app-header"}>
                <div className={"app-header__navigation-container"}>
                    <Navigation/>
                    <h1 className={"app-header__title"}>
                        {activeRouteName}
                    </h1>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        routes: state.navigationItems
    }
};

export default withRouter(connect(mapStateToProps)(Header));