/* Open Layers -> declara view
Dado que a view será alterada de dentro da instância da classe Vue declaramos ela fora do seu escopo
*/
let view = new ol.View({
	projection: ol.proj.get('EPSG:3857'),
	center: [ -5195135.816167192, -2698303.8770360295 ],
	zoom: 10.9,
	minZoom: 10.9,
	maxZoom: 19
});

let featureOverlay;
let highlight;

let mapa = {
	name:'mapa',
	data (){
		return {
			featureInfo: {
				"nome": "",
				"ID": ""
			},
			infoBoxStyle: {
				"background-color": "#EEF",
			    "max-width": "200px",
			    "max-height": "60px",
			    "border-radius": "10px",
			    "padding": "10px",
			    "text-align": "center",
			    "left": "0",
			    "top": "0",
			    "position": "absolute"
			},
			data: monitoramento,
			projeto: undefined,
			layers: undefined,
			breadcrumb: false,
			center: view.getCenter(),		// registro de primeira view
			zoom: view.getZoom() 			//
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
			let baseFeature = parseKml.pop();
			parseKml.reverse().push(baseFeature);
			return parseKml;
		},
		kmlLayers(){
			let app = this
			let output = [
				new ol.layer.Tile({ 
					source: new ol.source.OSM()
				})
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
		this.layers = map.getLayers();
		
		// TODO Modularizar a partir daqui

		/**
		*   ILUMINA FEATURE AO PASSAR O MOUSE POR ELA 
		*	E EXIBE INFORMAÇÕES NO POPUP
		*/
		let app = this;
		let highlightStyleCache = {};
		featureOverlay = new ol.layer.Vector({
		    source: new ol.source.Vector(),
		    map: map,
		    style: function(feature, resolution) {
		        let text = resolution < 5000 ? feature.get('NOME') : feature.get('NOME');          
		        if (!highlightStyleCache[text]) {
		        highlightStyleCache[text] = new ol.style.Style({
		          stroke: new ol.style.Stroke({
		            color: 'rgba(31, 60, 147, 0.4)',
		            width: 2
		          }),
		          fill: new ol.style.Fill({
		            color: 'rgba(31, 60, 147, 0.2)'
		          })
		        });
		        }
		        return highlightStyleCache[text];
		    }
		});
		
		function getFeatureLayerInfo(pixel, event) {
			// let cLayer;

			// // Layer atual (Current Layer - cLayer)			
			// cLayer = map.forEachLayerAtPixel(pixel, function (layer) {
			// 	return layer;
			// });

			// Região selecionada - feature
			let feature = map.forEachFeatureAtPixel(pixel, function(feature){				
				return feature;				
			});
			// Se houver feature no ponto clicado, mostra suas propriedades
			if (highlight !== undefined) {
				featureOverlay.getSource().removeFeature(highlight); // Remove o highlight
				app.featureInfo.nome = null; // Altera info e posicao da caixa
				
				if (feature !== highlight) {
					highlight = undefined;
				}				
			}
			if (feature && feature.get('name') !== "São Paulo") {
				if (feature === highlight) {
					highlight = undefined;
					return
				}
				// Posiciona a caixa no cursor do mouse
				app.infoBoxStyle.left = event.clientX+"px";
				app.infoBoxStyle.top = event.clientY+"px";
				app.featureInfo.nome = feature.get('name');
				app.featureInfo.ID = feature.get('ID');
				featureOverlay.getSource().addFeature(feature);
				highlight = feature;
			}
		};
		map.on('click', function(evt){
			getFeatureLayerInfo(evt.pixel, event);
		});
		// TODO Fim modularizacao
	},
	watch:{
		clickedId(newprop, oldprop){
			const app = this
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index
					app.fitToLayer(newprop)
					app.breadcrumb = true
				};
			});
		}
	},
	methods:{
		fitToLayer(id_projeto){
			view.cancelAnimations()
			let app = this

			if(id_projeto != 'BASE'){
				this.kmlLayers.map(function(value, index) {
					app.layers.item(index).setOpacity(1)
					let id_from_layer = app.layers.item(index).get('id_projeto')// 'id_projeto' atributo setado durante montagem do mapa
					if(id_from_layer == id_projeto){
						view.fit(app.layers.item(index).getSource().getExtent(),  { 
							duration: 1500 
						})
					}
					else if(index > 0) {
						app.layers.item(index).setOpacity(0)
					}
				})
			}
			else{
				console.log('id_projeto inválido')
			}
		},
		removeHighlight(){
			// featureOverlay.getSource().removeFeature(highlight); // Remove o highlight
			// mapa.featureInfo.nome = null; // Altera info e posicao da caixa
			// this.mapa.getFeatureLayerInfo(0, 0);
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
				outputColor.fill = 'rgba(255, 204, 179, .60)'
			}
			else if(3 < etapaNumber && etapaNumber <= 7){ 
				outputColor.stroke = 'rgba(255, 85, 0, 1)'
				outputColor.fill = 'rgba(255, 85, 0, .60)'
			}
			else if(7 < etapaNumber && etapaNumber <= 8){ 
				outputColor.stroke = 'rgba(128, 43, 0, 1)'
				outputColor.fill = 'rgba(128, 43, 0, .60)'
			}
			else if(8 < etapaNumber){
				outputColor.stroke = 'rgba(189, 189, 189, 1)'
				outputColor.fill = 'rgba(189, 189, 189, .20)'
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
		},
		setProjectId(id){
			this.$emit('clicked', id)
		},
		resetApp(){
			const app = this
			this.kmlLayers.map(function(value, index) {
				app.layers.item(index).setOpacity(1)
			})
			view.animate({
				center: this.center,
				zoom: this.zoom,
				duration: 1500
			});
			this.$emit('clicked', undefined)
			this.breadcrumb = false
		},
	},
	template: `
	<div id="mapa" @click="removeHighlight()">
		<div class="title">
			<h3>Projetos de Intervenção Urbana</h3>
			<ul v-if="breadcrumb" class="mapa_breadcrumb">
				<li><a href="#todos" @click="resetApp">PIUs</a></li>
				<li>{{ projeto.a_etapa_comunicacao }}</li>
				<li>{{ projeto.id_nome }}</li>
			</ul>
		</div>
		<div id="map" class="map"></div>
		<div id="infoModal" v-if="featureInfo.nome" v-bind:style="infoBoxStyle"><a @click="setProjectId(featureInfo.ID)" href="#">{{ featureInfo.nome }}</a></div>
	</div>
	`
}