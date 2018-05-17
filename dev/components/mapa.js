function tst(){
	const centroInicial = [-5190080.00000,-2708530.34945];

	var base_map = new ol.layer.Tile({ source: new ol.source.OSM() });

	var view = new ol.View({
		projection: ol.proj.get('EPSG:3857'),
		center: ol.proj.fromLonLat([-51.9,-27]),
		zoom: 0,
		minZoom: 4,
		maxZoom: 19
	});

	var map = new ol.Map({
		target: 'map',
		layers: [
			base_map	
			// msp,
			// arco_jurbatuba
		],
		view: view,
		loadTilesWhileAnimating: true,
	});
}
function teste(x,y){
	const centroInicial = [-5190080.00000,-2708530.34945];

	var base_map = new ol.layer.Tile({ source: new ol.source.OSM() });

	var view = new ol.View({
		projection: ol.proj.get('EPSG:3857'),
		center: ol.proj.fromLonLat([-51.9,-27]),
		zoom: 0,
		minZoom: 4,
		maxZoom: 19
	});

	var map = new ol.Map({
		target: 'map',
		layers: [
			base_map	
			// msp,
			// arco_jurbatuba
		],
		view: view,
		loadTilesWhileAnimating: true,
	});
	console.log(x,y);
	view.animate({
		center: ol.proj.fromLonLat([x,y]),
		duration: 5000
	});
}

let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
			projeto: '',
			centro_x: '', centro_y: '',
		}
	},
	props: ['clicked-id'],
	methods: {
	},
	mounted(){
		// tst()
		// var msp = new ol.layer.Vector({
		// 	source: new ol.source.Vector({
		// 		url: dist_folder + 'kml/limite_msp.kml',//dist_folder definido em index.html ou page-piu-monitoramento.php
		// 		format: new ol.format.KML()
		// 	})
		// });

		// var arco_jurbatuba = new ol.layer.Vector({
		// 	source: new ol.source.Vector({
		// 		url: dist_folder + 'kml/piu-arco-jurubatuba_2018-04.kml',
		// 		format: new ol.format.KML()
		// 	})
		// });
	},
	watch:{
		clickedId(newprop,oldprop){
			const app = this;
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index;
					app.centro_x = app.projeto.mapateste_x;
					app.centro_y = app.projeto.mapateste_y;
					teste(app.centro_x, app.centro_y);
				};
			});
		}
	},
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}
