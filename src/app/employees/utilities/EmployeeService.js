export default {
    isValid: function (record) {
        switch (true) {
            case !record.givenName:
                return {isValid: false, errorMessage: "Given name is missing"};
            case !record.familyName:
                return {isValid: false, errorMessage: "Family name is missing"};
            case !record.jobPosition:
                return {isValid: false, errorMessage: "Job position is missing"};
            case !record.telephoneNumber:
                return {isValid: false, errorMessage: "Telephone number is missing"};
        }

        return {isValid: true, errorMessage: undefined};
    }
};