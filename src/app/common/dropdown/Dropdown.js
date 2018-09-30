import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import $ from 'jquery';

import './Dropdown.css';
import DropdownOptions from "../dropdown-options/DropdownOptions";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {...props};
        this.state.selectedOption = this.props.selectedOption || this.state.placeholderOption;
        this.handleClickOutsideDropdown = this.handleClickOutsideDropdown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSelect(callback, option) {
        if (!!this.state.selectedOption && option[this.state.propertyWithID] === this.state.selectedOption[this.state.propertyWithID]) {
            callback(undefined);
        } else callback(option);

        this.setState({isExpanded: false});
    }

    handleClick() {
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
        let {propertyWithID, propertyWithName, selectedOption} = this.state;
        let options = this.state.options && this.state.options.length ? this.state.options : [];
        let isExpandedClass = this.state.isExpanded ? "app-dropdown__toggler expanded" : "";

        return (
            <div className={"b-dropdown-container " + isExpandedClass} ref='component'>
                <div className="b-dropdown" onClick={this.handleClick}>
                    <div className="b-dropdown__toggle--primary">
                        {selectedOption[this.state.propertyWithName]}
                    </div>
                    <div className="b-dropdown__toggle--secondary">
                        <FontAwesomeIcon icon="chevron-down"/>
                    </div>
                </div>
                <DropdownOptions onSelect={this.handleSelect.bind(this, this.state.onSelect)} options={options}
                                 propertyWithID={propertyWithID}
                                 propertyWithName={propertyWithName} selectedOption={selectedOption}/>
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        let state = {};
        if (newProps.selectedOption) {
            let hasSelectedOptionChanged = this.state.selectedOption[this.state.propertyWithID] !== newProps.selectedOption[this.state.propertyWithID];
            if (hasSelectedOptionChanged) {
                state.selectedOption = newProps.selectedOption;
            }
        } else {
            state.selectedOption = newProps.placeholderOption;
        }

        state.options = newProps.options;
        this.setState(state);
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleClickOutsideDropdown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleClickOutsideDropdown);
    }
}

export default Dropdown;