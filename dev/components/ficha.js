let ficha = {
	name:'ficha',
	data (){
		return {
			data: monitoramento,
			hiperlinks: hiperlinks,
			projeto: '',
			menuClickedId: '',
			menu: false,
			E01: false, E02: false, E03: false, E04: false,
			E05: false, E06: false, E07: false, E08: false,
		}
	},
	props: ['clicked-id'],
	methods: {
		atribuiEtapa(etp) {
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp == 8) { return 'implantacao' };
			if (etp == 9) { return 'suspenso' };
			if (etp == 10) { return 'arquivado' };
			if (etp == 11) { return 'prospeccao' };
		},

		dataExcelJS(data) {
			var utc_days = Math.floor(data - 25568);
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

		encontraProjeto(newClickedId) {
			this.data.map(function(index) {
				// console.log(par)
				if (index.id == newClickedId) {
					this.projeto = index;
				};
			});
			this.hiperlinks.map(function(index) {
				if (index.ID_Projeto == newClickedId) {
					this.proj == index;
				};
			});
		},

		enviaId(event) {
			this.$emit('clicked', this.menuClickedId)
		},

		gravaId(id) {
			this.menuClickedId = id;
			this.enviaId();
		},

		atribuiEstado(etapa) {
			let e = this.projeto.etapas_NUM;
			if (e < etapa || e > 8) { return 'posterior' };
			if (e == etapa) { return 'atual' };
			if (e > etapa) { return 'anterior' };
		},

		ext(filename) {
			let extensao = filename.substring(filename.lastIndexOf('.')+1, filename.length).replace('/','');
			if (extensao.length > 4 || extensao.length <= 2) { return 'url' };
			if (extensao.length > 2 || extensao.length <= 4) { return extensao };
		},

		abreTramitacao(par) {
			let etapa = par.etapas_NUM;
			if (etapa == 1) { this.E01 = true; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 2) { this.E02 = true; this.E01 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 3) { this.E03 = true; this.E01 = false; this.E02 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 4) { this.E04 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E05 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 5) { this.E05 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E06 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 6) { this.E06 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E07 = false; this.E08 = false; };
			if (etapa == 7) { this.E07 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E08 = false; };
			if (etapa == 8) { this.E08 = true; this.E01 = false; this.E02 = false; this.E03 = false; this.E04 = false; this.E05 = false; this.E06 = false; this.E07 = false; };
		},

		fConsultaAberta(par) {
			if (par.b_status == 'aberta' || par.e_status_consulta_internet_minuta == 'aberta') { 
				return 'consultaAberta'
			};
		},

		arquivosDiscussao(etapa, arquivoCat) {
			var output = '';
			for (var i = 0; i < hiperlinks.length; i++) {
				if (hiperlinks[i].ID_Projeto == this.projeto.ID_rev && hiperlinks[i].ID_etapa == etapa && hiperlinks[i].Idp == arquivoCat) {
					switch (arquivoCat) {
						case 1: output = 'Consulta Instâncias'; break;
						case 2: output = 'Consulta Caderno'; break;
						case 3: output = 'Consulta Minuta'; break;
						case 4: output = 'Audiência Pública'; break;
						case 5: output = 'Reuniões Bilaterais'; break;
						case 6: output = 'Outras'; break;
						case 7: output = 'Projeto Final'; break;
						default: output = ''; break;
					};
				};
			};
			return output;
		},

	},

	watch:{
		clickedId(newprop,oldprop){
			const app = this;
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index;
					app.abreTramitacao(index);
				};
			});
		}
	},

	template: `
	<div id="ficha" lang="pt-br">

		<div @click="menu=!menu" class="menu-titulo">
			<div class="titulo" v-bind:class="atribuiEtapa(projeto.etapas_NUM)">
				<span v-bind:class="fConsultaAberta(this.projeto)">{{ projeto.id_nome }}</span>
				<i class="material-icons" v-if="!menu">expand_more</i>
				<i class="material-icons" v-if="menu">expand_less</i>
			</div>
			<transition name="menuSlide">
				<ul class="menu" v-if="menu">
					<li v-for="projeto in data.slice().sort(function(a,b){return a.etapas_NUM - b.etapas_NUM})" 
					v-bind:class="atribuiEtapa(projeto.etapas_NUM)" 
					:key="projeto.ID_rev">
						<a v-bind:class="fConsultaAberta(projeto)" @click="gravaId(projeto.ID_rev)" v-if="projeto.etapas_NUM <= 10">{{ projeto.id_nome }}</a>
					</li>
				</ul>
			</transition>
		</div>

		<div class="container">
			<div class="colId">
				<div class="indicador" v-bind:class="atribuiEtapa(projeto.etapas_NUM)">{{ projeto.a_etapa_comunicacao }}</div>
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

				<!--DESCRICAO-->
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique dolor eu porttitor rutrum. Cras consectetur nisi sed nibh suscipit iaculis. Vivamus eu enim at metus tristique rutrum. Suspendisse orci lacus, ornare blandit leo quis, blandit pellentesque felis. Fusce ornare cursus eros non tincidunt. Sed ut urna dui. Nunc nec mauris eu sapien venenatis scelerisque. Maecenas volutpat aliquet sapien, vel condimentum tellus ultrices et. Nulla facilisi. Donec a interdum ante, eu blandit sapien. Sed rhoncus nibh sed eros efficitur, a tincidunt tellus ultricies. Suspendisse gravida metus dolor, a pulvinar ligula semper nec. Morbi imperdiet maximus elementum. Duis rutrum eleifend justo, et pellentesque arcu ultricies sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </p>
				
				<!--ESCOPO-->
				<p>Sed viverra, risus at tincidunt convallis, magna libero sollicitudin velit, sit amet porta nulla sem at metus. Nam sit amet gravida purus, id aliquam nibh. Aenean ac augue non lectus molestie interdum non ac risus. Suspendisse eu vestibulum libero, a hendrerit nibh. Nullam sed lacus et mauris molestie efficitur eget eget neque. Mauris non faucibus tellus. Pellentesque non dapibus dui, vel aliquam risus. Sed posuere faucibus lectus.</p>

				<template v-if="projeto.urb_elemento_da_rede_de_estruturacao_urbana != 'null' && projeto.urb_elemento_da_rede_de_estruturacao_urbana != '-'">
					<div>
						<h6>Elemento da rede de estruturação urbana</h6>
						{{ projeto.urb_elemento_da_rede_de_estruturacao_urbana }}
					</div>
				</template>
				<template v-if="projeto.urb_area_total != 'null' && projeto.urb_area_total != '-'">
					<div>
						<h6>Área total</h6>
						{{ projeto.urb_area_total }}
					</div>
				</template>
				<template v-if="projeto.urb_area_total != 'null' && projeto.urb_area_total != '-'">
					<div>
						<h6>Zonas especiais</h6>
						{{ projeto.urb_area_total }} <!--MUDAR-->
					</div>
				</template>
				<template v-if="projeto.urb_justificativa_interesse_publico != 'null' && projeto.urb_justificativa_interesse_publico != '-'">
					<div>
						<h6>Interesse público</h6>
						{{ projeto.urb_justificativa_interesse_publico }}
					</div>
				</template>
				<template v-if="projeto.urb_justificativa_interesse_publico != 'null' && projeto.urb_justificativa_interesse_publico != '-'">
					<div>
						<h6>Interesse privado</h6>
						{{ projeto.urb_justificativa_interesse_publico }} <!--MUDAR PRA PRIVADO-->
					</div>
				</template>
				<template v-if="projeto.urb_contrapartida_prevista != 'null' && projeto.urb_contrapartida_prevista != '-'">
					<div>
						<h6>Contrapartidas previstas</h6>
						{{ projeto.urb_contrapartida_prevista }}
					</div>
				</template>
			</div>

			<div class="tramitacao">
				<h4>Tramitação</h4>
						
				<div>
					<div class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.a_data_protocolo) }}—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E01=!E01" v-bind:class="atribuiEstado(1,projeto.etapas_NUM)">
							01 <span>Proposição dos elementos prévios</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E01">
							<template v-if="projeto.a_data_protocolo != null && projeto.a_data_protocolo != '-'">
								<p>
									<span>Protocolado</span> em {{ dataExcelJS(projeto.a_data_protocolo) }}
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 1">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E02=!E02" v-bind:class="atribuiEstado(2,projeto.etapas_NUM)">
						02 <span>Consulta pública inicial</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E02">
							<template v-if="projeto.b_status != 'null' && projeto.b_status != '-'">
								<p>
									Consulta <span>{{ projeto.b_status }}</span> ({{ dataExcelJS(projeto.b_data_inicio) }}—{{ dataExcelJS(projeto.b_data_final) }})
								</p>
							</template>
							<div class="arquivos" :nome="arquivosDiscussao(2,1)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 1">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,2)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 2">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,3)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 3">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,4)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 4">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,5)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 5">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,6)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 6">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(2,7)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 2 && hiperlink.Idp == 7">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						{{ dataExcelJS(projeto.c_data_envio) }}—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E03=!E03" v-bind:class="atribuiEstado(3,projeto.etapas_NUM)">
						03 <span>Avaliação SMUL</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E03">
							<template v-if="projeto.c_data_envio != 'null' && projeto.c_data_envio != '-'">
								<p>
									<span>Enviado para SMUL</span> em {{ dataExcelJS(projeto.c_data_envio) }}
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 3">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E04=!E04" v-bind:class="atribuiEstado(4,projeto.etapas_NUM)">
						04 <span>Elaboração</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E04">
							<!-- <template>
								<p>
									Responsável
									<span>{{responsavel}}</span>
								</p>
							</template> -->
							<template v-if="projeto.d_secretarias_envolvidas != 'null' && projeto.d_secretarias_envolvidas != '-'">
								<p>
									Secretarias envolvidas<br>
									<span>{{ projeto.d_secretarias_envolvidas }}</span>
								</p>
							</template>
							<template v-if="projeto.d_orgaos_externos_envolvidos != 'null' && projeto.d_orgaos_externos_envolvidos != '-'">
								<p>
									Órgãos externos envolvidos<br>
									<span>{{ projeto.d_orgaos_externos_envolvidos }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 4">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E05=!E05" v-bind:class="atribuiEstado(5,projeto.etapas_NUM)">
						05 <span>Discussão pública</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E05">
							<template v-if="projeto.e_status_consulta_internet_minuta != 'null' && projeto.e_status_consulta_internet_minuta != '-'">
								<p>
									Consulta online <span>{{ projeto.e_status_consulta_internet_minuta }}</span> ({{ dataExcelJS(projeto.e_data_inicio_consulta_minuta) }}—{{ dataExcelJS(projeto.e_data_final_consulta_minuta) }})
								</p>
							</template>
							<template v-if="projeto.e_data_audiencia_publica != 'null' && projeto.e_data_audiencia_publica != '-'">
								<p>
									Audiência pública realizada em <span>{{ dataExcelJS(projeto.e_data_audiencia_publica) }}</span>
								</p>
							</template>
							<template v-if="projeto.e_outras_atividades_participativas != 'null' && projeto.e_outras_atividades_participativas != '-'">
								<p>
									Outras atividades participativas<br>
									<span>{{ projeto.e_outras_atividades_participativas }}</span>
								</p>
							</template>
							<div class="arquivos" :nome="arquivosDiscussao(5,1)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 1">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,2)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 2">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,3)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 3">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,4)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 4">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,5)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 5">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,6)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 6">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
							<div class="arquivos" :nome="arquivosDiscussao(5,7)">
								<template v-for="hiperlink in hiperlinks">
									<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 5 && hiperlink.Idp == 7">
										<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
									</p>
								</template>
							</div>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E06=!E06" v-bind:class="atribuiEstado(6,projeto.etapas_NUM)">
						06 <span>Consolidação</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E06">
							<template v-if="projeto.f_instrumento_urbanistico_proposto != 'null' && projeto.f_instrumento_urbanistico_proposto != '-'">
								<p>
									Instrumento urbanístico proposto<br />
									<span>{{ projeto.f_instrumento_urbanistico_proposto }}</span>
								</p>
							</template>
							<template v-if="projeto.f_instrumento_juridico_necessario != 'null' && projeto.f_instrumento_juridico_necessario != '-'">
								<p>
									Instrumento jurídico necessário<br />
									<span>{{ projeto.f_instrumento_juridico_necessario}}</span>
								</p>
							</template>
							<template v-if="projeto.f_instancias_consultadas != 'null' && projeto.f_instancias_consultadas != '-'">
								<p>
									Instâncias consultadas<br />
									<span>{{ projeto.f_instancias_consultadas }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 6">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E07=!E07" v-bind:class="atribuiEstado(7,projeto.etapas_NUM)">
						07 <span>Encaminhamento jurídico</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E07">
							<template v-if="projeto.f_instrumento_juridico_necessario == 'Lei'">
								<p>
									<span>Enviado para CMSP</span> em (data??)<br>
									<span>(tramitacao CMSP??)</span><br>
									<span>Registro</span> 
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 7">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			
				<div>
					<div class="periodoEtapaTramit">
						DD/MM/AAAA—DD/MM/AAAA <!-- período da etapa -->
					</div>
					<div @click="E08=!E08" v-bind:class="atribuiEstado(8,projeto.etapas_NUM)">
						08 <span>Implantação</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E08">
							<template v-if="projeto.h_status_implantacao != 'null' && projeto.h_status_implantacao != '-'">
								<p>
									<span>{{ projeto.h_status_implantacao }}</span>
								</p>
							</template>
							<template v-if="projeto.h_orgao_em_analise != 'null' && projeto.h_orgao_em_analise != '-'">
								<p>
									Órgão em análise<br>
									<span>{{ projeto.h_orgao_em_analise }}</span>
								</p>
							</template>
							<template v-if="projeto.h_registro_administrativo != 'null' && projeto.h_registro_administrativo != '-'">
								<p>
									Número do Processo Administrativo
									<span>{{ projeto.h_registro_administrativo }}</span>
								</p>
							</template>
							<template v-for="hiperlink in hiperlinks">
								<p class="tramit_link" v-if="hiperlink.ID_Projeto == clickedId && hiperlink.ID_etapa == 8">
									<a class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)" :title="hiperlink.nome_publico_do_arquivo" target="_blank">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</p>
							</template>
						</div>
					</transition>
				</div>
			</div>
		</div>

	</div>
	`
}