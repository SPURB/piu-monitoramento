/* Open Layers -> declara view
Dado que a view será alterada de dentro da instância da classe Vue declaramos ela fora do seu escopo
*/
let view = new ol.View({
	projection: ol.proj.get('EPSG:3857'),
	center: [-5190080.00000,-2708530.34945],
	zoom: 10.65,
	minZoom: 4,
	maxZoom: 19
});

let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
			projeto: undefined,
		}
	},
	props: ['clicked-id'],
	mounted(){
		let base_map = new ol.layer.Tile({ source: new ol.source.OSM() });
		let map = new ol.Map({
			target: 'map',
			layers: [ base_map],
			loadTilesWhileAnimating: true,
			view: view
		});
	},
	watch:{
		clickedId(newprop,oldprop){
			const app = this
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index
					app.alteraView([ index.mapateste_x, index.mapateste_y ]);
				};
			});

		}
	},
	methods:{
		alteraView(coordernadas){
			console.log(coordernadas)

			// Open Layers -> altera view
			view.animate({
				center: coordernadas,
				duration: 2500
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
