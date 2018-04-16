let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
		}
	},
	props:['location'],
	mounted(){
		let base_map = new ol.layer.Tile();
		const base_map_source = new ol.source.OSM();

		const msp = new ol.layer.Vector();
		const msp_source = new ol.source.Vector({
			url: dist_folder + 'geojson/DEINFO_LimiteMunicipio.geojson',
			format: new ol.format.GeoJSON()
		})

		let pde_mem = new ol.layer.Vector();
		const pde_mem_source = new ol.source.Vector({
			url: dist_folder + 'geojson/PDE_02_MacroareaEstruturacaoMetropolitana.geojson',
			format: new ol.format.GeoJSON()
		})

		//PROJETOS
		 var fill = new ol.style.Fill({
		   color: 'rgba(255,255,255,0.4)'
		 });


		let pius = new ol.layer.Vector();
		const pius_source = new ol.source.Vector({
			url: dist_folder + 'geojson/PIUs_v4_Etapas.geojson',
			format: new ol.format.GeoJSON()
		})


		new ol.Map({
			target: 'map',
			layers: [
				base_map,
				// msp,
				// pde_mem,
				pius
			],
			view: new ol.View({
				projection: ol.proj.get('EPSG:3857'),
				center: this.location.center,
				zoom: this.location.zoom,
				minZoom: 10.65,
				maxZoom: 19
			})
		})
		setTimeout(()=> pius.setSource(pius_source), 300);
		setTimeout(()=> pde_mem.setSource(pde_mem_source), 600);
		setTimeout(()=> msp.setSource(msp_source), 900);
		setTimeout(()=> base_map.setSource(base_map_source), 1200);

	},
	methods:{
		// stringProjects(){ // TODO: Montar a variável let map_layers = '[base_map, msp, anhembi, jurubatuba, ..]');
		// 	let aString = '[base_map, msp,';
		// 	this.data.map(function(elem) {
		// 		aString = aString + elem.nome +', ';
		// 	})
		// 	return aString.slice(0, -2) +']';
		// },
	}, 
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}
Vue