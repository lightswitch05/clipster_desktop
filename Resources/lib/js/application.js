$("#home").click(function() {
    window.location = "app://index.html";
});

$("#settings").click(function() {
    window.location = "app://settings.html";
});

$("#close-error-message").click(function() {
    $(".error-bar").css("display","none");
});

$("#close-warning-message").click(function() {
    $(".warning-bar").css("display","none");
});

$("#close-info-message").click(function() {
    $(".info-bar").css("display","none");
});

function displayMessage(message, type) {
    if(type == "error"){
        $('#error-message-content').html("<p>" + message + "</p>");
        $(".error-bar").css("display","block");
    }
    else if(type == "warning"){
        $('#warning-message-content').html("<p>" + message + "</p>");
        $(".warning-bar").css("display","block");
    }
    else if(type == "info"){
        $('#info-message-content').html("<p>" + message + "</p>");
        $(".info-bar").css("display","block");
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