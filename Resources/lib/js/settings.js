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

function getProperties() {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
    var userProperties;
    
    //if file exists, then load properties.
    if(file.exists()) {
        userProperties = Ti.App.loadProperties(file);
    } else {
        //create new set of properties if file doesn't exist
        userProperties = Ti.App.createProperties();
        userProperties.saveTo(file.toString());
    }

    //null out file object as pointer not used anymore
    file = null;
    return userProperties;
}

function saveProperties(userProperties) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
    userProperties.saveTo(file.toString());
    file = null;
}

// fill out the values
var userProperties = getProperties();
$("#host_url").val(userProperties.getString("hostURL", "http://www.developerdan.com/clipster"));
$("#language").selected = userProperties.getString("language", "Plain text");
$("#lifespan").selected = userProperties.getString("lifespan", "Forever");
$("#title").val(userProperties.getString("title", "Untitled"));
if( userProperties.getBool("privacy", false) ){
    $('input:radio[name=private]').filter('[value=private]').val(true);
} else {
    $('input:radio[name=private]').filter('[value=public]').val(true);
}