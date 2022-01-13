//Example of retrieve features from a URL based on the layer, start, end and nuclide parameters
url = URLBuilder("nuklide_pilze", "2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137")
//Example for mushrooms and Cs-137
getFeatures(url, function(features){});

//Example for meat and K-40 and a different period of time
url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")
getFeatures(url, function(features){});

//Example for air and and Cs-137
url = URLBuilder("new_gamma_aerosole_24h", null,"2021-12-03T00:00:00.000Z","Cs-137");
getFeatures(url, function(features){});

//Example example for gamma radiation (ODL)
url = URLBuilder("odl_brutto_1h", null, "2021-12-03T16:00:00.000Z", null);
getFeatures(url, function(features){});

function gaugeChart(layer, start, end, nuclide){

	var data = [];
    
	url = URLBuilder(layer, start, end, nuclide)
	getFeatures(url, function(features){
		
		for(feat in features){

			info = features[feat].properties.value;

			data.push(info);

		}

		var mean = avg(data).toFixed(4);

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
			formatter: '{value}'
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

	data = {};
	
	layers.forEach(lyr => {

		var values = [];

		url = URLBuilder(lyr, start, end, nuclide)
		getFeatures(url, function(features){

			for(feat in features){

				values.push(features[feat].properties.value);

			}

			mean = avg(values);
			data[lyr] = mean;
		});
	});

	var barChart = echarts.init(document.getElementById('chart2'));
	var option;

	option = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
		data: [120, 200, 150, 80, 70, 110, 130],
		type: 'bar'
		}
	]
	};

	barChart.setOption(option);

};


