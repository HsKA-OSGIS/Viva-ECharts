
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
	//"https://www.imis.bfs.de/ogc/opendata/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=opendata:nuklide_fleisch&viewparams=order:sample_begin;&cql_filter=nuclide = 'Cs-137'&TIME=2020-12-14T10:00:00.000Z/2021-12-14T10:00:00.000Z&SRS=EPSG:3857&STYLES=&WIDTH=1326&HEIGHT=477&BBOX=-386465.61500985106,6123523.20998204,2856910.369186748,7290258.00972697"
	url = "https://www.imis.bfs.de/ogc/opendata/wms"
	rasterSource.setUrl(url);
	rasterSource.updateParams({'SERVICE':'WMS', 'LAYERS':'opendata:nuklide_fleisch'})
	
	


}

window.onload = function() {
	mainInit();
};