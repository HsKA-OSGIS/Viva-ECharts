let layer;
let start;
let end;
let nuclide;

/*SIDEBAR FUNCTIONS
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
*/

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
	//document.getElementById("menu-chart").addEventListener("click", open_closeNav);
	document.getElementById("menu-about").addEventListener("click", showDivAbout);
	document.getElementById("menu-help").addEventListener("click", showDivHelp);
	document.getElementById("menu-home").addEventListener("click", showDivHome);
	document.getElementById("menu-about").addEventListener("click", changeActive);
	document.getElementById("menu-help").addEventListener("click", changeActive1);
	document.getElementById("menu-home").addEventListener("click", changeActive2);
	/*
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
	*/
	

}

function mainInit(){

	//Call your functions here
	showDivHome();
	linkMenuEvents();
	mapMain();

	
	//Adding a layer to the map from WMS
	layer = 'opendata:nuklide_fleisch';
	service = 'WMS'
	time = '2020-12-14T10:00:00.000Z/2021-12-14T10:00:00.000Z'
	cql_filter = "nuclide = 'Cs-137'"
	rasterSource.updateParams({'SERVICE':service, 'LAYERS':layer,'TIME':time, 'cql_filter':cql_filter});
	

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

}

window.onload = function() {
	mainInit();

	//Call examples to display charts
	//gaugeChart("odl_brutto_1h", null, "2021-12-03T16:00:00.000Z", null);
	barChart(["nuklide_pilze", "nuklide_fleisch"],"2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137");

};