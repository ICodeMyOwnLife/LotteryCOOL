/// <reference path="Libraries/jquery-2.2.2.js" />
$(function() {
    var jWindow = $(window), jHeader = $("header"), jMain = $("main"), jbtnFeeds = $("#btnFeeds"), jFeeds = $("#feeds");
    
    function setLocation() {
        var top = jHeader.outerHeight() + 12;
        jMain.css("padding", top + "px 0 0 0");
        jbtnFeeds.css("top", top + "px");
        jFeeds.css("top", top + "px");
    }

    jHeader.on("DOMSubtreeModified", function() {
        setLocation();
    });
    
    jWindow.resize(function() {
        setLocation();
    });

});

