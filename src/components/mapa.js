import kmls from '../data/kmls'
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

export default {
	name:'mapa',
	data (){
		return {
			featureInfo: {
				"nome": "",
				"etapa": "",
				"ID": ""
			},
			infoBoxStyle: {
				"left": "0",
				"top": "0",
				"position": "absolute"
			},
			// data: monitoramento,
			projeto: undefined,
			layers: undefined,
			breadcrumb: false,
			center: view.getCenter(),		// registro de primeira view
			zoom: view.getZoom() 			//
		}
	},
	props: ['clicked-id', 'data'],
	computed:{
		myMap(){
			return new ol.Map({
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
		},
		kmls(){
			let parseKml = [];
			kmls.map(function(str) { // dev/data/kmls.js
				let outputid
				let baseNumber = str.substring(0,2) // primeiros dois strings -> 1_ ou 10
				let numericStr = parseInt(baseNumber,10); // converte strings para número ou retorna NaN
				Number.isNaN(numericStr) ? // se string não é numérica  
					outputid = str.substring(0, 4) : // retorna 4 caracteres -> 'BASE'
					outputid = numericStr.toString() // Converte valor numérico em string 
					outputid != '0' ? // se id não é 0 (kml com todos os pius)
						parseKml.push({ // insere na array > transforma em uma layer
							id:	outputid,
							fileName: str
						}) : false;
			})
			let baseFeature = parseKml.pop();
			parseKml.reverse().push(baseFeature);
			return parseKml;
		},
		kmlLayers(){
			let app = this
			let output = [
				// new ol.layer.Tile({ 
				// 	source: new ol.source.OSM()
				// })
				new ol.layer.Tile({
					source: new ol.source.BingMaps({
						imagerySet: 'CanvasGray',
						culture: 'pt-BR',
						key: 'efIeX8pQ5PTC2IcEjuVT~s7zLBU5z6I20qWhPhkAy3w~AlgB9eABTaOsOC8LVDJEQhyb4ik0B0mWBpIfDgrVwNYVqgfnxOsXFN3_8XKZlP1d'
					})
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
					renderBuffer: 100,
					renderMode: 'image',
				});
				layer.set('id_projeto', object.id)
				output.splice(1,0,layer)
			})
			return output
		}
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
		},
		data(){
			this.layers = this.myMap.getLayers();
			this.highlightSettings();
			let app = this;
			this.myMap.on('click', function(evt){
				app.getFeatureLayerInfo(evt.pixel, evt);
			});
		}
	},
	methods:{
		// Define as configuracoes de estilo do highlight (feature ressaltada)
		highlightSettings(){
			let highlightStyleCache = {};
			featureOverlay = new ol.layer.Vector({
				source: new ol.source.Vector(),
				map: this.myMap,
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
		},

		// Aplica zoom no mapa para focar na layer do projeto atual
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
		fConsultaAberta(idKml) {
			let output;
			this.data.map(function(index){
				if (index.ID_rev == idKml) {
					if (index.b_status == 'aberta' || index.e_status_consulta_internet_minuta == 'aberta') {
						output = 'consultaAberta';
					} else { output = ''; };
				};
			});
			return output;
		},
		atribuiEtapaClass(idKml) {
			let output;
			this.data.map(function(index){
				if (index.ID_rev == idKml) {
					if (index.etapas_NUM <= 3) { output = 'proposicao' };
					if (index.etapas_NUM > 3 && index.etapas_NUM <= 7) { output = 'andamento'};
					if (index.etapas_NUM == 8) { output = 'implantacao' };
					if (index.etapas_NUM == 9) { output = 'suspenso' };
					if (index.etapas_NUM == 10) { output = 'arquivado' };
					if (index.etapas_NUM == 11) { output = 'prospeccao' };
				};
			});
			return output;
		},
		// Ilumina a feature selecionada e exibe suas informacoes no balao
		getFeatureLayerInfo(pixel, evt) {
			// Região selecionada - feature
			let feature = this.myMap.forEachFeatureAtPixel(pixel, function(feature){				
				return feature;				
			});
			if (highlight !== undefined) {
				featureOverlay.getSource().removeFeature(highlight); // Remove o highlight
				this.featureInfo.nome = null; // Altera info e posicao da caixa
				highlight = undefined;
			}
			// Se houver feature no ponto clicado, mostra suas propriedades
			if (feature && feature.get('name') !== "São Paulo" && !this.$root.isFocused) {
				// Posiciona a caixa no cursor do mouse
				let afastX = evt.originalEvent.clientX - document.getElementById("app").offsetParent.offsetLeft + 8;
				let afastY = evt.originalEvent.clientY - document.getElementById("app").offsetParent.offsetTop + 8;
				this.infoBoxStyle.left = afastX+"px";
				this.infoBoxStyle.top = afastY+"px";
				let app = this;
				// Atribui o valor da caixa de texto (balao)
				this.data.forEach(function(projData){ // Percorre os projetos do 'data' para encontrar o projeto da feature
					if(feature.get('ID') === projData.ID_rev){
						app.featureInfo.nome = projData.id_nome;
						app.featureInfo.etapa = projData.a_etapa_comunicacao;
					}
				});
				this.featureInfo.ID = feature.get('ID');
				featureOverlay.getSource().addFeature(feature);
				highlight = feature;
			}
			else if(this.$root.isFocused) {
				this.resetApp();
			}
		},
		// Remove o highlight (feature ressaltada)
		removeHighlight(){
			this.$root.isFocused = true;
			this.featureInfo.nome = null;
			featureOverlay.getSource().removeFeature(highlight); // Remove o highlight
			this.featureInfo.nome = null; // Altera info e posicao da caixa
			highlight = undefined;
		},
		defineStyle(id){
			let id_projeto = undefined
			let etapa = undefined
			let outputColor = {
				stroke: undefined,
				fill: undefined
			}

			this.data.map(function(index) {
				if(index.ID_rev == id) {
					id_projeto = id;
					etapa = index.etapas_NUM
				}
			}) 

			let etapaNumber = parseInt(etapa, 10)
			if (id == 'BASE'){
				outputColor.stroke = 'black'
				outputColor.fill = 'rgba(255, 255, 255, 0)'
			}
			else if(etapaNumber <= 3){ 
				outputColor.stroke = 'rgba(50, 50, 50, 0)'
				outputColor.fill = 'rgba(255, 204, 179, 1)'
			}
			else if(3 < etapaNumber && etapaNumber <= 7){ 
				outputColor.stroke = 'rgba(50, 50, 50, 0)'
				outputColor.fill = 'rgba(255, 85, 0, 1)'
			}
			else if(7 < etapaNumber && etapaNumber <= 8){ 
				outputColor.stroke = 'rgba(50, 50, 50, 0)'
				outputColor.fill = 'rgba(128, 43, 0, 1)'
			}
			else if(8 < etapaNumber && etapaNumber <= 10){
				outputColor.stroke = 'rgba(50, 50, 50, 0)'
				outputColor.fill = 'rgba(220, 220, 220, 1)'
			}
			else{
				outputColor.stroke = 'rgba(255, 85, 0, .5)'
				outputColor.fill = 'rgba(200,200,200, 0)'
			}

			let style = new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: outputColor.stroke,
					width: .75,
				}),
				fill: new ol.style.Fill({
					color: outputColor.fill
				})
			});
			return style
		},
		setProjectId(id){
			this.removeHighlight();
			this.$emit('clicked', id);			
		},
		resetApp(){
			this.$root.isFocused = false;
			const app = this
			this.kmlLayers.map(function(value, index) {
				app.layers.item(index).setOpacity(1)
			})
			view.animate({
				center: this.center,
				zoom: this.zoom,
				duration: 1500
			});
			this.$emit('clicked', undefined);
			this.breadcrumb = false;
			app.projeto = undefined;
		},
		dlKml(id) {
			if (id != undefined) {
				for (let i = 0; i <= this.kmls.length; i++) {
					if (this.kmls[i].id == id) {
						let url = dist_folder+'kml/'+this.kmls[i].fileName;
						return url;
					}
				}
			} else if (id == undefined) {
				let url = dist_folder+'kml/'+'0_PIUs_gestao_urbana.kml';
				return url;
			} else { return '' }
		},
		dlShp(id) {
			if (id != undefined) {
				for (let i = 0; i <= this.kmls.length; i++) {
					if (this.kmls[i].id == id) {
						let url = dist_folder+'shp/'+this.kmls[i].fileName.slice(0,this.kmls[i].fileName.lastIndexOf('.'))+'.rar';
						return url;
					}
				}
			} else if (id == undefined) {
				let url = dist_folder+'shp/'+'0_PIUs_gestao_urbana.rar';
				return url;
			} else { return '' }
		},
	},
	template: `
	<div id="mapa">
		<div class="title">
			<h3>Projetos de Intervenção Urbana</h3>
			<ul v-if="breadcrumb" class="mapa_breadcrumb">
				<li><a href="#todos" @click="resetApp">PIUs</a></li>
				<li>{{ projeto.a_etapa_comunicacao }}</li>
				<li>{{ projeto.id_nome }}</li>
			</ul>
		</div>
		<div id="map" class="map">
			<div class="downloadBase">
				<a :href="dlKml(clickedId)" id="dlKml">
					<i class="material-icons">get_app</i> KML
				</a>
				<a :href="dlShp(clickedId)" id="dlShp">
					<i class="material-icons">get_app</i> Shapefile
				</a>
			</div>
			<div class="legenda" v-if="clickedId == undefined">
				<span>Legenda</span>
				<div class="proposicao">Em proposição</div>
				<div class="andamento">Em andamento</div>
				<div class="implantacao">Implantação</div>
				<div class="suspenso">Suspenso/arquivado</div>
				<div class="prospeccao">Em prospecção</div>
			</div>
		</div>
		<div id="infoModal" class="infoModal" v-if="featureInfo.nome" v-bind:style="infoBoxStyle" @click="setProjectId(featureInfo.ID)">
			<a href="#" class="infoModalNome" v-bind:class="fConsultaAberta(featureInfo.ID)">{{ featureInfo.nome }}</a>
			<a href="#" class="infoModalEtapa" v-bind:class="atribuiEtapaClass(featureInfo.ID)">{{ featureInfo.etapa }}</a>
		</div>
	</div>
	`
}