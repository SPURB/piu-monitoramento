let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
		}
	},
	props:['location'],
	mounted(){
		//BASE
		const base_map =  new ol.layer.Tile({ source: new ol.source.OSM() })
		const msp = new ol.layer.Vector({
			source: new ol.source.Vector({
				url: dist_folder + 'kml/limite_msp.kml',//dist_folder definido em index.html ou page-piu-monitoramento.php
				format: new ol.format.KML()
			})
		});

		let pde_mem = new ol.layer.Vector();
		const pde_mem_source = new ol.source.Vector({
			url: dist_folder + 'geoson/pde_02_macroareaestruturacaometropolitana.geojson',
			format: new ol.format.GeoJSON()
		})

		//PROJETOS
		// TODO: Montar dinamicamente os projetos
		let anhembi = new ol.layer.Vector();

		const anhembi_source = new ol.source.Vector({
			url: dist_folder + 'kml/piu-anhembi_2018-04.kml',
			format: new ol.format.KML()
		})

		new ol.Map({
			target: 'map',
			layers: [base_map,msp,pde_mem,anhembi],
			view: new ol.View({
				projection: ol.proj.get('EPSG:3857'),
				center: this.location.center,
				zoom: this.location.zoom,
				minZoom: 10.65,
				maxZoom: 19
			})
		})
		setTimeout(()=> pde_mem.setSource(pde_mem_source), 3000);
		setTimeout(()=> anhembi.setSource(anhembi_source), 4000);
	},
	// methods:{
		// stringProjects(){ // TODO: Montar a variável let map_layers = '[base_map, msp, anhembi, jurubatuba, ..]');
		// 	let aString = '[base_map, msp,';
		// 	this.data.map(function(elem) {
		// 		aString = aString + elem.nome +', ';
		// 	})
		// 	return aString.slice(0, -2) +']';
		// },
	// }, 
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}
Vue