$("#save").click(function() {
    userProperties.setString("hostURL", $("#host_url").val());
    userProperties.setString("language", $("#language").val());
    userProperties.setString("lifespan", $("#lifespan").val());
    userProperties.setString("title", $("#title").val());
    if($("input[name=private]:checked").val() == "private"){
        userProperties.setBool("privacy", true);
    } else {
        userProperties.setBool("privacy", false);
    }

    saveProperties(userProperties);
});

function saveProperties(userProperties) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
    userProperties.saveTo(file.toString());
    file = null;
    displayMessage("Settings saved", "info");
}

// fill out the values
var userProperties = getProperties();
$("#host_url").val(userProperties.getString("hostURL"));
$("#language").val(userProperties.getString("language"));
$("#lifespan").val(userProperties.getString("lifespan"));
$("#title").val(userProperties.getString("title"));
if( userProperties.getBool("privacy", false) ){
    $("#privacy-private").prop('checked', true);
} else {
    $("#privacy-public").prop('checked', true);
}