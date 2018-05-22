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
			layers: {
				base_map: 
					new ol.layer.Tile({ 
						source: new ol.source.OSM() 
					})
				,
				limites_msp: 
					new ol.layer.Vector({ 
						source: new ol.source.Vector({
							url: dist_folder + 'kml/BASE_Limite_MSP.kml',
							format: new ol.format.KML()
						}) 
					})
				,
			}
		}
	},
	props: ['clicked-id'],
	computed:{
		kmls(){ 
			let parseKml = [];
			kmls.map(function(str) { // dev/data/kmls.js
				let outputid
				let baseNumber = str.substring(0,2) // primeiros dois strings
				let numericStr = parseInt(baseNumber,10) // converte string para número ou retorna NaN
				Number.isNaN(numericStr) ? // se string não é numérica  
					outputid = str.substring(0, 4) : // retorna 4 caracteres -> 'BASE'
					outputid = numericStr.toString() // Converte valor numérico em string 
				parseKml.push({
					id:	outputid,
					fileName: str
				})
			})
			return parseKml;
		}
	},
	mounted(){
		let map = new ol.Map({ // Cria mapa
			target: 'map',
			layers: [
				this.layers.base_map,
				this.layers.limites_msp
			],
			loadTilesWhileAnimating: true,
			view: view
		});
	},
	watch:{
		clickedId(newprop, oldprop){
			const app = this
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index
					app.alteraView([ index.urb_x, index.urb_y ]);
				};
			});
		}
	},
	methods:{
		alteraView(coordernadas){ // Altera view de Open Layers (linha 4)
			view.animate({
				center: coordernadas,
				zoom: 14,
				duration: 1500
			});
		},
	}, 
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}