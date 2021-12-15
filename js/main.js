function mainInit(){

	//Call your functions here
	mapMain();
    map2();

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
	layer = 'opendata:nuklide_fleisch';
	service = 'WMS'
	time = '2020-12-14T10:00:00.000Z/2021-12-14T10:00:00.000Z'
	cql_filter = "nuclide = 'Cs-137'"
	rasterSource.updateParams({'SERVICE':service, 'LAYERS':layer,'TIME':time, 'cql_filter':cql_filter});
	
    // Following lines are for drop-down menu to change the basemap
	// Get the button, and when the user clicks on it, execute myFunction
    document.getElementById("myBtn").onclick = function() {myFunction()};

    function myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    }

    // function to close drop-down-menu when user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

    document.getElementById("osmBtn").onclick = function() {changeBasemapToOSM()};
    document.getElementById("satelliteBtn").onclick = function() {changeBasemapToSatellite()};
    //document.getElementById("osmBtn").style.color = "red"; // Change button color

    //map.addLayer(Satellite);
    map.removeLayer(Satellite);

    function changeBasemapToSatellite(){
    map.removeLayer(OSM);
    map.addLayer(Satellite);
    }

    function changeBasemapToOSM(){
    map.removeLayer(Satellite);
    map.addLayer(OSM);
    }

}

window.onload = function() {
	mainInit();
};