$("#save").click(function() {
    //userProperties.setString("hostURL", $("#host_url").val);
    //userProperties.setString("language", $("#language").val);
    //userProperties.setString("lifespan", $("#lifespan").val);
    userProperties.setString("title", "test12");
    //userProperties.setBool("privacy", $('input:radio[name=private]').filter('[value=private]').val);
    if(!saveProperties(userProperties)){
        displayMessage("Something went wrong while saving your settings", "error");
    }
});

function getProperties() {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
    alert(file);
    var userProperties;
    
    //if file exists, then load properties.
    if(file.exists()) {
        userProperties = Ti.App.loadProperties(file);
        if(userProperties == undefined){
            userProperties = Ti.App.createProperties();
        }
    } else {
        //create new set of properties if file doesn't exist
        userProperties = Ti.App.createProperties();
    }

    //null out file object as pointer not used anymore
    file = null;
    return userProperties;
}

function saveProperties(userProperties) {
    if(userProperties != null){
        var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), "user.properties");
        userProperties.saveTo(file);
        file = null;
        return true;
    }
    return false;
}

// fill out the values
var userProperties = getProperties();
$("#host_url").val(userProperties.getString("hostURL", "http://www.developerdan.com/clipster"));
$("#language").selected = userProperties.getString("language", "Plain text");
$("#lifespan").selected = userProperties.getString("lifespan", "Forever");
$("#title").val(userProperties.getString("title", "Untitled"));
if( userProperties.getBool("privacy", false) ){
    $('input:radio[name=private]').filter('[value=private]').selected = true;
} else {
    $('input:radio[name=private]').filter('[value=public]').selected = true;
}