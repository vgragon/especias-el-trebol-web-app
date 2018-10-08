export default {
    isValid: function (record) {
        switch (true) {
            case typeof record.employee === "undefined":
                return {isValid: false, errorMessage: "Employee is missing"};
            case typeof record.client === "undefined":
                return {isValid: false, errorMessage: "Client is missing"};
            case typeof record.date === "undefined":
                return {isValid: false, errorMessage: "Date is missing"};
            case typeof record.amount === "undefined":
                return {isValid: false, errorMessage: "Amount is missing"};
        }

        return {isValid: true, errorMessage: undefined};
    }
};