function getFeatures(url, callback){

    $.ajax({
        url: url, 
        success: function(response) {
                callback(response.features);
            }, 
        error: function(error) {
                console.log(JSON.stringify(error.status));
            },
    });
}