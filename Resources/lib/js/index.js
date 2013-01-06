// fill out the values
var userProperties = getProperties();
$("#host_url").val(userProperties.getString("hostURL"));
$("#language").val(userProperties.getString("language"));
$("#lifespan").val(userProperties.getString("lifespan"));
$("#title").val(userProperties.getString("title"));
if(userProperties.getBool("privacy")){
    $('#private').prop('checked', true);
}