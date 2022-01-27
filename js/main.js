let chart;
let layer;
let start;
let end;
let nuclide;
let stat;
//var minuteSelect = document.querySelector('#minute');


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
	current.className = current.className.replace("header","header active");
}

function changeActive1(){
	var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
	var current = document.getElementById("menu-help");
	current.className = current.className.replace("header","header active");
}

function changeActive2(){
	var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
	var current = document.getElementById("menu-home");
	current.className = current.className.replace("header","header active");
}
function openModal(){
	console.log("Hola")
	$('#exampleModal').on('show.bs.modal', function (event) {
		console.log("Hola 2")
		var button = $(event.relatedTarget) // Button that triggered the modal
		var recipient = button.data('whatever') // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this)
		//modal.find('.modal-title').text('New message to ' + recipient)
		modal.find('.modal-body input').val(recipient)
	  })
}
function setMinutesToZero() {
	if(hourSelect.value === '18') {
	  minuteSelect.value = '00';
	}
  }
function linkMenuEvents(){
	document.getElementById("menu-about").addEventListener("click", showDivAbout);
	document.getElementById("menu-help").addEventListener("click", showDivHelp);
	document.getElementById("menu-home").addEventListener("click", showDivHome);
	document.getElementById("btnPopup").addEventListener("click", openModal);
	document.getElementById("menu-about").addEventListener("click", changeActive);
	document.getElementById("menu-help").addEventListener("click", changeActive1);
	document.getElementById("menu-home").addEventListener("click", changeActive2);
	document.getElementById("chartSelect").addEventListener("click", function(){
		
		chart = this.value;

		if(chart === "barChart"){
			document.getElementById("nuklideSelect").removeAttribute("disabled");
			document.getElementById("startDaySelect").removeAttribute("disabled");
			document.getElementById("startHourSelect").removeAttribute("disabled");
			document.getElementById("endHourSelect").removeAttribute("disabled");
		}
		
		if(chart === "gaugeChart"){
			document.getElementById("endDaySelect").removeAttribute("disabled");
			document.getElementById("endHourSelect").removeAttribute("disabled");
			document.getElementById("nuklideSelect").setAttribute("disabled","disabled");
			document.getElementById("startDaySelect").setAttribute("disabled","disabled");
			document.getElementById("startHourSelect").setAttribute("disabled","disabled");
		}
		
		if(chart === "lineChart"){
			document.getElementById("nuklideSelect").setAttribute("disabled","disabled");
			document.getElementById("startDaySelect").setAttribute("disabled","disabled");
			document.getElementById("startHourSelect").setAttribute("disabled","disabled");
			document.getElementById("endHourSelect").setAttribute("disabled","disabled");
		}

	});

	document.getElementById("statSelect").addEventListener("click", function(){
		stat = this.value;
	})

	document.getElementById("nuklideSelect").addEventListener("click", function(){
		nuclide = this.value;
	})

	document.getElementById("btnVisualize").addEventListener("click", function(){

		layer = document.getElementById("layerSelect").value;
		
		var endDay = document.getElementById("endDaySelect").value;
		var endHour = document.getElementById("endHourSelect").value;

		var startDay = document.getElementById("startDaySelect").value;
		var startHour = document.getElementById("startHourSelect").value;

		start = startDay+'T'+startHour+':00.000Z';
		end = endDay+'T'+endHour+':00.000Z';


		if(chart === "barChart"){

			var layers = Array.prototype.slice.call(document.querySelectorAll('#layerSelect option:checked'),0).map(function(v,i,a) { 
				return v.value; 
			});

			barChart(layers, start, end, nuclide, stat);
		}
		if(chart === "lineChart"){
			lineChart(layer, endDay, stat);

		}
		if(chart === "gaugeChart"){
			gaugeChart(layer, end, stat);
		}

		if(chart === "radarChart"){

			var nuclides = Array.prototype.slice.call(document.querySelectorAll('#nuklideSelect option:checked'),0).map(function(v,i,a) { 
				return v.value; 
			});

			radarChart(layer,start,end,nuclides,stat);
		}

		addWMS(layer, end);

		//Call examples to display charts
		
	});
}

function mainInit(){

	//Call your functions here
	showDivHome();
	linkMenuEvents();
	mapMain();
	////setMinutesToZero()
	//Call example WMS for food
	//addWMS("nuklide_pilze", '2020-12-20T10:00:00.000Z', '2021-12-14T10:00:00.000Z', 'K-40');

	//Call example WMS for ODL
	addWMS("odl_brutto_1h", '2022-01-26T09:00:00.000Z');

	gaugeChart("odl_brutto_1h", "2021-12-03T16:00:00.000Z","MAX");
	barChart(["nuklide_pilze","nuklide_fleisch"],"2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137","MAX");
	lineChart("odl_brutto_1h", "2021-12-03","MIN");
	radarChart("nuklide_pilze","2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z",["Cs-137","Ce-144","K-40"],"MAX")
	barChart2(["nuklide_pilze","nuklide_fleisch","nuklide_fisch"],"2021-01-12T00:00:00.000Z","2021-31-12T23:00:00.000Z",["Cs-137","Ce-144"],"MEAN");

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
};