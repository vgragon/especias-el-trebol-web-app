import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import $ from 'jquery';

import './Dropdown.css';
import DropdownOptions from "../dropdown-options/DropdownOptions";

const placeholderOption = {id: "DEFAULT", text: "Select an option"};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        let {propertyWithID, propertyWithName, propertyWithImage, selectedOption} = this.props;
        this.state = {...props};
        this.state.selectedOption = selectedOption ? this.prepareSelectedOption(selectedOption, propertyWithID, propertyWithName, propertyWithImage) : placeholderOption;
        this.handleClickOutsideDropdown = this.handleClickOutsideDropdown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSelect(callback, option) {
        this.setState({isExpanded: false});
        callback(option);
    }

    handleClick() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    prepareSelectedOption(originalOption, propertyWithID, propertyWithName, propertyWithImage) {
        return {
            id: originalOption[propertyWithID],
            text: originalOption[propertyWithName],
            image: originalOption[propertyWithImage]
        };
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
                        {selectedOption.text}
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
        let newSelectedOption = !this.state.selectedOption && newProps.selectedOption;
        let hasSelectedOptionChanged = (this.state.selectedOption && newProps.selectedOption) && (this.state.selectedOption.id !== newProps.selectedOption.id);
        if (newSelectedOption || hasSelectedOptionChanged) {
            state.selectedOption = this.prepareSelectedOption(newProps.selectedOption, newProps.propertyWithID, newProps.propertyWithName);
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