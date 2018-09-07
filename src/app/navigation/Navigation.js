import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

import DropdownOptions from "../common/dropdown-options/DropdownOptions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as navigationActions from './../../store/actions/navigation';

import './Navigation.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {isExpanded: false};
        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.handleSelect = this.handleSelect.bind(this, this.props.history);
    }

    handleSelect(history, route) {
        history.push(route.path);
    }

    toggleNavigation() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        let activeRoute = this.props.navigationItems.find(item => item.path === this.props.location.pathname);

        let isExpandedClass = this.state.isExpanded ? "app-navigation__toggler expanded" : "";

        return (
            <nav className={"app-navigation " + isExpandedClass} onClick={this.toggleNavigation}>
                <FontAwesomeIcon icon="bars"/>
                <DropdownOptions options={this.props.navigationItems}
                                 iconClassName={"chevron-down"}
                                 selectedOption={activeRoute}
                                 onSelect={this.handleSelect}
                                 propertyWithID="path"
                                 propertyWithImage="image"
                                 propertyWithName="name"/>
            </nav>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelect: route => {
            dispatch(navigationActions.setActiveNavigation(route));
        }
    }
};

const mapStateToProps = state => {
    return {
        navigationItems: state.navigationItems.filter(item => !item.hideOnNavigation)
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation));