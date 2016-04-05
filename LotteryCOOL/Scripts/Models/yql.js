var Yql = {
    getYqlUrl: function (sourceUrl, dataType, format) {
        return [
            "http://query.yahooapis.com/v1/public/yql",
            "?q=" + encodeURIComponent("select * from " + dataType + " where url='" + sourceUrl + "'"),
            "&format=" + format + "&callback=?"
        ].join("");
    }
};