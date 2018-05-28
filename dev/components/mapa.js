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
			layers: undefined
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
			let app = this
			let output = [
				new ol.layer.Tile({ 
					source: new ol.source.OSM()
				}),
			]
			this.kmls.map(function(object) {
				let layer = new ol.layer.Vector({ 
					style: app.defineStyle(object.id),
					source: new ol.source.Vector({
						url: dist_folder + 'kml/' + object.fileName,
						format: new ol.format.KML({
							extractStyles: false,
						})
					}),
					updateWhileAnimating: false,
					renderBuffer:100,
					renderMode: 'image',
				});
				layer.set('id_projeto', object.id)
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
			view: view,
			controls: ol.control.defaults({
				attributionOptions: {
					collapsible: false
				}
				}).extend([
					new ol.control.ScaleLine()
				])
		});
		this.layers = map.getLayers()
	},
	watch:{
		clickedId(newprop, oldprop){
			const app = this
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index
					app.fitToLayer(newprop)
				};
			});

		}
	},
	methods:{
		fitToLayer(id_projeto){
			view.cancelAnimations()
			let app = this
			this.kmlLayers.map(function(value, index) {
				app.layers.item(index).setOpacity(1)
				let id_from_layer = app.layers.item(index).get('id_projeto')// atributo setado durante montagem do mapa
				if(id_from_layer == id_projeto){
					view.fit(app.layers.item(index).getSource().getExtent(),  { 
						duration: 1500 
					})
				}
				else if(index > 0) {
					app.layers.item(index).setOpacity(0)
				}
			})
		}, 
		defineStyle(id){
			let id_projeto = undefined
			let etapa = undefined
			let outputColor = {
				stroke: undefined,
				fill: undefined
			}

			monitoramento.map(function(index) {
				if(index.ID_rev == id) {
					id_projeto = id;
					etapa = index.etapas_NUM
				}
			}) 

			let etapaNumber = parseInt(etapa, 10)
			if (id == 'BASE'){
				outputColor.stroke = 'rgba(50,50,50, 0)'
				outputColor.fill = 'rgba(255,255,255, 0.75)'
			}
			else if(etapaNumber <= 3){ 
				outputColor.stroke = 'rgba(255, 204, 179, 1)'
				outputColor.fill = 'rgba(255, 204, 179, .75)'
			}
			else if(3 < etapaNumber <= 7){ 
				outputColor.stroke = 'rgba(255, 85, 0, 1)'
				outputColor.fill = 'rgba(255, 85, 0, .75)'
			}
			else if(7 < etapaNumber <= 8){ 
				outputColor.stroke = 'rgba(128, 43, 0, 1)'
				outputColor.fill = 'rgba(128, 43, 0, .75)'
			}
			else if(8 < etapaNumber){
				outputColor.stroke = 'rgba(0, 0, 0, 1)'
				outputColor.fill = 'rgba(255, 255, 255, .75)'
			}
			else{
				outputColor.stroke = 'rgba()'
				outputColor.fill = 'rgba(200,200,200, 0.5)'
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
	}, 
	template: `
	<div id="mapa">
		<h3>Projetos de Intervenção Urbana</h3>
		<div id="map" class="map"></div>
	</div>
	`
}