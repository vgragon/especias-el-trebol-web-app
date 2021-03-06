export default {
    formatNumber: function (criteria, number) {
        if (criteria === "CURRENCY") {
            let n = number,
                c = 2,
                d = ".",
                t = ",",
                s = n < 0 ? "-" : "",
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = i.length > 3 ? i.length % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }
    }
}