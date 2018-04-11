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

		<div v-for="projeto in data">

			<div v-if="projeto.subetapa<=3">
				<div>
					<div>Em proposição</div>
					<div>PIUs públicos</div>
					<div>PIUs privados</div>
				</div>

				<div v-if="projeto.subetapa==1">
					<div v-for="projeto.natureza==publico">{{ projeto.nome }}</div>
				</div>
			</div>

		</div>


	</div>
	`
	//teremos que aguardar a joyce definir a estrutura (colunas do excel)
}