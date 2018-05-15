let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
			projeto: undefined,
		}
	},
	props: ['clicked-id'],
	methods: {
	},
	computed:{
		centro(){return [-5190080.00000,-2708530.34945]},
		embu(){return [-5210080.00000,-2708530.34945]},
	},
	mounted(){
		let base_map = new ol.layer.Tile({ source: new ol.source.OSM() });

		// primeira view
		let view = new ol.View({
			projection: ol.proj.get('EPSG:3857'),
			center: this.centro,
			zoom: 10.65,
			minZoom: 4,
			maxZoom: 19
		});

		// instância mapa
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

					// alterar centro aqui
					app.changeCenter(app.embu)

				};
			});

		}
	},
	methods:{
		changeCenter(novocentro){
			console.log(novocentro)
			let map = document.getElementById('map')
			console.log(map.view)
			map.view.animate({
				center: novocentro,
				duration: 2000
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
