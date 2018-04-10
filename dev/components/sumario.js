let sumario = {
	name:'sumario',
	data (){
		return {
			data: monitoramento, 
		}
	},
	methods:{
		pasta_arquivos_kml(arquivo){ return dist_folder + 'kml/' + arquivo }
	},
	template: `
	<div id="sumario">
		<h3>sumário</h3>
		<div v-for="projeto in data">
			<h4>{{ projeto.nome }}</h4>
			<p>{{ projeto.texto_longo }}</p>
			<a :href="pasta_arquivos_kml(projeto.kml)" download>{{projeto.kml}}</a>
		</div>
	</div>
	`
	//teremos que aguardar a joyce definir a estrutura (colunas)
}