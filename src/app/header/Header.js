import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navigation from './../navigation/Navigation';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className={"app-header"}>
                <Navigation/>
                {this.props.pageTitle}
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        pageTitle: state.navigation
    }
};

export default connect(
    mapStateToProps
)(Header);