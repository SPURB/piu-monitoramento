let mapa = {
	name:'mapa',
	data (){
		return {
			data: monitoramento,
			projeto: '',
		}
		var centro = ol.proj.fromLonLat([-50,-50]);
	},
	props: ['clicked-id'],
	methods: {
		encontraProjeto(newClickedId) {
			this.data.map(function(index) {
				if (index.id == newClickedId) {
					this.projeto = index;
				};
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
