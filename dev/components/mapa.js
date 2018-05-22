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
			projeto: undefined
		}
	},
	props: ['clicked-id'],
	computed:{
		kmls(){ 
			let parseKml = [];
			kmls.map(function(str) { // dev/data/kmls.js
				let outputid
				let baseNumber = str.substring(0,2) // primeiros dois strings -> 1_ ou 10 
				let numericStr = parseInt(baseNumber,10) // converte strings para número ou retorna NaN
				Number.isNaN(numericStr) ? // se string não é numérica  
					outputid = str.substring(0, 4) : // retorna 4 caracteres -> 'BASE'
					outputid = numericStr.toString() // Converte valor numérico em string 
				parseKml.push({
					id:	outputid,
					fileName: str
				})
			})
			return parseKml;
		},
		kmlLayers(){
			let output = [
				new ol.layer.Tile({ 
					source: new ol.source.OSM()
				}) 
			]

			function defineStyle(id){
				let id_projeto = undefined
				let etapa = undefined
				let outputColor = {
					stroke: 'rgba()',
					fill: 'rgba(200,200,200, 0.5)'
				}

				monitoramento.map(function(index) {
					if(index.ID_rev == id) {
						id_projeto = id;
						etapa = index.etapas_NUM
					}
				}) 

				// console.log('id: '+ id, 'etapa: ' + parseInt(etapa, 10))
				let etapaNumber = parseInt(etapa, 10)

				// #ffccb3 	-> Em proposiçao
				// #f50 	-> Em andamento
				// #802b00 	-> Implantação
				// #bdbdbd 	-> Suspenso
				if (id == 'BASE'){
					outputColor.stroke = 'rgba(50,50,50, 1)'
					outputColor.fill = 'rgba(255,255,255, 0.75)'
				}
				else if(etapaNumber < 3){
					outputColor.fill = '#ffccb3'
				}
				else if(3 < etapaNumber < 6){
					outputColor.fill = '#f50'
				}
				else if(6 < etapaNumber < 9){
					outputColor.fill = '#802b00'
				}
				else if(9 < etapaNumber){
					outputColor.fill = '#bdbdbd'
				}

				let style = new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: outputColor.stroke,
						width: 1
					}),
						fill: new ol.style.Fill({
						color: outputColor.fill
					})
				});
				return style
			}

			this.kmls.map(function(object) {
				let layer =  new ol.layer.Vector({ 
					style: defineStyle(object.id),
					source: new ol.source.Vector({
						url: dist_folder + 'kml/' + object.fileName,
						format: new ol.format.KML({
							extractStyles: false,
						}),
					}),
					updateWhileAnimating: true,
					renderBuffer:100,
					renderMode: 'image'
				})
				output.splice(1,0,layer)
			})
			return output
		}
	},
	mounted(){
		let map = new ol.Map({
			target: 'map',
			layers: this.kmlLayers,
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
		}
	}, 
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}