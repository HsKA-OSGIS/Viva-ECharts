
function mainInit(){

	//Call your functions here
	mapMain();

	
	url = new URL("https://www.imis.bfs.de/ogc/opendata/ows")
	url.searchParams.append("service","WFS")
	url.searchParams.append("version","1.0.0")
	url.searchParams.append("request","GetFeature")
	url.searchParams.append("typeName","opendata:nuklide_pilze")
	url.searchParams.append("CQL_FILTER","(sample_begin DURING 2020-12-08T13:00:00.000Z/2021-21-08T13:00:00.000Z) AND (nuclide = 'Cs-137')")
	url.searchParams.append("VIEWPARAMS","order:sample_begin")
	url.searchParams.append("outputFormat","application/json")

	getFeatures(url.href);

}

window.onload = function() {
	mainInit();
};