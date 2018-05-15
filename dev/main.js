new Vue({
	el: '#app',
	data:{
		zoom: 10.65,
		center: [-5190080.00000,-2708530.34945],
		projectId: undefined

	}, 
	components: {
		mapa,
		sumario,
		ficha
	},
	methods:{
		receiveId(value){
			this.projectId = value
		}
	},
	// mounted(){
	// 	var base_map =  new ol.layer.Tile({ source: new ol.source.OSM() })

	// 	var msp = new ol.layer.Vector({
	// 		source: new ol.source.Vector({
	// 			url: dist_folder + 'kml/limite_msp.kml',//dist_folder definido em index.html ou page-piu-monitoramento.php
	// 			format: new ol.format.KML()
	// 		})
	// 	});

	// 	var arco_jurbatuba = new ol.layer.Vector({
	// 		source: new ol.source.Vector({
	// 			url: dist_folder + 'kml/piu-arco-jurubatuba_2018-04.kml',
	// 			format: new ol.format.KML()
	// 		})
	// 	});

	// 	new ol.Map({
	// 		target: 'map',
	// 		layers: [
	// 			base_map,	
	// 			msp,
	// 			arco_jurbatuba
	// 		],
	// 		view: new ol.View({
	// 			projection: ol.proj.get('EPSG:3857'),
	// 			center: this.center,
	// 			zoom: this.zoom,
	// 			minZoom: 10.65,
	// 			maxZoom: 19
	// 		})
	// 	});
	// }
})
