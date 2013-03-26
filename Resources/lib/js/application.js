$(".notices").hide();

$("#home").click(function() {
    window.location = "app://index.html";
});

$("#settings").click(function() {
    window.location = "app://settings.html";
});

$("#full-content").on("click","a[data-outer-link]", function(){
    Ti.Platform.openURL($(this).data("outer-link"));
});

$(".close").click(function(){
    $(this).closest(".notices").hide();
});

$("#full-content").on("click",".icon-copy", function(){
    Ti.UI.Clipboard.setText($(this).data("copy"));
});

function displayMessage(message, type) {
    if(type == "error"){
        $('#error-message-content').html("<p>" + message + "</p>");
        $("#error-message").show();
    }
    else if(type == "warning"){
        $('#warning-message-content').html("<p>" + message + "</p>");
        $("#warning-message").show();
    }
    else if(type == "info"){
        $('#info-message-content').html("<p>" + message + "</p>");
        $("#info-message").show();
    }
}

function getProperties() {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
    var userProperties;
    
    //if file exists, then load properties.
    if(file.exists()) {
        userProperties = Ti.App.loadProperties(file.toString());
    } else {
        //create new set of properties if file doesn't exist
        userProperties = Ti.App.createProperties({
            hostURL : "http://www.developerdan.com/clipster",
            language : "text",
            lifespan : "",
            title : "Untitled",
            privacy : false    
        });
        userProperties.saveTo(file.toString());
    }

    //null out file object as pointer not used anymore
    file = null;
    return userProperties;
}