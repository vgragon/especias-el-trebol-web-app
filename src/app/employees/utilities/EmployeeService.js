export default {
    isValid: function (record) {
        switch (true) {
            case typeof record.givenName === "undefined":
                return {isValid: false, errorMessage: "Given name is missing"};
            case typeof record.familyName === "undefined":
                return {isValid: false, errorMessage: "Family name is missing"};
            case typeof record.jobPosition === "undefined":
                return {isValid: false, errorMessage: "Job position is missing"};
            case typeof record.telephoneNumber === "undefined":
                return {isValid: false, errorMessage: "Telephone number is missing"};
        }

        return {isValid: true, errorMessage: undefined};
    }
};