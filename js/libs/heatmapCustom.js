dojo.require("esri.map");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.InfoTemplate");
// Variables
var map;
var heatLayer;
var featureLayer;


// get the features within the current extent from the feature layer
function getFeatures() {
		// set up query
		var query = new esri.tasks.Query();
		// only within extent
		query.geometry = map.extent;
		// give me all of them!
		query.where = "1=1";
		// make sure I get them back in my spatial reference
		query.outSpatialReference = map.spatialReference;
		// get em!
		featureLayer.queryFeatures(query, function (featureSet) {
				var data = [];
				// if we get results back
				if (featureSet && featureSet.features && featureSet.features.length > 0) {
						// set data to features
						data = featureSet.features;
				}
				// set heatmap data
				heatLayer.setData(data);
		});
}

// Init
function init() {
		// initial extent of map
		var initExtent = new esri.geometry.Extent({
				xmax: -11658645.465148315,
				xmin: -11713680.125513569,
				ymax: 4843249.550527445,
				ymin: 4813095.142868984,
				"spatialReference": {
						"wkid": 102100
				}
		});
		// create map
		map = new esri.Map("map", {
				extent: initExtent,
				//smartNavigaion: false,
				sliderStyle: "small"
		});


		require([
				"esri/dijit/LocateButton",
				"dojo/dom",
				"dojo/dom-construct",
				"myModules/InfoWindow",
				"dojo/string",
				"dojo/domReady!"
			], function(
				LocateButton,
				dom,
				 domConstruct,
				 InfoWindow,
				 string
			)  {
				 var infoWindow = new InfoWindow({
						domNode: domConstruct.create("div", null, dom.byId("map"))
				 });

				geoLocate = new LocateButton({
					map: map
				}, "LocateButton");
				geoLocate.startup();

			});
				//var template;
				var template = new esri.InfoTemplate();
				template.setTitle("<b>${Type}</b>");
				template.setContent(editTemplate);

				function editTemplate(g){
						var votes = g.attributes.Votes;
						if (votes === null){votes = 0;}
						var attr = g.attributes.Neighborhood;
						var summary = g.attributes.Case_Summary;
						var status = g.attributes.Case_Status;
						var cDate = g.attributes.Case_Created_Date;

						if(attr){
							var content = "<b>"+summary+"</b> <br> Status: "+status+" <br> Opened:  <br>Neighborhood: "+ attr+"<p>";
						}else{
							var content = "<b>"+summary+"</b> <br> Status: "+status+" <br> Opened: <p>";
						}

						content = content + "<br><br><span class='genericon genericon-digg' onclick='javascript:voteOnIncident();'></span> <span class='voteCount'>"+votes+"</span></p>";



						//this is the variable set to a function that updates the service with voting information
						voteOnIncident = function() {
								//console.log(g);

								//alert(votes);
								g.attributes.Votes = Number(votes) + 1;
								//alert(g.attributes.Votes);
								//console.log(g);
								jQuery('.voteCount').text(g.attributes.Votes);
								//this makes the HTTP request to apply the edits to the service
								featureLayer.applyEdits(null,[g],null);
							};
						return content;
				}

				/*function  neighborhoodCheck(gra){

					var content;
					require([
						"dojo/date/locale"
					],function(locale){

						var votes = gra.attributes.Votes;
						if (votes === null){votes = 0;}
						var attr = gra.attributes.Neighborhood;
						var summary = gra.attributes.Case_Summary;
						var status = gra.attributes.Case_Status;
						var cDate = gra.attributes.Case_Created_Date;
						//var FID = gra.attributes.FID;

						var pubDate = new Date(cDate * 1000);
						var d = locale.format(pubDate, {datePattern:"dd.MM.yy", timePattern:"HH:mm:ss"});
						//console.log(d);
						if(attr){
							content = "<b>"+summary+"</b> <br> Status: "+status+" <br> Opened: "+d+" <br>Neighborhood: "+ attr+"<p><span class='genericon genericon-digg' onclick='votefunc;'>LIKE</span> "+votes+"</p>";
						}else{
							content = "<b>"+summary+"</b> <br> Status: "+status+" <br> Opened: "+d+"<p><span class='genericon genericon-digg' onclick='votefunc;'>LIKE</span> "+votes+"</p>";
						}

					});
						return content;


				}*/

		//Add the topographic layer to the map. View the ArcGIS Online site for services http://arcgisonline/home/search.html?t=content&f=typekeywords:service
		var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
		map.addLayer(basemap);
		// once map is loaded
		dojo.connect(map, 'onLoad', function (theMap) {
				//map.disablePan();
				//resize the map when the browser resizes
				dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
				// create heat layer
				heatLayer = new HeatmapLayer({
						config: {
								"useLocalMaximum": true,
								"radius": 40,
								"gradient": {
										0.45: "rgb(52,152,219)",
										0.55: "rgb(41,128,185)",
										0.65: "rgb(46,204,113)",
										0.75: "rgb(29,160,82)",
										0.85: "rgb(255,206,0)",
										0.95: "rgb(243,156,118)",
										1.00: "rgb(231,76,60)"
								}
						},
						"map": map,
						"domNodeId": "heatLayer",
						"opacity": 0.85
				});

				//var blue = new PictureMarkerSymbol(picBaseUrl + "BluePin1LargeB.png", 32, 32).setOffset(0, 15);


				// add heat layer to map
				map.addLayer(heatLayer);
				// resize map
				map.resize();
				// create feature layer to get the points from
				featureLayer = new esri.layers.FeatureLayer("http://services2.arcgis.com/apfHT0xk4Qw2A1dv/arcgis/rest/services/311_service_requests_2014/FeatureServer/0", {
						mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
						visible: false,
						infoTemplate: template,
						outFields: ["*"]
				});
				map.addLayer(featureLayer);
				// get features from this layer

				 map.infoWindow.resize(300, 200);

				getFeatures();



				// on map extent change
				dojo.connect(map, "onExtentChange", getFeatures);
				dojo.connect(dojo.byId('tog'), "onclick", function () {
						if (heatLayer.visible) {
								heatLayer.hide();
						} else {
								heatLayer.show();
						}
				});

				dojo.connect(dojo.byId('tog2'), "onclick", function () {
						if (featureLayer.visible) {
								featureLayer.hide();
								jQuery('#typeBox').hide();
						} else {
								featureLayer.show();
								jQuery('#typeBox').show();
						}
				});
				/*dojo.connect(dojo.byId('complaintbox'), "onclick", function () {

				});
				dojo.connect(dojo.byId('servicebox'), "onclick", function () {

				});
				dojo.connect(dojo.byId('complimentbox'), "onclick", function () {

				});*/
		});
}
// call init on load of dojo
dojo.addOnLoad(init);