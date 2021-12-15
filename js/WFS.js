function getFeatures(url, callback){

    $.ajax({
        url: url, 
        success: function(response) {
                callback(JSON.stringify(response.features));
            }, 
        error: function(error) {
                console.log(JSON.stringify(error.status));
            },
    });
}