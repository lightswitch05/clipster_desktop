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