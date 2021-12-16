/*SIDEBAR FUNCTIONS*/
/*VARIABLES*/
var cb1 = document.getElementById("barchart");
var cb2 = document.getElementById("piechart");
var cb3 = document.getElementById("sclatterplot");
var cb4 = document.getElementById("xchart");

var ncb1=0
var ncb2=0
var ncb3=0
var ncb4=0
var nc=0

function charts(){
	console.log("en charts")
	if (document.getElementById("barchart").checked==true){ ncb1=1 }
	if (document.getElementById("piechart").checked==true){ ncb2=1 }
	if (document.getElementById("sclatterplot").checked==true){ ncb3=1 }
	if (document.getElementById("xchart").checked==true){ ncb4=1 }
	nc=ncb1+ncb2+ncb3+ncb4
	console.log(ncb1,ncb2,ncb3,ncb4,nc)
	if (nc==0){ 
		console.log("chart0");
		libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart0"); }
	if (nc==1){ console.log("chart1");
		libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart1"); }
	if (nc==2){ console.log("chart2");
		libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart2"); }
	if (nc==3){ libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart3"); }
	if (nc==4){ libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart4"); }
}

var sidebarState = 0 // close
function open_closeNav() {
  if(sidebarState === 0){
	sidebarState = 1;
     document.getElementById("mySidenav").style.width = "250px";
	 document.getElementById("div-home2").style.marginRight = "250px";
     //document.getElementById("main").style.marginLeft = "250px";
     //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  else {
	sidebarState = 0;
	/*Checkbox functions*/
	console.log("cerrando")
	var cb1 = document.getElementById("barchart");
	var cb2 = document.getElementById("piechart");
	var cb3 = document.getElementById("sclatterplot");
	var cb4 = document.getElementById("xchart");
	if (cb1.checked==true || cb2.checked==true || cb3.checked==true || cb4.checked==true){
		console.log("mirando")
		charts()}
	
    document.getElementById("mySidenav").style.width = "0";
	document.getElementById("div-home2").style.marginRight = "0";
    //document.getElementById("main").style.marginLeft = "0";
    //document.body.style.backgroundColor = "white";
  }
  //console.log(sidebarState);
} 


function showDivHome(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-home") 
}
function showDivAbout(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-about") 
}
function showDivHelp(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-help") 
}
function changeActive(){
	var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
	var current = document.getElementById("menu-about");
	// console.log(current)
	current.className = current.className.replace("header","header active");
	console.log(current.className)
}
function changeActive1(){
	var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
	var current = document.getElementById("menu-help");
	// console.log(current)
	current.className = current.className.replace("header","header active");
	console.log(current.className)
}
function changeActive2(){
	var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
	var current = document.getElementById("menu-home");
	// console.log(current)
	current.className = current.className.replace("header","header active");
	console.log(current.className)
}
function linkMenuEvents(){
	document.getElementById("menu-chart").addEventListener("click", open_closeNav);
	document.getElementById("menu-about").addEventListener("click", showDivAbout);
	document.getElementById("menu-help").addEventListener("click", showDivHelp);
	document.getElementById("menu-home").addEventListener("click", showDivHome);
	document.getElementById("menu-about").addEventListener("click", changeActive);
	document.getElementById("menu-help").addEventListener("click", changeActive1);
	document.getElementById("menu-home").addEventListener("click", changeActive2);
	/*Making bold the checklist options*/
	document.querySelectorAll('ul.list input').forEach(item => {
		item.addEventListener('click', event => {
		  var label = item.parentNode;
		  if (item.checked) {
			label.style.fontWeight = "bold";
		  } else {
			label.style.fontWeight = "normal"
		  }
		})
	  })
	/*Checkbox functions
	var cb1 = document.getElementById("barchart");
	var cb2 = document.getElementById("piechart");
	var cb3 = document.getElementById("sclatterplot");
	var cb4 = document.getElementById("xchart");
	if (cb1.checked || cb2.checked || cb3.checked || cb4.checked){charts}*/
	
	
	
}

function mainInit(){

	//Call your functions here
	showDivHome();
	linkMenuEvents();
	mapMain();
    map2();
	libs_general_hideAllDivsInDivExceptOne("div-mapchart", "div-chart0");

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

    // Code to work with buttons osmBtn and satelliteBtn
    document.getElementById("osmBtn").onclick = function() {changeBasemapToOSM()};
    document.getElementById("satelliteBtn").onclick = function() {changeBasemapToSatellite()};
    //document.getElementById("osmBtn").style.color = "red"; // Change button color

    function changeBasemapToSatellite(){
    map.removeLayer(OSM);
    map.addLayer(Satellite);
    // Tries to put vector and raster layer on top of Satellite layer
    //map.setLayerIndex(vector, 2);
    //ol.source.vector.vectorLayer.setZIndex(zIndex);
    //map.getLayers().setAt(99, Satellite)
    }

    function changeBasemapToOSM(){
    map.removeLayer(Satellite);
    map.addLayer(OSM);
    }

}

window.onload = function() {
	mainInit();
};