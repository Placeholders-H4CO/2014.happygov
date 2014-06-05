<section class="line-chart">
			<h2>Types of Requests By Month<span class="genericon genericon-time"></span></h2>
			<div id="chart"></div>
		</section>

		<section class="pie-chart">
			<h2>Open Requests by Neighborhood <span class="genericon genericon-home"></span></h2>
			<div id="chart-2"></div>
		</section>

		<section class="pie-chart">
			<div id="chart-2"></div>
		</section>

		<script>
			$(function() {
		    // console.log( "ready!" );

					var chart = c3.generate({
						bindto: '#chart',
						type: 'line',
				    data: {
			        url: 'datasets/data-type-month.csv'
				    }
					});

      var chart = c3.generate({
				size: {
					height: '800'
				},
				bindto: '#chart-2',
		    data: {
	        // iris data from R
	        columns: [
            ['Athmar Park',130],
						['Auraria',17],
						['Baker',118],
						['Barnum',77],
						['Barnum West',101],
						['Bear Valley',49],
						['Belcaro',47],
						['Berkeley',117],
						['Capitol Hill',104],
						['CBD',51],
						['Chaffee Park',42],
						['Cheesman Park',59],
						['Cherry Creek',82],
						['City Park',24],
						['City Park West',39],
						['Civic Center',33],
						['Clayton',51],
						['Cole',67],
						['College View / South Platte',62],
						['Congress Park',104],
						['Cory - Merrill',61],
						['Country Club',22],
						['DIA',4],
						['East Col,fax',89],
						['Elyria Swansea',94],
						['Five Points',181],
						['Fort Logan',45],
						['Gateway - Green Valley Ranch',118],
						['Globeville',58],
						['Goldsmith',46],
						['Hale',92],
						['Hampden',76],
						['Hampden South',57],
						['Harvey Park',129],
						['Harvey Park South',71],
						['Highland',92],
						['Hilltop',83],
						['Indian Creek',10],
						['Jefferson Park',33],
						['Kennedy',12],
						['Lincoln Park',70],
						['Lowry Field',41],
						['Mar Lee',140],
						['Marston',34],
						['Montbello',216],
						['Montclair',45],
						['North Capitol Hill',37],
						['North Park Hill',78],
						['Northeast Park Hill',56],
						['Overland',45],
						['Platt Park',70],
						['Regis',33],
						['Rosedale',34],
						['Ruby Hill',99],
						['Skyland',40],
						['Sloan Lake',116],
						['South Park Hill',92],
						['Southmoor Park',9],
						['Speer',120],
						['Stapleton',137],
						['Sun Valley',17],
						['Sunnyside',88],
						['Union Station',70],
						['University',95],
						['University Hills',66],
						['University Park',66],
						['Valverde',63],
						['Villa Park',106],
						['Virginia Village',62],
						['Washington Park',76],
						['Washington Park West',87],
						['Washington Virginia Vale',94],
						['Wellshire',7],
						['West Colfax',93],
						['West Highland',89],
						['Westwood',195],
						['Whittier',42],
						['Windsor',18]
	        ],
		      type : 'pie',
		    },
		    pie: {
		        onclick: function (d, i) { console.log(d, i); },
		        onmouseover: function (d, i) { console.log(d, i); },
		        onmouseout: function (d, i) { console.log(d, i); }
		    }
			});
//


			});
		</script>
