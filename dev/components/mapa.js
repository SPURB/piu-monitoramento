let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
		}
	},
	props:['location'],
	mounted(){
		// let map_layers = [base_map, msp];

		// this.data.map(function(elem) {
		// 	let name = eval('let ' + elem.nome);
		// 	map_layers.push(name);
		// })
		// console.log(map_layers)

		const base_map =  new ol.layer.Tile({ source: new ol.source.OSM() })

		const msp = new ol.layer.Vector({
			source: new ol.source.Vector({
				url: dist_folder + 'kml/limite_msp.kml',//dist_folder definido em index.html ou page-piu-monitoramento.php
				format: new ol.format.KML()
			})
		});

		// TODO: Montar em cada variável uma camada vetorial new ol.layer.Vector

		let map_layers_teste = eval('[base_map, msp]');
		// TODO: Montar a variável let map_layers = eval('[base_map, msp, anhembi, jurubatuba, ..]');
		
		new ol.Map({
			target: 'map',
			layers: map_layers_teste,
			view: new ol.View({
				projection: ol.proj.get('EPSG:3857'),
				center: this.location.center,
				zoom: this.location.zoom,
				minZoom: 10.65,
				maxZoom: 19
			})
		});
	},
	methods: {
		createLayers(){
		}
	},

	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}
Vue