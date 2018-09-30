export default {
    isValid: function (record) {
        switch (true) {
            case typeof record.name === "undefined":
                return {isValid: false, errorMessage: "Name is missing"};
            case typeof record.telephoneNumber === "undefined":
                return {isValid: false, errorMessage: "Telephone number is missing"};
            case typeof record.emailAddress === "undefined":
                return {isValid: false, errorMessage: "Email address is missing"};
        }

        return {isValid: true, errorMessage: undefined};
    }
};