
function mainInit(){

	//Call your functions here
	mapMain();

	//Example of retrieve features from a URL based on the layer, start, end and nuclide parameters
	url = URLBuilder("nuklide_pilze", "2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137")
	//Example for mushrooms and Cs-137
	getFeatures(url, function(features){console.log(features)});

	//Example for meat and K-40 and a different period of time
	url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")
	console.log(url)
	getFeatures(url, function(features){console.log(features)});

	//Adding a layer to the map from WFS
	url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")
	vectorSource.setUrl(url);

	//Adding a layer to the map from WMS
	vectorSource.setUrl(url);
	


}

window.onload = function() {
	mainInit();
};