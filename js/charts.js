const { ObjectEvent } = require("ol/Object");

//Example of retrieve features from a URL based on the layer, start, end and nuclide parameters
url = URLBuilder("nuklide_pilze", "2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137")


//Example for meat and K-40 and a different period of time
url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")


//Example for air and and Cs-137
url = URLBuilder("new_gamma_aerosole_24h", null,"2021-12-03T00:00:00.000Z","Cs-137");


//Example example for gamma radiation (ODL)
url = URLBuilder("odl_brutto_1h", null, "2021-12-03T16:00:00.000Z", null);


function gaugeChart(layer, start, end, nuclide){

	var list = [];
    
	url = URLBuilder(layer, start, end, nuclide)

	$.get(url).done(function (data) {

		var features = data.features;

		var units = features[0].properties.unit;
		
		for(feat in features){

			info = features[feat].properties.value;

			list.push(info);
		}

		var mean = avg(list).toFixed(4);

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
					value: mean,
					name: 'SCORE'
				}
				]
			}
	]

	};
	gaugeChart.setOption(option);
	});

};

function barChart(layers, start, end, nuclide){

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

			mean = avg(values);
			dicc[lyr] = mean;

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

function lineChart(layer, start, end, nuclide){

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

		console.log(hour);
		url = URLBuilder(layer, start, end + "T" + hour + ":00:00.000Z", nuclide)
		var values = [];

		$.get(url).done(function(data){

			var features = data.features;

			for(feat in features){
				values.push(features[feat].properties.value);
			}

			var mean = avg(values);
			dicc[hour] = mean;

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



