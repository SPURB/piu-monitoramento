let ficha = {
	name:'ficha',
	data (){
		return {
			data: monitoramento,
			projeto: monitoramento[1],
			menu: false,
			E01: false, E02: false, E03: false, E04: false,
			E05: false, E06: false, E07: false, E08: false,
		}
	},
	props: ['clicked-id'],
	methods: {
		getStatusNumber(string) {
			switch (string){
				case 'Em proposição dos elementos prévios': return 1; break;
				case 'Consulta Pública Inicial': return 2; break;
				case 'Em avaliação SMUL': return 3; break;
				case 'Elaboração': return 4; break;
				case 'Discussão pública': return 5; break;
				case 'Consolidação': return 6; break;
				case 'Tramitação Jurídica': return 7; break;
				case 'Implantação': return 8; break;
				case 'Não Autorizado / Não desenvolvido': return 9; break;
				case 'Áreas/Projetos em estudo que demandariam PIUs': return 10; break;
			}
		},
		atribuiEtapa(etapa) {
			let etp = this.getStatusNumber(etapa);
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp > 7) { return 'implantacao' };
		},
		dataExcelJS(data) {
		   var utc_days  = Math.floor(data - 25568);
		   var utc_value = utc_days * 86400;                                        
		   var date_info = new Date(utc_value * 1000);

		   var fractional_day = data - Math.floor(data) + 0.0000001;

		   var total_seconds = Math.floor(86400 * fractional_day);

		   var seconds = total_seconds % 60;

		   total_seconds -= seconds;

		   var hours = Math.floor(total_seconds / (60 * 60));
		   var minutes = Math.floor(total_seconds / 60) % 60;

		   return date_info.toLocaleDateString();
		},
	},

	template: `

	<div id="ficha">
		<div @click="menu =! menu" class="menu-titulo">
			<div class="titulo" v-bind:class=atribuiEtapa(projeto.a_etapa_fluxograma)>
				{{ projeto.id_nome }}
				<i v-if="!menu" class="material-icons">expand_more</i>
				<i v-if="menu" class="material-icons">expand_less</i>
			</div>
			<ul v-if="menu">
				<li>Proj2</li>
				<li>Proj3</li>
				<li>Proj4</li>
				<li>Proj5</li>
			</ul>
		</div>

		<div class="container">
			<div class="colId">
				<div class="indicador" v-bind:class=atribuiEtapa(projeto.a_etapa_fluxograma)>{{ projeto.a_etapa_comunicacao }}</div>
				<div class="id">
					Natureza da proposta
					<div>{{projeto.id_iniciativa_da_proposta}}</div>
					Proponente
					<div>{{projeto.id_proponente}}</div>
					Origem
					<div>{{projeto.id_origem}}</div>
					Registro administrativo
					<div>{{projeto.id_registro_administrativo}}</div>
					<a href="#">Documentos</a>
				</div>
				<a class="link_pag_completa" href="#">Página completa do projeto</a>
			</div>

			<div class="aspectos">
				<h4>Aspectos técnico-urbanísticos</h4>
				<p>Sed viverra, risus at tincidunt convallis, magna libero sollicitudin velit, sit amet porta nulla sem at metus. Nam sit amet gravida purus, id aliquam nibh. Aenean ac augue non lectus molestie interdum non ac risus. Suspendisse eu vestibulum libero, a hendrerit nibh. Nullam sed lacus et mauris molestie efficitur eget eget neque. Mauris non faucibus tellus. Pellentesque non dapibus dui, vel aliquam risus. Sed posuere faucibus lectus.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique dolor eu porttitor rutrum. Cras consectetur nisi sed nibh suscipit iaculis. Vivamus eu enim at metus tristique rutrum. Suspendisse orci lacus, ornare blandit leo quis, blandit pellentesque felis. Fusce ornare cursus eros non tincidunt. Sed ut urna dui. Nunc nec mauris eu sapien venenatis scelerisque. Maecenas volutpat aliquet sapien, vel condimentum tellus ultrices et. Nulla facilisi. Donec a interdum ante, eu blandit sapien. Sed rhoncus nibh sed eros efficitur, a tincidunt tellus ultricies. Suspendisse gravida metus dolor, a pulvinar ligula semper nec. Morbi imperdiet maximus elementum. Duis rutrum eleifend justo, et pellentesque arcu ultricies sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </p>
			</div>

			<div class="tramitacao">
				<h4>Tramitação prevista</h4>
				<ol>
					<li class="anterior">
						<div>
							<span @click="E01=!E01">Em proposição dos elementos prévios</span>
							<div v-if="E01">
								<p>
									<span>Protocolado</span> em {{ dataExcelJS(projeto.a_data_protocolo) }}
									<a href="" type="doc" class="tramit_link">Parecer proposição (SPURB)</a>
								</p>
							</div>
						</div>
					</li>
					<li class="anterior">
						<div>
							<span @click="E02=!E02">Consulta pública inicial</span>
							<div v-if="E02">
								<p>
									Consulta <span>{{ projeto.b_status }}</span> ({{ dataExcelJS(projeto.b_data_inicio) }}–{{ dataExcelJS(projeto.b_data_final) }})
									<a href="#" type="doc" class="tramit_link">Contribuições</a>
									<a href="#" type="doc" class="tramit_link">Parecer Consulta Inicial (SPURB)</a>
								</p>
							</div>
						</div>
					</li>
					<li class="atual">
						<div>
							<span @click="E03=!E03">Em avaliação SMUL</span>
							<div v-if="E03">
								<p>
									<span>Enviado para SMUL</span> em {{ dataExcelJS(projeto.c_data_envio) }}
									<a href="#" type="doc" class="tramit_link">Parecer SMUL</a>
								</p>
							</div>
						</div>
					</li>
					<li class="posterior">
						<div>
							<span @click="E04=!E04">Elaboração</span>
							<div v-if="E04">
								<p>
									Departamento responsável<br>
									<span>{{ projeto.d_secretarias_envolvidas }}</span>
								</p>
								<p>
									Órgãos externos envolvidos<br>
									<span>{{ projeto.d_orgaos_externos_envolvidos }}</span>
								</p>
							</div>
						</div>
					</li>
					<li class="posterior">
						<div>
							<span @click="E05=!E05">Discussão pública</span>
							<div v-if="E05">
								<p>
									<span>Evento realizado em {{ projeto.e_data_audiencia_publica }}</span>
									<a href="#" type="doc" class="tramit_link">Materiais disponibilizados</a>
									<a href="#" type="doc" class="tramit_link">Ata / Contribuições</a>
								</p>
								<p>
									<span>Instâncias consultadas</span>
									<a href="#" type="doc" class="tramit_link">Parecer SABESP</a>
								</p>
								<p>
									Consulta pública online <span>{{ projeto.e_status_consulta_internet_minuta }}</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_minuta) }}–{{ dataExcelJS(projeto.e_data_final_consulta_minuta) }})
									<a href="#" type="doc" class="tramit_link">Contribuições</a>
									<a href="#" type="doc" class="tramit_link">Parecer após discussão pública</a>
								</p>
							</div>
						</div>
					</li>
					<li class="posterior">
						<div>
							<span @click="E06=!E06">Consolidação</span>
							<div v-if="E06">
								<p>
									Instrumento proposto<br>
									<span>{{ projeto.f_instrumento_urbanistico_proposto }}</span>
								</p>				
							</div>
						</div>
					</li>
					<li class="posterior">
						<div>
							<span @click="E07=!E07">Tramitação jurídica</span>
							<div v-if="E07">
								<p>
									Órgão em análise<br>
									<span>{{ projeto.g_nome_orgao_em_analise }}</span>
								</p>
								<p>
									{{ projeto.f_instrumento_juridico_necessario }} !!!!NUMERO!!! - {{ projeto.g_status_aprovacao }}
								</p>
							</div>
						</div>
					</li>
					<li class="posterior">
						<div>
							<span @click="E08=!E08">Implantação</span>
							<div v-if="E08">
								<p>
									<span>{{ projeto.h_status_implantacao }}</span>
								</p>
								<p>
									Órgão em análise<br>
									<span>{{ projeto.h_orgao_em_analise }}</span>
								</p>
							</div>
						</div>
					</li>
				</ol>
			</div>
		</div>

	</div>
	`
}