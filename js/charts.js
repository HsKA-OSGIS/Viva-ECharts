const { ObjectEvent } = require("ol/Object");

//Example of retrieve features from a URL based on the layer, start, end and nuclide parameters
url = URLBuilder("nuklide_pilze", "2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137")


//Example for meat and K-40 and a different period of time
url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")


//Example for air and and Cs-137
url = URLBuilder("new_gamma_aerosole_24h", null,"2021-12-03T00:00:00.000Z","Cs-137");


//Example example for gamma radiation (ODL)
url = URLBuilder("odl_brutto_1h", null, "2021-12-03T16:00:00.000Z", null);


function gaugeChart(layer, start, end, nuclide, stat){

	var list = [];
    
	url = URLBuilder(layer, start, end, nuclide)

	$.get(url).done(function (data) {

		var features = data.features;

		var units = features[0].properties.unit;
		
		for(feat in features){

			info = features[feat].properties.value;

			list.push(info);
		}

		if(stat === "MEAN"){			
			var value = avg(list).toFixed(4);
		}

		if(stat === "MAX"){
			var value = arr_max(list);
		}

		if(stat === "MIN"){
			var value = arr_min(list);
		}

	var gaugeChart = echarts.init(document.getElementById('chart1'));
	var option;

	option = {
	tooltip: {
		formatter: '{a} <br/>{b} : {c}%'
		},
	series: [
		{
			name: 'Pressure',
			type: 'gauge',
			min: 0,
			max: 0.5,
			progress: {
			show: true
		},
			detail: {
			valueAnimation: true,
			formatter: '{value}' + ' '+ units
		},
			data: [
				{
					value: value,
					name: stat
				}
				]
			}
	]

	};
	gaugeChart.setOption(option);
	});

};

function barChart(layers, start, end, nuclide, stat){

	var myBarChart = echarts.init(document.getElementById('chart2'));
	var option;

	var dicc = {};

	layers.forEach(lyr => {
		
		url = URLBuilder(lyr, start, end, nuclide)
		var values = [];
		
		$.get(url).done(function (data) {

			var features = data.features;

			for(feat in features){
				values.push(features[feat].properties.value);
			}

			if(stat === "MEAN"){			
				var mean = avg(values);
				dicc[lyr] = mean;
			}

			if(stat === "MAX"){
				var max = arr_max(values);
				dicc[lyr] = max;
			}

			if(stat === "MIN"){
				var min = arr_min(values);
				dicc[lyr] = min;
			}

			option = {
				xAxis: {
					type: 'category',
					data: Object.keys(dicc)
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
					data: Object.values(dicc),
					type: 'bar'
					}
				]
				};
	
			option && myBarChart.setOption(option);
			
		});

	});


};

function lineChart(layer, start, end, nuclide, stat){

	var myLineChart = echarts.init(document.getElementById('chart3'));
	var option;

	var dicc = {};
	var hours = [];

	for(var hour = 0; hour<24; hour++){

		if(hour < 10){
			hour = '0' + hour;
		}
		hours.push(hour);
	}

	hours.forEach(hour=>{

		url = URLBuilder(layer, start, end + "T" + hour + ":00:00.000Z", nuclide)
		var values = [];

		$.get(url).done(function(data){

			var features = data.features;

			for(feat in features){
				values.push(features[feat].properties.value);
			}

			if(stat === "MEAN"){			
				var mean = avg(values);
				dicc[hour] = mean;
			}

			if(stat === "MAX"){
				var max = arr_max(values);
				dicc[hour] = max;
			}

			if(stat === "MIN"){
				var min = arr_min(values);
				dicc[hour] = min;
			}


			option = {
				xAxis: {
				  type: 'category',
				  boundaryGap: false,
				  data: Object.keys(dicc)
				},
				yAxis: {
				  type: 'value'
				},
				series: [
				  {
					data: Object.values(dicc),
					type: 'line',
					areaStyle: {}
				  }
				]
			};

			option && myLineChart.setOption(option);

		});
	});
}


function racelineChart(layer, start, end, nuclide, stat){

	var myraceLineChart = echarts.init(document.getElementById('chart4'));
	var option;

	var dicc0= [];
	var months = [];

	for(var month = 0; month<12; month++){
		if(month< 10){
			month= '0' + month;
		}
		months.push(month);
	}

	layer.forEach(lyr=>{
		var dicc1 = {};
		months.forEach(month=>{
			start="2020-"+month+"-01T00:00:00.000Z"
			end="2020-"+month+"-31T00:00:00.000Z"
			url = URLBuilder(layer, start, end, nuclide)
			var values = [];

			$.get(url).done(function(data){

				var features = data.features;

				for(feat in features){
					values.push(features[feat].properties.value);
				}

				if(stat === "MEAN"){			
					var mean = avg(values);
					dicc1[month] = mean;
				}

				if(stat === "MAX"){
					var max = arr_max(values);
					dicc1[month] = max;
				}

				if(stat === "MIN"){
					var min = arr_min(values);
					dicc1[month] = min;
				}
				
			});//get url
		});//month
		dicc1['lyr'] = lyr;
		dicc0.push(dicc1);
		//dicc0[lyr] = dicc1;;
	});//layer
	
	var legend_data=[];
	var series1=[];
	dicc0.forEach(d=>{
		legend_data.push(d.name);
		s={
			name:d.name,
			type:'line',
			stack:'Total',
			data: Object.values(d)
		};
		series1.push(s);
	});
	console.log(legend_data);
	console.log(series1);

	option = {
		title: {
			text: 'Cs-137 in Food'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: Object.keys(dicc0)
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec]
		},
		yAxis: {
			type: 'value'
		},
		series: series1
		/*series: [
			{
			name: 'Email',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210]
			}
		]*/
		};
				
		option && myraceLineChart.setOption(option);
			
}



