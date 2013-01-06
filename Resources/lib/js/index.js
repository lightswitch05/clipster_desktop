$("#create").click(function() {
    submitClip();
});

function submitClip() {
    var clip = {}
    clip["clip"] = $('form[name="clip"]').serializeObject();
    var url = userProperties.getString("hostURL") + "/create.json";
    url = url.replace("//", "/"); 
    $.post(url, clip)
    .error(function(jqXHR, textStatus, errorThrown) {
        if(jqXHR.status == 404) {
            displayMessage("Got HTTP 404 error. Please make sure your Host URL is accurate.", "error");
        }
        else if( jqXHR.status == 422) {
            displayMessage("Validation failed: " + jqXHR.responseText, "error");
        }
        else {
            displayMessage("Something went wrong. HTTP Status:" + jqXHR.status + ". Message:" + jqXHR.responseText, "error");
            alert(JSON.stringify(jqXHR));
        }
    })
    .complete(function() { });
}

// fill out the values
var userProperties = getProperties();
$("#language").val(userProperties.getString("language"));
$("#lifespan").val(userProperties.getString("lifespan"));
$("#title").val(userProperties.getString("title"));
if(userProperties.getBool("privacy")){
    $('#private').prop('checked', true);
}

// setup serializeObject
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};