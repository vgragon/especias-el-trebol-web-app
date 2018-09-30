import React, {Component} from 'react';

import './DropdownOptions.css';

class DropdownOptions extends Component {
    render() {
        let {onSelect, options, propertyWithID, propertyWithName, selectedOption} = this.props;
        selectedOption = selectedOption || {};

        let optionsHTML = options.map((option, index) => {
            let dropdownOption = {text: option[propertyWithName]};
            dropdownOption[propertyWithID] = option[propertyWithID];
            let className = "b-options-list__option";
            className += selectedOption[propertyWithID] === option[propertyWithID] ? " selected" : "";
            return <li className={className} key={index}
                       onClick={onSelect.bind(this, option)}>{dropdownOption.text}</li>
        });

        return (
            <ul className={"app-dropdown__options b-dropdown__options-list"}>
                {optionsHTML}
            </ul>
        )
    }
}

export default DropdownOptions;