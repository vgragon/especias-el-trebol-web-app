import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import $ from 'jquery';

import './Dropdown.css';

const placeholderOption = {id: "0", text: "Select an option"};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {...props};
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        let {propertyWithID, propertyWithName, selectedOption} = this.state;
        selectedOption = selectedOption || placeholderOption;

        let hasValues = this.state.options ? !!this.state.options.length : false;
        let options = hasValues ? this.state.options : [];

        let optionsHTML = options.map((option, index) => {
            let dropdownOption = {id: option[propertyWithID], text: option[propertyWithName]};
            let className = "b-options-list__option";
            className += selectedOption.id === dropdownOption.id ? " selected" : "";
            return <li className={className} key={index}
                       onClick={this.state.onSelect.bind(this, dropdownOption)}>{dropdownOption.text}</li>
        });

        let dropdownClass = "b-dropdown__options-list b-options-list";
        dropdownClass += this.state.isExpanded ? " expanded" : "";

        return (
            <div className="b-dropdown-container" ref='component'>
                <div className="b-dropdown" onClick={this.handleClick}>
                    <div className="b-dropdown__toggle--primary">
                        <FontAwesomeIcon className={"margin-right-sm"} icon={this.state.iconClassName}/>
                        {selectedOption.text}
                    </div>
                    <div className="b-dropdown__toggle--secondary">
                        <FontAwesomeIcon icon="chevron-down"/>
                    </div>
                </div>
                <ul className={dropdownClass}>
                    {optionsHTML}
                </ul>
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
        let _this = this;
        document.body.addEventListener('click', function (ev) {
            let touchedElement = $(ev.target);
            let component = $(_this.refs.component);
            if ($(touchedElement).closest(component).length === 0) {
                _this.setState({isExpanded: false});
            }
        });

    }
}

export default Dropdown;