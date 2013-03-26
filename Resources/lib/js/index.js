$("#create").click(function() {
    submitClip();
});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function submitClip() {
    var clip = {};
    clip["clip"] = $('form[name="clip"]').serializeObject();
    
    var url = getServerUrl();
    if(!endsWith(url, "/")){
        url += "/";
    }
    url += "create.json";
    
    $.post(url, clip)
    .fail(function(jqXHR, textStatus, errorThrown) {
        if(jqXHR.status == 404) {
            displayMessage("Got HTTP 404 error. Please make sure your Host URL is accurate.", "error");
        }
        else if( jqXHR.status == 422) {
            var errors = jQuery.parseJSON(jqXHR.responseText);
            var message = "<ul>";
            $.each( errors, function( key, value ) {
                message += "<li>" + key + " - " + value[0] + "</li>";
            });
            message += "</ul>";
            displayMessage(message, "error");
        }
        else {
            displayMessage("Something went wrong. HTTP Status:" + jqXHR.status + ". Message:" + jqXHR.responseText, "error");
        }
    })
    .done(function(data, textStatus, jqXHR){
        var url = getServerUrl() + "/" + data.id;
        var display = "<p>Clip <a data-outer-link='" + url +"'>" + data.id + "</a> created! ";
        display += "<i class='icon-copy' data-copy='" + url + "' title='Copy link to Clipboard'></i></p>"
        displayMessage(display, "info");
    });
}

function getServerUrl(){
    var url = userProperties.getString("hostURL");
    if(url == ""){
        // Use default url if one is not supplied
        url = "http://www.developerdan.com/clipster" + url;
    }
    return url;
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