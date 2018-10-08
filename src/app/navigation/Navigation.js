import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";

import DropdownOptions from "../common/dropdown-options/DropdownOptions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as navigationActions from './../../store/actions/navigation';

import './Navigation.css';
import $ from "jquery";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {isExpanded: false};
        this.handleSelect = this.handleSelect.bind(this, this.props.history);
        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.handleClickOutsideDropdown = this.handleClickOutsideDropdown.bind(this);
    }

    handleSelect(history, route) {
        history.push(route.path);
    }

    toggleNavigation() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    handleClickOutsideDropdown(ev) {
        let _this = this;
        let touchedElement = $(ev.target);
        let component = $(_this.refs.component);
        if ($(touchedElement).closest(component).length === 0) {
            _this.setState({isExpanded: false});
        }
    }

    render() {
        let activeRoute = this.props.navigationItems.find(item => item.path === this.props.location.pathname);

        let isExpandedClass = this.state.isExpanded ? "app-dropdown__toggler expanded" : "";

        return (
            <nav className={"app-navigation " + isExpandedClass} onClick={this.toggleNavigation} ref={"component"}>
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

    componentDidMount() {
        document.body.addEventListener('click', this.handleClickOutsideDropdown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleClickOutsideDropdown);
    }
}

const mapStateToProps = state => {
    return {
        navigationItems: state.navigationItems.filter(item => !item.hideOnNavigation)
    }
};

export default withRouter(connect(
    mapStateToProps
)(Navigation));