/*SIDEBAR FUNCTIONS*/
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("div-home2").style.marginRight = "250px";
}
/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("div-home2").style.marginRight = "0";
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
     document.getElementById("mySidenav").style.width = "0";
	 document.getElementById("div-home2").style.marginRight = "0";
     //document.getElementById("main").style.marginLeft = "0";
     //document.body.style.backgroundColor = "white";
  }
  console.log(sidebarState);
} 

function showDivHome(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-home") 
}
function showDivAbout(){
    libs_general_hideAllDivsInDivExceptOne("div-main", "div-about") 
}
function linkMenuEvents(){
	document.getElementById("menu-chart").addEventListener("click", open_closeNav);
	document.getElementById("menu-about").addEventListener("click", showDivAbout);
}

function mainInit(){

	//Call your functions here
	showDivHome();
	linkMenuEvents();
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
	layer = 'opendata:nuklide_fleisch';
	service = 'WMS'
	time = '2020-12-14T10:00:00.000Z/2021-12-14T10:00:00.000Z'
	cql_filter = "nuclide = 'Cs-137'"
	rasterSource.updateParams({'SERVICE':service, 'LAYERS':layer,'TIME':time, 'cql_filter':cql_filter});
	
	


}

window.onload = function() {
	mainInit();
};