function getFeatures(url){

    $.ajax({
        url: url, 
        success: function(response) {
                console.log(JSON.stringify(response.features));
                return response.features;
            }, 
        error: function(error) {
                alert(error.status);
            },
    });
}