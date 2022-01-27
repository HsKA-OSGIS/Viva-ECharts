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

function lineChart2(layer, start, end, nuclide, stat){

	var myLineChart2 = echarts.init(document.getElementById('chart4'));
	var option;

	var dicc = {};
	var dicc1 = {};
	var days = [];
	var s = [];

	for(var day = 0; day<31; day++){

		if(day < 10){
			day = '0' + day;
		}
		days.push(day);
	}
	nuclide.forEach(nuk=>{
		days.forEach(day=>{
			date=end+"-"+toString(day);
			url = URLBuilder(layer, date, nuclide)
			var values = [];

			$.get(url).done(function(data){
				console.log(url);				
				if (!(nuk in dicc)){
					dicc[nuk]={};
					dicc1[nuk]={};
				};
				if (!(day in dicc[nuk])){
					dicc[nuk][day]=[];
				};
				//console.log(dicc);
				//console.log(dicc1);
				var features = data.features;
				for(feat in features){
					dicc[nuk][day].push(features[feat].properties.value);
				}
				
				if(stat === "MEAN"){			
					var mean = avg(dicc[nuk][day]);
					dicc1[nuk][day] = mean;
				}

				if(stat === "MAX"){
					var max = arr_max(dicc[nuk][day]);
					dicc1[nuk][day] = max;
				}

				if(stat === "MIN"){
					var min = arr_min(dicc[nuk][day]);
					dicc1[nuk][day] = min;
				}

				s[nuk]={
					name: nuk,
					type: 'line',
					data: Object.values(dicc1[nuk])
				};

				option = {
					xAxis: {
					type: 'category',
					boundaryGap: false,
					data: days
					},
					legend: {
						data: nuclide
					},
					yAxis: {
					type: 'value'
					},
					series: s
				};

				option && myLineChart2.setOption(option);

			});//get url
		});//days
	});//nuclide
}
/*
function lineChart2(layer, start,end, nuclide, stat){

	var myraceLineChart = echarts.init(document.getElementById('chart4'));
	var option;
		
	var dicc = {};
	var dicc1 = {};
	var s = {};
	var months = [];

	for(var month = 1; month<12; month++){
		if(month< 10){
			month='0' + month;
			
		};
		months.push(month);
	};

	layer.forEach(lyr=>{
		
		months.forEach(month=>{
			
			start_date=end+"-01-01";
			end_date=end+"-"+month+"-"+"31";
			url = URLBuilder(layer, start_date,end_date, nuclide)
			var values = [];
			try{
				//console.log('try');
				$.get(url).done(function(data){
					console.log(url);
					//console.log(lyr," ",month);

					if (!(lyr in dicc)){
						dicc[lyr]={};
						dicc1[lyr]={};
					};
					if (!(month in dicc[lyr])){
						dicc[lyr][month]=[];
					};
					//console.log(dicc);
					//console.log(dicc1);
					var features = data.features;
	
					for(feat in features){
						dicc[lyr][month].push(features[feat].properties.value);
					}
									
					if(stat === "MEAN"){			
						var mean = avg(dicc[lyr][month]);
						dicc1[lyr][month] = mean;
					}
	
					if(stat === "MAX"){
						var max = arr_max(dicc[lyr][month]);
						dicc1[lyr][month] = max;
					}
	
					if(stat === "MIN"){
						var min = arr_min(dicc[lyr][month]);
						dicc1[lyr][month] = min;
					}
					
					s[lyr]={
						name: lyr,
						type: 'line',
						stack: 'Total',
						data: Object.values(dicc1[lyr])
					  }		
					
					option = {
						title: {
							text: 'Cs-137 in Food'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: layers
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
							//data: [Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec]
							data: months
						},
						yAxis: {
							type: 'value'
						},
						series: Object.values(s)
					};//option			
				});//get url
				}catch{(console.log('error with url'))};
		});//month
	});//layer	
		option && myraceLineChart.setOption(option);		
};
*/

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
				//console.log(dicc);
				//console.log(dicc1);
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
					//label: labelOption,
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
						restore: { show: true },
						//saveAsImage: { show: true }
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