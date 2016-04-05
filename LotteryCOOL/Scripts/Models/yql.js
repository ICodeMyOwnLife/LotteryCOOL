var Yql = {
    getYqlUrl: function(sourceUrl) {
        return [
            "http://query.yahooapis.com/v1/public/yql",
            "?q=" + encodeURIComponent("select * from rss where url='" + sourceUrl + "'"),
            "&format=json&callback=?"
        ].join("");
    }
};