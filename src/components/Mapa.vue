<template>
	<div id="mapa">
			<div class="title">
				<h3>Projetos de Intervenção Urbana</h3>
				<ul v-if="breadcrumb" class="mapa_breadcrumb">
					<li><a href="#todos" @click="resetMapa">PIUs</a></li>
					<li>{{ tramitacaoProjetoSelecionado.nome }}</li>
					<li>{{ projetoSelecionado.nome }}</li>
				</ul>
			</div>
			<div class="downloadBase">
				<a :href="downloadSource('kml')" id="dlKml">
					<i class="material-icons">get_app</i> KML
				</a>
				<a :href="downloadSource('shp')" id="dlShp">
					<i class="material-icons">get_app</i> Shapefile
				</a>
			</div>
			<div id="map" class="map">
		</div>
		<div class="legenda">
			<span>Legenda</span>
			<div class="proposicao">Em proposição</div>
			<div class="andamento">Em andamento</div>
			<div class="implantacao">Implantação</div>
			<div class="suspenso">Suspenso/arquivado</div>
		</div>
	</div>
</template>
<script>
const dist_folder = "./dist/" //https://gestaourbana.prefeitura.sp.gov.br/wp-content/themes/gestaourbana-1.4/SPA/piu-monitoramento/dist/

let esteMapa = (view, layers) => new ol.Map({
	target: 'map',
	layers,
	loadTilesWhileAnimating: true,
	view,
	controls: ol.control.defaults({
		attributionOptions: {
			collapsible: false
		}
	}).extend([new ol.control.ScaleLine()])
})

const base = [
	new ol.layer.Tile({
		source: new ol.source.BingMaps({
			imagerySet: 'CanvasGray',
			culture: 'pt-BR',
			key: 'efIeX8pQ5PTC2IcEjuVT~s7zLBU5z6I20qWhPhkAy3w~AlgB9eABTaOsOC8LVDJEQhyb4ik0B0mWBpIfDgrVwNYVqgfnxOsXFN3_8XKZlP1d'
		})
	}),
	new ol.layer.Vector({
		style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'black',
					width: .75,
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0)'
				})
		}),
		source: new ol.source.Vector({
			url: `${dist_folder}kml/BASE_Limite_MSP.kml`,
			format: new ol.format.KML({ extractStyles: false })
		})
	})
]

export default {
	name:'mapa',
	props: {
		clickedId: {
			type: Number,
			required: true
		},
		projetos: {
			type: Array,
			required: true
		},
		tramitacao: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			mapa: {},
			view: new ol.View({
				projection: ol.proj.get('EPSG:3857'),
				center: [ -5195135.816167192, -2698303.8770360295 ],
				zoom: 10.9,
				minZoom: 10.9,
				maxZoom: 19
			}),
			activeLayers: [],
			center: [],
			breadcrumb: false
		}
	},
	computed: {
		projetoSelecionado () {
			if (!this.projetos.length || !this.clickedId) { 
				return { id: 0, nome: 'Base' } 
			}
			return this.projetos.find(projeto => projeto.id === this.clickedId)
		},
		tramitacaoProjetoSelecionado () {
			if (!this.projetoSelecionado.id_tramitacao) {
				return { id: 0, nome: 'Base' } 
			}
			return this.tramitacao.find(item => item.id === this.projetoSelecionado.id_tramitacao)
		}
	},
	mounted () {
		this.mapa = esteMapa(this.view, base)
	},
	watch: {
		projetos (itens) {
			if(itens.length) {
				this.mapa.getLayers().extend(itens.map(item => {
					return new ol.layer.Vector({
						style: this.defineStyle(item.id_tramitacao),
						source: new ol.source.Vector({
							url: `${dist_folder}kml/${item.kml}`,
							format: new ol.format.KML({ extractStyles: false })
						}),
						updateWhileAnimating: false,
						renderBuffer: 100,
						renderMode: 'image',
						id_projeto: item.id
					})
				}))
				this.activeLayers = this.mapa.getLayers().array_
				this.applyMultiplyOnCanvas()
				this.applyValuesInData()
			}
		},
		clickedId(newprop, oldprop){
			if (!newprop) {
				this.resetMapa()
			}
			else {
				this.view.cancelAnimations()
				this.fitToLayer(newprop)
				this.toggleLayersStyles(newprop)
				this.breadcrumb = true
			}
		}
	},
	methods: {
		downloadSource (sourceType) {
			if (!this.clickedId) {
			const extension = sourceType === 'shp' ? 'rar' : 'kml'
				return `${dist_folder}${sourceType}/0_PIUs_gestao_urbana.${extension}`
			}
			else {
				return `${dist_folder}${sourceType}/${this.projetoSelecionado[sourceType]}`
			}
		},
		applyValuesInData () {
			this.center = this.view.getCenter()
			this.zoom = this.view.getZoom()
		},
		applyMultiplyOnCanvas (counter = 0) {
			const el = tag => document.getElementsByTagName(tag)[0]

			if (el('canvas') == undefined && counter < 15) {
				setTimeout(() => this.applyMultiplyOnCanvas(counter + 1), 1000)
			}
			else {
				el('canvas').getContext('2d').globalCompositeOperation = 'multiply'
			}
		},
		toggleLayersStyles (idProjeto) {
			this.activeLayers.forEach(layer => {
				const id = layer.get('id_projeto')
				if (id === idProjeto) {
					layer.setOpacity(1)
				}
				else if (id !== idProjeto && id > 0) {
					layer.setOpacity(0.3)
				}
			})
		},
		fitToLayer(idProjeto){
			const projetoLayer = this.activeLayers.find(layer => layer.get('id_projeto') === idProjeto)
			const extents = projetoLayer.getSource().getExtent()
			this.view.fit(extents, { duration: 1500 })
		},
		defineStyle(etapaNumber){
			let outputColor = {}
			const projetosStrokes = 'rgba(50, 50, 50, 0.5)'

			if( etapaNumber <= 3){ 
				outputColor.stroke = projetosStrokes
				outputColor.fill = 'rgba(255, 204, 179, 1)'
			}
			else if (3 < etapaNumber && etapaNumber <= 7){ 
				outputColor.stroke = projetosStrokes
				outputColor.fill = 'rgba(255, 85, 0, 1)'
			}
			else if (7 < etapaNumber && etapaNumber <= 8){ 
				outputColor.stroke = projetosStrokes
				outputColor.fill = 'rgba(128, 43, 0, 1)'
			}
			else if (8 < etapaNumber && etapaNumber <= 10){
				outputColor.stroke = projetosStrokes
				outputColor.fill = 'rgba(220, 220, 220, 1)'
			}
			else {
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
			})
			return style
		},
		resetMapa () {
			this.activeLayers.forEach(layer => {
				const haveId = layer => layer.get('id_projeto')
				if (haveId) { layer.setOpacity(1) }
			})
			this.view.animate({
				center: [ -5195135.816167192, -2698303.8770360295 ],
				zoom: 10.9,
				duration: 1500
			})
			this.$emit('clicked', 0)
			this.breadcrumb = false
		},
	}
}	
</script>
