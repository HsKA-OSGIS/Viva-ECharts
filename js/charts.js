//Example of retrieve features from a URL based on the layer, start, end and nuclide parameters
url = URLBuilder("nuklide_pilze", "2020-12-08T13:00:00.000Z","2021-21-08T13:00:00.000Z","Cs-137")

//Example for meat and K-40 and a different period of time
url = URLBuilder("nuklide_fleisch", "2021-11-24T11:00:00.000Z","2021-12-14T11:00:00.000Z","K-40")

//Example for air and and Cs-137
url = URLBuilder("new_gamma_aerosole_24h", null,"2021-12-03T00:00:00.000Z","Cs-137");

//Example example for gamma radiation (ODL)
url = URLBuilder("odl_brutto_1h", null, "2021-12-03T16:00:00.000Z", null);


function gaugeChart(layer, end, stat){

	var list = [];
    
	url = URLBuilder(layer, start, end, nuclide)

	$.get(url).done(function (data) {

		var features = data.features;

		var units = features[0].properties.unit;
		
		for(feat in features){

			info = features[feat].properties.value;

			list.push(info);
		}

		if(stat === 'MEAN'){			
			var value = avg(list).toFixed(4);
		}

		if(stat === 'MAX'){
			var value = arr_max(list);
		}

		if(stat === 'MIN'){
			var value = arr_min(list);
		}

	var gaugeChart = echarts.init(document.getElementById('chart1'));
	var option;

	option = {
		title: {
			text: "Gauge Chart"
		},
	tooltip: {
		formatter: '{a} <br/>{b} : {c}%'
		},
	series: [
		{
			name: 'Radiation',
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
				title: {
					text: "Bar Chart"
				},
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

function lineChart(layer, end, stat){

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

			if(Object.keys(dicc).length == hours.length){

				var sdicc = sortOnKeys(dicc);

				option = {
					title: {
						text: "Line Chart"
					},
					xAxis: {
					  type: 'category',
					  boundaryGap: false,
					  data: Object.keys(sdicc)
					},
					yAxis: {
					  type: 'value'
					},
					series: [
					  {
						data: Object.values(sdicc),
						type: 'line',
						areaStyle: {}
					  }
					]
				};
	
				option && myLineChart.setOption(option);
			}

		});
	});
}

function radarChart(layer, start, end, nuclides, stat){

	var chartDom = document.getElementById('chart4');
	var myChart = echarts.init(chartDom);
	var option;

	dicc = {}; //For each nuklide

	nuclides.forEach(nuclide=>{

		url = URLBuilder(layer, start, end, nuclide);

		var values = [];

		$.get(url).done(function(data){

			var features = data.features;

			for(feat in features){
				values.push(features[feat].properties.value);
			}

			if(stat === "MEAN"){
				var mean = avg(values);
				dicc[nuclide] = mean;
			}

			if(stat === "MAX"){
				var max = arr_max(values);
				dicc[nuclide] = max;
			}

			if(stat === "MIN"){
				var min = arr_min(values);
				dicc[nuclide] = min;
			}

			if(Object.keys(dicc).length === nuclides.length){

				indicator = [];
				for(ind in Object.keys(dicc)){
					indicator.push({name:Object.keys(dicc)[ind], max:arr_max(Object.values(dicc))});
				}
		
				option = {
					title: {
						text: "Radar Chart"
					},
				  radar: {
					indicator:indicator
				  },
				  series: [
					{
					  name: 'Nuclides',
					  type: 'radar',
					  data: [
						{
						  value: Object.values(dicc),
						  name: 'Allocated Budget'
						}
					  ]
					}
				  ]
				};
				
				option && myChart.setOption(option);
				
			}

		});


	})

};

function barChart2(layers, start, end, nuklide, stat){
	
	var myBarChart2 = echarts.init(document.getElementById('chart5'));
	var option;

	var dicc = {};
	var dicc1 = {};
	var s = {};

	layers.forEach(lyr => {
		nuklide.forEach(nuk => {
			url = URLBuilder(lyr, start, end, nuk)			
			$.get(url).done(function (data) {
				
				if (!(lyr in dicc)){
					dicc[lyr]={};
					dicc1[lyr]={};
				};
				if (!(nuk in dicc[lyr])){
					dicc[lyr][nuk]=[];
				};
				
				var features = data.features;
				for(feat in features){
					dicc[lyr][nuk].push(features[feat].properties.value);
				}
				
				if(stat === "MEAN"){			
					var mean = avg(dicc[lyr][nuk]);
					dicc1[lyr][nuk] = mean;
				}

				if(stat === "MAX"){
					var max = arr_max(dicc[lyr][nuk]);
					dicc1[lyr][nuk] = max;
				}

				if(stat === "MIN"){
					var min = arr_min(dicc[lyr][nuk]);
					dicc1[lyr][nuk] = min;
				}

				s[lyr]={
					name: lyr,
					type: 'bar',
					emphasis: {
					  focus: 'series'
					},
					data: Object.values(dicc1[lyr])
				  }
				
				option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
						type: 'shadow'
						}
					},
					legend: {
						data: layers
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar', 'stack'] },
						restore: { show: true }
						}
					},
					xAxis: [
						{
						type: 'category',
						axisTick: { show: false },
						data: nuklide
						}
					],
					yAxis: [
						{
						type: 'value'
						}
					],
					series: Object.values(s)
					};
		
				option && myBarChart2.setOption(option);
				
			});//get url
		});//nuk
	});//lyr

};


