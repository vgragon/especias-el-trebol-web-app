export default {
    isValid: function (record) {
        switch (true) {
            case !record.name:
                return {isValid: false, errorMessage: "Name is missing"};
            case !record.address:
                return {isValid: false, errorMessage: "Address is missing"};
            case !record.telephoneNumber:
                return {isValid: false, errorMessage: "Telephone number is missing"};
            case !record.emailAddress:
                return {isValid: false, errorMessage: "Email address is missing"};
        }

        return {isValid: true, errorMessage: undefined};
    }
};