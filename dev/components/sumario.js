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

		<div id="proposicao">
			<!--<div class="etapa">
				<div>Em proposição</div>
				<div>PIUs públicos</div>
				<div>PIUs privados</div>
			</div>-->

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">01 <span>Em proposição dos elementos prévios</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==1">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==1">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">02 <span>1ª Consulta Pública</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==2">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==2">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">03 <span>Em avaliação após 1ª Consulta</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==3">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==3">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>
		</div>

		<div id="avaliacao">
			<!--<div class="etapa">
				<div class="bg"></div>
				<div>Em avaliação SMUL</div><div></div><div></div>
			</div>-->

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">04 <span>Em avaliação SMUL</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==4">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==4">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>
		</div>

		<div id="elaboracao">
			<!--<div class="etapa">
				<div>Em elaboração</div><div></div><div></div>
			</div>-->

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">05 <span>PIU em elaboração</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==5">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==5">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">06 <span>Discussão pública</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==6">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==6">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">07 <span>Consolidação PIU</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==7">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==7">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">08 <span>Encaminhamento jurídico PMSP</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==8">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==8">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>
		</div>

		<div id="tramitacao">
			<!--<div class="etapa">
				<div>Tramitação jurídica</div><div></div><div></div>
			</div>-->

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">09 <span>Consolidado em Decreto</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==9">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==9">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">10 <span>Em tratativa na CMSP</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==10">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==10">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">11 <span>Consolidado em Lei</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==11">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==11">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>
		</div>

		<div id="implantacao">
			<!--<div class="etapa">
				<div>Em implantação</div><div></div><div></div>
			</div>-->

			<div class="subetapa">
				<div class="bg"></div>
				<div class="titulo">12 <span>Aprovado - em implantação</span></div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Pública' && projeto.subetapa==12">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
				<div>
					<div v-for="projeto in data" v-if="projeto.natureza=='Privado' && projeto.subetapa==12">
						<a href="#">{{ projeto.nome }}</a>
					</div>
				</div>
			</div>
		</div>

	</div>
	`
	//teremos que aguardar a joyce definir a estrutura (colunas do excel)
}