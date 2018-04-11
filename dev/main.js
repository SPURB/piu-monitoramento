new Vue({
	el: '#app',
	data:{
		zoom: 10.65,
		center: [-5190080.00000,-2708530.34945], 
		projects: null
	}, 
	components: {
		mapa,
		sumario,
		ficha
	},
	mounted(){
		this.projects = monitoramento;

		let base_map =  new ol.layer.Tile({ source: new ol.source.OSM() })
		let msp = new ol.layer.Vector({
			source: new ol.source.Vector({
				url: dist_folder + 'kml/limite_msp.kml',//dist_folder definido em index.html ou page-piu-monitoramento.php
				format: new ol.format.KML()
			})
		});

		new ol.Map({
			target: 'map',
			layers: [base_map, msp],
			view: new ol.View({
				projection: ol.proj.get('EPSG:3857'),
				center: this.center,
				zoom: this.zoom,
				minZoom: 10.65,
				maxZoom: 19
			})
		});
		console.log(monitoramento);
		console.log(typeof(monitoramento));
		console.log(monitoramento.map(function(elem) { return elem.nome; }))

	},
	methods:{
		mountNames(){
			let project_names = [];

			monitoramento.map(function(index) {
				index.push(project_names);
			})

			return project_names;
		}
	},
})
