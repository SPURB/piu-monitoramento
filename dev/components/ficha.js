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
		getStatusNumber(string) {
			switch (string){
				case 'Em proposição dos elementos prévios': return 1; break;
				case 'Consulta Pública Inicial': return 2; break;
				case 'Avaliação após 1ª Consulta': return 2.5; break;
				case 'Em avaliação SMUL': return 3; break;
				case 'Elaboração': return 4; break;
				case 'Discussão pública': return 5; break;
				case 'Consolidação': return 6; break;
				case 'Tramitação Jurídica': return 7; break;
				case 'Implantação': return 8; break;
				case 'Não Autorizado / Não desenvolvido': return 9; break;
				case 'Não autorizado /  Não desenvolvido': return 9; break;
				case 'Desenvolvido / Suspenso': return 10; break;
				case 'Possível': return 11; break;
			}
		},

		atribuiEtapa(etapa) {
			let etp = this.getStatusNumber(etapa);
			if (etp <= 3) { return 'proposicao' };
			if (etp > 3 && etp <= 7) { return 'andamento'};
			if (etp > 7 && etp <= 8) { return 'implantacao' };
			if (etp > 8 && etp <= 10) { return 'suspenso' };
			if (etp >= 11) { return 'prospeccao' };
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

		atribuiEstado(etapa,etpflx) {
			let e = this.getStatusNumber(etpflx);
			if (e < etapa) { return 'posterior' };
			if (e == etapa) { return 'atual' };
			if (e > etapa) { return 'anterior' };
		},

		ext(filename) {
			let extensao = filename.substring(filename.lastIndexOf('.')+1, filename.length);
			if (extensao.length > 4) { return 'url' };
			if (extensao.length <= 4) { return extensao };
		},
	},

	watch:{
		clickedId(newprop,oldprop){
			const app = this;
			app.data.map(function(index) {
				if (index.ID_rev == newprop) {
					app.projeto = index;
				};
			});
		}
	},

	mounted: {
		abreTramitacao() {
			let etapa = this.projeto.etapas_NUM;
			if (etapa == 1) { E01: true };
			if (etapa == 2) { E02: true };
			if (etapa == 3) { E03: true };
			if (etapa == 4) { E04: true };
			if (etapa == 5) { E05: true };
			if (etapa == 6) { E06: true };
			if (etapa == 7) { E07: true };
			if (etapa == 8) { E08: true };
		}
	},

	template: `
	<div id="ficha">
		<div @click="menu = !menu" class="menu-titulo">
			<div class="titulo" v-bind:class=atribuiEtapa(projeto.a_etapa_fluxograma)>
				{{ projeto.id_nome }}
				<i v-if="!menu" class="material-icons">expand_more</i>
				<i v-if="menu" class="material-icons">expand_less</i>
			</div>
			<!-- <transition-group name="menu" tag="ul" v-if="menu" class="menu"> -->
				<ul v-if="menu" class="menu"><li v-for="projeto in data.sort(function(a,b){return getStatusNumber(a.a_etapa_fluxograma)-getStatusNumber(b.a_etapa_fluxograma)})" v-bind:class=atribuiEtapa(projeto.a_etapa_fluxograma) :key="projeto.id_nome">
					<a @click="gravaId(projeto.ID_rev)">{{ projeto.id_nome }}</a>
				</li></ul>
			<!-- </transition-group> -->
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
						
				<div>
					<div @click="E01=!E01" v-bind:class=atribuiEstado(1,projeto.a_etapa_fluxograma)>
							01 <span>Em proposição dos elementos prévios</span>
					</div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E01">
							<p v-if="projeto.a_data_protocolo != null && projeto.a_data_protocolo != '-'">
								<span>Protocolado</span> em {{ dataExcelJS(projeto.a_data_protocolo) }}
								<hr v-if="projeto.a_data_protocolo != null && projeto.a_data_protocolo != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 1" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E02=!E02" v-bind:class=atribuiEstado(2,projeto.a_etapa_fluxograma)>02 <span>Consulta pública inicial</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E02">
							<p v-if="projeto.b_status != 'null' && projeto.b_status != '-'">
								Consulta <span>{{ projeto.b_status }}</span> ({{ dataExcelJS(projeto.b_data_inicio) }}—{{ dataExcelJS(projeto.b_data_final) }})
								<hr v-if="projeto.b_status != 'null' && projeto.b_status != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 2" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E03=!E03" v-bind:class=atribuiEstado(3,projeto.a_etapa_fluxograma)>03 <span>Em avaliação SMUL</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E03">
							<p v-if="projeto.c_data_envio != 'null' && projeto.c_data_envio != '-'">
								<span>Enviado para SMUL</span> em {{ dataExcelJS(projeto.c_data_envio) }}
								<hr v-if="projeto.c_data_envio != 'null' && projeto.c_data_envio != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 3" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E04=!E04" v-bind:class=atribuiEstado(4,projeto.a_etapa_fluxograma)>04 <span>Elaboração</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E04">
							<p v-if="projeto.d_status != 'null' && projeto.d_status != '-'">
								<span>{{ projeto.d_status }}</span>
								<hr v-if="projeto.d_status != 'null' && projeto.d_status != '-'">
							</p>
							<p v-if="projeto.d_secretarias_envolvidas != 'null' && projeto.d_secretarias_envolvidas != '-'">
								Departamento responsável<br>
								<span>{{ projeto.d_secretarias_envolvidas }}</span>
								<hr v-if="projeto.d_secretarias_envolvidas != 'null' && projeto.d_secretarias_envolvidas != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 4" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E05=!E05" v-bind:class=atribuiEstado(5,projeto.a_etapa_fluxograma)>05 <span>Discussão pública</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E05">
							<!-- COMO ORGANIZAR DISCUSSAO PUBLICA??? -->
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E06=!E06" v-bind:class=atribuiEstado(6,projeto.a_etapa_fluxograma)>06 <span>Consolidação</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E06">
							<p v-if="projeto.f_status != 'null' && projeto.f_status != '-'">
								<span>{{ projeto.f_status }}</span>
								<hr v-if="projeto.f_status != 'null' && projeto.f_status != '-'">
							</p>
							<p v-if="projeto.f_instrumento_urbanistico_proposto != 'null' && projeto.f_instrumento_urbanistico_proposto != '-'">
								Instrumento proposto<br />
								<span>{{ projeto.f_instrumento_urbanistico_proposto }}</span>
								<hr v-if="projeto.f_instrumento_urbanistico_proposto != 'null' && projeto.f_instrumento_urbanistico_proposto != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 6" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E07=!E07" v-bind:class=atribuiEstado(7,projeto.a_etapa_fluxograma)>07 <span>Tramitação jurídica</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E07">
							<p v-if="projeto.g_nome_orgao_em_analise != 'null' && projeto.g_nome_orgao_em_analise != '-'">
								Órgão em análise<br>
								<span>{{ projeto.g_nome_orgao_em_analise }}</span>
								<hr v-if="projeto.g_nome_orgao_em_analise != 'null' && projeto.g_nome_orgao_em_analise != '-'">
							</p>
							<p v-if="projeto.g_registro_publico_de_envio_normativo != 'null' && projeto.g_registro_publico_de_envio_normativo != '-'">
								{{ projeto.g_registro_publico_de_envio_normativo }}
								{{ projeto.g_status_aprovacao }}
								<hr v-if="projeto.g_registro_publico_de_envio_normativo != 'null' && projeto.g_registro_publico_de_envio_normativo != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 7" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			
				<div>
					<div @click="E08=!E08" v-bind:class=atribuiEstado(8,projeto.a_etapa_fluxograma)>08 <span>Implantação</span></div>
					<transition name="tramitTransit" class="tramitTransit">
						<div v-if="E08">
							<p v-if="projeto.h_status_implantacao != 'null' && projeto.h_status_implantacao != '-'">
								<span>{{ projeto.h_status_implantacao }}</span>
								<hr v-if="projeto.h_status_implantacao != 'null' && projeto.h_status_implantacao != '-'">
							</p>
							<p v-if="projeto.h_orgao_em_analise != 'null' && projeto.h_orgao_em_analise != '-'">
								Órgão em análise<br>
								<span>{{ projeto.h_orgao_em_analise }}</span>
								<hr v-if="projeto.h_orgao_em_analise != 'null' && projeto.h_orgao_em_analise != '-'">
							</p>
							<p>
								<template v-for="hiperlink in hiperlinks">
									<a v-if="hiperlink.ID_Projeto == menuClickedId && hiperlink.ID_etapa == 8" class="tramit_link" :href="hiperlink.arquivo" :type="ext(hiperlink.arquivo)">{{ hiperlink.nome_publico_do_arquivo }}</a>
								</template>
							</p>
						</div>
					</transition>
				</div>
			</div>
		</div>

	</div>
	`
}