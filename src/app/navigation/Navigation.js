import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <nav className={"app-navigation"} onClick={this.props.toggleNavigation}>
                nav
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNavigation: id => {
            // dispatch()
        }
    }
};

const mapStateToProps = state => {
    return {
        // items: state.navigation.items
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);