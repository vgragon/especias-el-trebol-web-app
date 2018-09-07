import React, {Component} from 'react';

import './DropdownOptions.css';

class DropdownOptions extends Component {
    render() {
        let {onSelect, options, propertyWithID, propertyWithName, selectedOption} = this.props;
        selectedOption = selectedOption || {};

        let optionsHTML = options.map((option, index) => {
            let dropdownOption = {id: option[propertyWithID], text: option[propertyWithName]};
            let className = "b-options-list__option";
            className += selectedOption.id === option.id ? " selected" : "";
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